from sqlalchemy import Column, String, ForeignKey, DateTime, func, Text
from src.claimwise.db.base import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid

class AssessmentResult(Base):

    __tablename__="assessment_results"

    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    claim_id=Column(UUID(as_uuid=True), ForeignKey("claims.id"))
    summary=Column(Text)
    created_at=Column(DateTime(timezone=True), server_default=func.now())




