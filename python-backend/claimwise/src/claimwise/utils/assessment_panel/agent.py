from typing import TypedDict
from langgraph.graph import StateGraph, START, END
# from src.claimwise.utils.logger import logger
from groq import Groq
import json
from src.claimwise.features.claims.repository.claim import ClaimRepository
from sqlalchemy.orm import Session
from src.claimwise.db.session import engine

client=Groq()
claim_repository=ClaimRepository()

class State(TypedDict):
    claim: dict
    attachments: dict
    summary_result: dict
    completeness_result: dict
    cost_result: dict
    consistency_result: dict
    final_assessment_result: dict

def load_claim_node(state: State):
    # logger.info("Loading claim")
    return state

def summary_agent_node(state: State):
    # logger.info("Summary agent node is processing the claim")

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
    # logger.info("Completeness agent is processing the claim")
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
    with Session(engine) as db:
        past_claims=claim_repository.get_claims_by_category_repository(state["category"], db)

    similar_past_claims=json.dumps([
        {
            "description": past_claim.description,
            "category": past_claim.category,
            "estimated_cost": past_claim.estimated_cost
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
                - - explaination: "<explaination/reason of your cost assessment>"

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
    ["summary_agent", "completeness_agent", "cost_agent"],
    END
)

graph=builder.compile()

result=graph.invoke({
    "claim": {
        "category": "ACCIDENT",
        "description": "Met with a car accident on Pune-Mumbai Expressway. Accident happened when a truck collided with the car. Headlights broken and scratches on car. I wanted to claim my vehicle insurance. Police report and damage image is attached for reference.",
        "date": "2026-07-14",
        "estimated_cost": 28000 
    },
    "attachments": [
        "police_report.png",
        "damage.png"
    ]
})

print(result)


