from src.claimwise.features.claims.repository.claim import ClaimRepository
from src.claimwise.features.claims.repository.attachment import AttachmentRepository
import uuid
from src.claimwise.utils.s3 import s3_client
from src.claimwise.config.settings import settings
from src.claimwise.utils.logger import logger

class ClaimService:
    
    def __init__(self):
        self.claim_repository=ClaimRepository()
        self.attachment_repository=AttachmentRepository()

    def create_claim_service(self, category, description, date, estimated_cost, file, db):
        logger.info(f"Creating claim")

        new_claim=self.claim_repository.create_claim_repository(
            category,
            description,
            date,
            estimated_cost,
            db
        )

        file_name = f"{uuid.uuid4}_{file.filename}"

        s3_client.upload_fileobj(
            file.file,
            settings.S3_BUCKET_NAME,
            file_name,
            ExtraArgs={"ContentType": file.content_type},
        )

        file_url = f"https://{settings.S3_BUCKET_NAME}.s3.amazonaws.com/claimwise_documents/{file_name}"

        self.attachment_repository.create_attachment_repository(
            new_claim.id,
            file_url,
            db
        )

        logger.info("Claim created successfully")

        return {
            "message": "Claim created successfully",
        }
    
    def get_all_claims_service(self, category, status, sort_by_date, db):
        return self.claim_repository.get_all_claims_repository(self, category, status, sort_by_date, db)

claim_service=ClaimService()
        

