from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session
from src.claimwise.db.session import get_db
from src.claimwise.utils.enum import ClaimCategory, ClaimStatus, SortByCategory
from datetime import date
from src.claimwise.features.claims.service.claim import claim_service

router=APIRouter(tags=["Claims"])

@router.post("/claims")
def file_claim(
    category: ClaimCategory = Form(...),
    description: str=Form(...),
    date: date = Form(...),
    estimated_cost: float = Form(...),
    file: UploadFile=File(...),
    db: Session=Depends(get_db)
):
    try:
        return claim_service.create_claim_service(
            category,
            description,
            date,
            estimated_cost,
            file,
            db
        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/claims")
def view_all_claims(
    category: ClaimCategory|None=None,
    status: ClaimStatus|None=None,
    sort_by_date: SortByCategory|None=None,
    db: Session=Depends(get_db)):
    return claim_service.get_all_claims_service(category, status, sort_by_date, db)