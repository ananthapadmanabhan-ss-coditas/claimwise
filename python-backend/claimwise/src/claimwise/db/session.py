from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.claimwise.config.settings import settings

DATABASE_URL = settings.get_database_url()

engine = create_engine(DATABASE_URL, pool_size=5, max_overflow=5)

Session = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=True
)


def get_db():
    db = Session()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
