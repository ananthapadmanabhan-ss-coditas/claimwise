from src.claimwise.models.claim import Claim
from src.claimwise.utils.enum import SortByCategory, ClaimStatus, ClaimAssignmentStatus
from sqlalchemy.orm import joinedload

class ClaimRepository:

    def create_claim_repository(self, category, title, description, date, estimated_cost, db):
        new_claim=Claim(
            category=category,
            title=title,
            description=description,
            date=date,
            estimated_cost=estimated_cost
        )

        db.add(new_claim)
        db.commit()
        db.refresh(new_claim)
        return new_claim
    
    def get_claim_by_id_repository(self, claim_id, db):
        return db.query(Claim).filter(Claim.id==claim_id).options(joinedload(Claim.attachments)).first()
    
    def get_all_claims_repository(self, category, status, assigned_status, sort_by_date, db):
        query = db.query(Claim)

        if category is not None:
            query=query.filter(Claim.category==category)
        if status is not None:
            query=query.filter(Claim).filter(Claim.status==status)
        if assigned_status is not None:
            if assigned_status==ClaimAssignmentStatus.ASSIGNED:
                query=query.filter(Claim.assigned_to.is_not(None))
            if assigned_status==ClaimAssignmentStatus.UNASSIGNED:
                query=query.filter(Claim.assigned_to.is_(None))
        if sort_by_date is not None:
            if sort_by_date==SortByCategory.ASCENDING:
                query=query.order_by(Claim.created_at.asc())
            if sort_by_date==SortByCategory.DESCENDING:
                query=query.order_by(Claim.created_at.desc())

        return query.all()
    
    def get_claims_by_category_repository(self, category, db):
        return db.query(Claim).filter(Claim.category==category, Claim.status==ClaimStatus.APPROVED).all()
    
    def update_claim_status_repository(self, claim_id, status, db):
        db_claim=db.query(Claim).filter(Claim.id==claim_id).first()

        db_claim.status=status
        db.commit()

    def assign_adjuster_repository(self, claim_id, adjuster_id, db):
        db_claim=db.query(Claim).filter(Claim.id==claim_id).first()

        db_claim.assigned_to=adjuster_id
        db.commit()
        