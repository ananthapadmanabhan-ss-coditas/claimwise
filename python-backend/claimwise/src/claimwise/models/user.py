from src.claimwise.db.base import Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.claimwise.utils.timestamp_mixin import TimeStampMixin

class User(Base, TimeStampMixin):
    __tablename__='users'

    id=Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email=Column(String, nullable=False, unique=True)
    role=Column(String)
    contact_number=Column(Integer)
    profile_picture_url=Column(String)
