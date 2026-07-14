from src.claimwise.features.claims.repository.claim import ClaimRepository
from src.claimwise.features.claims.repository.attachment import AttachmentRepository
import uuid
from src.claimwise.utils.s3 import s3_client
from src.claimwise.config.settings import settings
from src.claimwise.utils.logger import logger
from src.claimwise.utils.exceptions import ClaimNotFoundException
from src.claimwise.utils.assessment_panel.agent import graph
from src.claimwise.utils.enum import ClaimStatus

class ClaimService:
    
    def __init__(self):
        self.claim_repository=ClaimRepository()
        self.attachment_repository=AttachmentRepository()

    def create_claim_service(self, category, title, description, date, estimated_cost, db):
        logger.info(f"Creating claim")

        db_claim=self.claim_repository.create_claim_repository(
            category,
            title,
            description,
            date,
            estimated_cost,
            db
        )

        logger.info("Claim created successfully")

        return {
            "message": "Claim created successfully",
            "claim_id": db_claim.id
        }
    
    def upload_attachment_service(self, claim_id, file, db):
        logger.info(f"Uploading attachment for claim: {claim_id}")
        db_claim=self.claim_repository.get_claim_by_id_repository(claim_id, db)

        if not db_claim:
            raise ClaimNotFoundException("Claim not found")
        
        uploaded_file_name = f"{uuid.uuid4()}_{file.filename}"
        original_file_name=file.filename
        file_type=file.content_type.split("/")[1]
        
        s3_client.upload_fileobj(
            file.file,
            settings.S3_BUCKET_NAME,
            uploaded_file_name,
            ExtraArgs={"ContentType": file.content_type},
        )

        file_url = f"https://{settings.S3_BUCKET_NAME}.s3.amazonaws.com/claimwise_documents/{uploaded_file_name}"

        self.attachment_repository.create_attachment_repository(
            claim_id,
            file_url,
            original_file_name,
            file_type, db
        )

        logger.info("Attachment uploaded successfully")

        return {
            "message": "Attachment uploaded successfully"
        }
    
    def get_all_claims_service(self, category, status, sort_by_date, db):
        return self.claim_repository.get_all_claims_repository(category, status, sort_by_date, db)
    
    def get_claim_details_service(self, claim_id, db):
        logger.info(f"Fetching details for claim: {claim_id}")
        db_claim=self.claim_repository.get_claim_by_id_repository(claim_id, db)

        if not db_claim:
            raise ClaimNotFoundException("Claim not found")
        
        logger.info("Claim successfully fetched")
        return db_claim
    
    def submit_claim_service(self, claim_id, db):
        logger.info(f"Carrying out intelligent assessment for claim: {claim_id}")

        db_claim=self.claim_repository.get_claim_by_id_repository(claim_id, db)

        if not db_claim:
            raise ClaimNotFoundException("Claim not found")
        
        claim_attachments=db_claim.attachments

        assessment_input={
            "claim": {
                "category": db_claim.category,
                "description": db_claim.description,
                "date": str(db_claim.date),
                "estimated_cost": str(28000) 
            },
            "attachments": [attachment.file_name for attachment in claim_attachments]
        }

        result=graph.invoke(assessment_input)

        self.claim_repository.update_claim_status_repository(claim_id, ClaimStatus.SUBMITTED, db)
        return result
        
        
claim_service=ClaimService()
        

