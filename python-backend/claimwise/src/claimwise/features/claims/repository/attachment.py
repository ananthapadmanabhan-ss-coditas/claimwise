from src.claimwise.models.attachments import Attachment

class AttachmentRepository:

    def create_attachment_repository(self, claim_id, file_url, file_name, file_type, db):
        new_attachment=Attachment(
            claim_id=claim_id,
            file_url=file_url,
            file_name=file_name,
            file_type=file_type
        )

        db.add(new_attachment)
        db.commit()