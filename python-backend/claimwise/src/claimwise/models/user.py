from src.claimwise.db.base import Base
from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.claimwise.utils.timestamp_mixin import TimeStampMixin

class User(Base, TimeStampMixin):
    __tablename__='users'

    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email=Column(String, nullable=False, unique=True)
    role=Column(String)
    contact_number=Column(String)
    profile_picture_url=Column(String)
    policy_details_url=Column(String)
    identification_document_url=Column(String)
    is_profile_complete=Column(Boolean, default=False)


