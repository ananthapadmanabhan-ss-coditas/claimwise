from src.claimwise.models.claim import Claim
from src.claimwise.utils.enum import SortByCategory

class ClaimRepository:

    def create_claim_repository(self, category, description, date, estimated_cost, db):
        new_claim=Claim(
            category=category,
            description=description,
            date=date,
            estimated_cost=estimated_cost
        )

        db.add(new_claim)
        db.commit()
        db.refresh(new_claim)
        return new_claim
    
    def get_all_claims_repository(self, category, status, sort_by_date, db):
        query = db.query(Claim)

        if category is not None:
            query=query.filter(Claim).filter(Claim.category==category)
        if status is not None:
            query=query.filter(Claim).filter(Claim.status==status)
        if sort_by_date is not None:
            if sort_by_date==SortByCategory.ASCENDING:
                query=query.order_by(Claim.created_at.asc())
            if sort_by_date==SortByCategory.DESCENDING:
                query=query.order_by(Claim.created_at.desc())

        return query.all()
        