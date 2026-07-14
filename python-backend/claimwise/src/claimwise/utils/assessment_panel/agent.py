from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from src.claimwise.utils.logger import logger
from groq import Groq

client=Groq()

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
    logger.info("Summary agent node is processing the document")

    claim=state["claim"]

    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""
                You are an insurance claim summarizer.

                Claim:
                {claim}

                Produce a short, clear summary of what happened and what's being claimed.
                """
            }
        ]
    )

    return {
        "summary_result": {
            "summary": response.choices[0].message.content
        }
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

builder.add_edge(
    START,
    "load_claim"
)

builder.add_edge(
    "load_claim",
    "summary_agent"
)

builder.add_edge(
    "summary_agent",
    END
)

graph=builder.compile()

result=graph.invoke({
    "claim": {
        "category": "AUTO",
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


