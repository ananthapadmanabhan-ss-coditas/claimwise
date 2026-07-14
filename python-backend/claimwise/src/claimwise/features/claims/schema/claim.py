from pydantic import BaseModel
from uuid import UUID

class AssignAdjusterRequest(BaseModel):
    adjuster_id: UUID