from pydantic import BaseModel
from uuid import UUID
from src.claimwise.utils.enum import ClaimCategory
from datetime import date

class CreateClaimRequest(BaseModel):
    category: ClaimCategory
    title: str
    description: str
    date: date 
    estimated_cost: float 

class AssignAdjusterRequest(BaseModel):
    adjuster_id: UUID

class ApproveClaimRequest(BaseModel):
    approved_amount: float
    comment: str
