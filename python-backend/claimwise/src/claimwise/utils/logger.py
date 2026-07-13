import logging
from src.claimwise.config.settings import settings

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(filename)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger("claimwise")
