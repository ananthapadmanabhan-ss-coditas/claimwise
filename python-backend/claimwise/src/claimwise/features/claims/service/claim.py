from src.claimwise.features.claims.repository.claim import ClaimRepository
from src.claimwise.features.claims.repository.attachment import AttachmentRepository
from src.claimwise.features.claims.repository.assessment_result import AssessmentResultRepository
import uuid
from src.claimwise.utils.s3 import s3_client
from src.claimwise.config.settings import settings
from src.claimwise.utils.logger import logger
from src.claimwise.utils.exceptions import ClaimNotFoundException
from src.claimwise.utils.assessment_panel.agent import graph
from src.claimwise.utils.enum import ClaimStatus
import json

class ClaimService:
    
    def __init__(self):
        self.claim_repository=ClaimRepository()
        self.attachment_repository=AttachmentRepository()
        self.assessment_result_repository=AssessmentResultRepository()

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
    
    def get_all_claims_service(self, category, status, assigned_status, sort_by_date, db):
        return self.claim_repository.get_all_claims_repository(category, status, assigned_status, sort_by_date, db)
    
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
        final_assessment_result=result["final_assessment_result"]
        
        self.assessment_result_repository.create_assessment_result_repository(
            claim_id, 
            final_assessment_result["summary"], 
            final_assessment_result["missing_information"],
            final_assessment_result["decision"],
            final_assessment_result["decision_explanation"],
            final_assessment_result["confidence_score"] ,
            db)

        self.claim_repository.update_claim_status_repository(claim_id, ClaimStatus.SUBMITTED, db)

        logger.info("Claim assessed and submitted successfully")
        return {
            "message": "Claim assessed and submitted successfully"
        }
    
    def assign_adjuster_service(self, claim_id, data, db):
        logger.info(f"Assigning adjuster {data.adjuster_id} to claim: {claim_id}")

        db_claim=self.claim_repository.get_claim_by_id_repository(claim_id, db)

        if not db_claim:
            raise ClaimNotFoundException("Claim not found")
        
        # db_adjuster= dependency of java auth service
        
        self.claim_repository.assign_adjuster_repository(claim_id, data.adjuster_id, db)
        self.claim_repository.update_claim_status_repository(claim_id, ClaimStatus.UNDER_REVIEW, db)

        logger.info(f"Adjuster {data.adjuster_id} assigned to claim {claim_id} successfully")

        return {
            "message": "Adjust assigned to claim successfully"
        }  
    
    def approve_claim_service(self, claim_id, data, db):
        logger.info(f"Approving claim: {claim_id}")

        db_claim=self.claim_repository.get_claim_by_id_repository(claim_id, db)

        if not db_claim:
            raise ClaimNotFoundException("Claim not found")
        
        self.claim_repository.update_claim_status_repository(claim_id, ClaimStatus.APPROVED, db)

        # create payout and notify: dependency on other modules

        logger.info("Claim status changed to APPROVED successfully")
        return {
            "message": "Claim status changed to APPROVED successfully"
        }
    
    def view_assessment_result_service(self, claim_id, db):
        logger.info(f"Fetching assessment result: {claim_id}")

        db_claim=self.claim_repository.get_claim_by_id_repository(claim_id, db)

        if not db_claim:
            raise ClaimNotFoundException("Claim not found")
        
        logger.info(f"Assessment result fetched successfully")
        return self.assessment_result_repository.get_assessment_result_by_claim_id_repository(claim_id, db)
        
        
claim_service=ClaimService()
        

