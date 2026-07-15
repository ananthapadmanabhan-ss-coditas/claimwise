from src.claimwise.db.base import Base
from sqlalchemy import Column, String, Text, Date, Numeric
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.claimwise.utils.enum import ClaimStatus
from src.claimwise.utils.timestamp_mixin import TimeStampMixin
from sqlalchemy.orm import relationship

class Claim(Base, TimeStampMixin):
    __tablename__='claims'

    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id=Column(UUID(as_uuid=True))
    title=Column(String)
    category=Column(String)
    description=Column(Text)
    date=Column(Date)
    estimated_cost=Column(Numeric(10,2))
    status=Column(String, default=ClaimStatus.PENDING)
    assigned_to=Column(UUID(as_uuid=True))

    attachments=relationship("Attachment", back_populates="claim")