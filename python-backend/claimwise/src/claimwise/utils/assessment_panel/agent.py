from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from src.claimwise.utils.logger import logger
from groq import Groq
import json
from src.claimwise.features.claims.repository.claim import ClaimRepository
from src.claimwise.features.claims.repository.assessment_result import AssessmentResultRepository
from sqlalchemy.orm import Session
from src.claimwise.db.session import engine

client=Groq()
claim_repository=ClaimRepository()
assessment_result_repository=AssessmentResultRepository()

class State(TypedDict):
    claim: dict
    attachments: dict
    summary_result: dict
    completeness_result: dict
    cost_result: dict
    consistency_result: dict
    final_assessment_result: dict

def load_claim_node(state: State):
    logger.info("Loading claim")
    return state

def summary_agent_node(state: State):
    logger.info("Summary agent node is processing the claim")

    claim=state["claim"]

    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""
                ##ROLE:
                You are an insurance claim summarizer.

                ##TASK
                Produce a short, clear summary of what happened and what's being claimed.

                ##OUTPUT FORMAT
                Return response as plain string
                """
            },
            {
                "role": "user",
                "content": f"""
                Claim:
                {claim}
                """
            }
        ]
    )

    return {
        "summary_result": {
            "summary": response.choices[0].message.content
        }
    }

def completeness_agent_node(state: State):
    logger.info("Completeness agent is processing the claim")
    claim=state["claim"]
    attachments=state["attachments"]

    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""
                ##ROLE:
                You are an claim completeness evaluator.

                ##TASK
                Check whether the claim has everything it needs to be assessed — for instance, whether a photo or document referenced in the description was actually attached.

                ##OUTPUT FORMAT
                - missing_items: [<list of anything missing in the claim that is required for the assessment process>]
                - is_complete: <True/False depending on if the claim information provided is complete>
                - explaination: "<explaination of your completeness assessment>"

                ##RULES
                - Strictly return a JSON object
                - No code fences, markdown or explanations, return just a json object.
                """
            },
            {
                "role": "user",
                "content": f"""
                Claim:
                {claim}

                Attachments:
                {attachments}
                """
            }
        ]
    )

    return {
        "completeness_result": json.loads(response.choices[0].message.content)
    }

def cost_agent_node(state: State):
    logger.info("Cost agent is processing the claim")
    with Session(engine) as db:
        past_claims=claim_repository.get_claims_by_category_repository(state["claim"]["category"], db)

    similar_past_claims=json.dumps([
        {
            "description": past_claim.description,
            "category": past_claim.category,
            "estimated_cost": str(past_claim.estimated_cost)
        }

        for past_claim in past_claims
    ])

    current_claim=state["claim"]

    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""
                ##ROLE:
                You are a cost reasonability reviewer.

                ##TASK
                Compares the claimed cost of current claim against similar past claims in the same category and flags whether it looks reasonable, unusually low, or unusually high.
                If no past claims of the same category are present, flag the claim as per your judgement.

                ##OUTPUT FORMAT
                - cost_category: <REASONABLE/UNUSUALLY LOW/ UNUSUALLY HIGH>
                - explaination: "<explaination/reason of your cost assessment>"

                ##RULES
                - Strictly return a JSON object
                - No code fences, markdown or explanations, return just a json object.
                """
            },
            {
                "role": "user",
                "content": f"""
                Similar Past Claims:
                {similar_past_claims}

                Claim:
                {current_claim}
                """
            }
        ]
    )

    return {
        "cost_result": json.loads(response.choices[0].message.content)
    }

def consistency_agent_node(state: State):
    logger.info("Consistency agent is processing the claim")
    claim=state["claim"]

    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""
                ##ROLE:
                You are a consistency reviewer.

                ##TASK
                Checks the claim for internal consistency and potential red flags — for example, whether the description, the date, and the attached documents all line up, or whether something about the submission looks worth a closer look.

                ##OUTPUT FORMAT
                - is_consistent: <True/False>
                - explaination: "<explaination/reason of your consistency assessment>"

                ##RULES
                - Strictly return a JSON object
                - No code fences, markdown or explanations, return just a json object.
                """
            },
            {
                "role": "user",
                "content": f"""
                Claim:
                {claim}
                """
            }
        ]
    )

    return {
        "consistency_result": json.loads(response.choices[0].message.content)
    }

def final_summarizer_agent_node(state: State):
    logger.info("Final summarizer agent is processing the claim")
    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """
                ##ROLE
                You are an insurance claim summarizer.

                ##TASK
                Produce one clear, consolidated assessment: a short summary of the claim, anything missing or inconsistent, 
                and an overall suggestion of whether it looks straightforward to approve, needs more information, or needs closer manual scrutiny — always presented as a suggestion, not a final decision.
                Only use the provided data for the same.

                ##OUTPUT FORMAT
                - missing_information: <missing information from the Completeness section and more information required if any>
                - suggested_decision: <APPROVED/DENIED/REQUEST FOR MORE INFORMATION>
                - explaination: <explaination/reason of the decision>
                - confidence_score: <score out of 10 based on how sure you are of the decision you made based on the provided data>

                ##RULES
                - Strictly return a JSON object
                - No code fences, markdown or explanations/preamble, return just a json object.
                """
            },
            {
                "role": "user",
                "content": f"""
                Summary:
                {state["summary_result"]}

                Completeness Review:
                {state["completeness_result"]}

                Cost Review
                {state["cost_result"]}

                Consistency
                {state["consistency_result"]}
                """
            }
        ]
    )

    return {
        "final_assessment_result": json.loads(response.choices[0].message.content)
    }


builder=StateGraph(State)

builder.add_node(
    "load_claim",
    load_claim_node
)

builder.add_node(
    "summary_agent",
    summary_agent_node
)

builder.add_node(
    "completeness_agent",
    completeness_agent_node
)

builder.add_node(
    "cost_agent",
    cost_agent_node
)

builder.add_node(
    "consistency_agent",
    consistency_agent_node
)

builder.add_node(
    "final_summarizer_agent",
    final_summarizer_agent_node
)

builder.add_edge(
    START,
    "load_claim"
)

builder.add_edge(
    "load_claim",
    "summary_agent"
)

builder.add_edge(
    "load_claim",
    "completeness_agent"
)

builder.add_edge(
    "load_claim",
    "cost_agent"
)

builder.add_edge(
    "load_claim",
    "consistency_agent"
)

builder.add_edge(
    ["summary_agent", "completeness_agent", "cost_agent", "consistency_agent"],
    "final_summarizer_agent"
)

graph=builder.compile()


