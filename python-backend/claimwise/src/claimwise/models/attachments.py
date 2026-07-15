from sqlalchemy import Column, String, ForeignKey, DateTime, func
from src.claimwise.db.base import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship

class Attachment(Base):
    __tablename__="attachments"

    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    claim_id=Column(UUID(as_uuid=True), ForeignKey("claims.id"), nullable=True)
    file_url=Column(String, nullable=False)
    file_name=Column(String, nullable=True)
    file_type=Column(String, nullable=True)
    uploaded_by=Column(UUID(as_uuid=True))
    uploaded_at=Column(DateTime(timezone=True), server_default=func.now())

    claim=relationship("Claim", back_populates="attachments")

    