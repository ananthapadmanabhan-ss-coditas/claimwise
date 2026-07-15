from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from sqlalchemy.orm import Session
from src.claimwise.db.session import get_db
from src.claimwise.utils.enum import ClaimCategory, ClaimStatus, SortByCategory, ClaimAssignmentStatus
from datetime import date
from src.claimwise.features.claims.service.claim import claim_service
from uuid import UUID
from src.claimwise.utils.exceptions import ClaimNotFoundException
from src.claimwise.features.claims.schema.claim import AssignAdjusterRequest, ApproveClaimRequest, CreateClaimRequest


router=APIRouter(tags=["Claims"])

@router.post("/claims", status_code=status.HTTP_201_CREATED)
def file_claim(
    data: CreateClaimRequest,
    db: Session=Depends(get_db)
):
    try:
        return claim_service.create_claim_service(
            data.category,
            data.title,
            data.description,
            data.date,
            data.estimated_cost,
            db
        )
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.post("/claims/{claim_id}/attachment", status_code=status.HTTP_201_CREATED)
def upload_attachment(
    claim_id: UUID,
    file: UploadFile=File(...),
    db: Session=Depends(get_db)
):
    try:
        return claim_service.upload_attachment_service(claim_id, file, db)
    except ClaimNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@router.get("/claims/{claim_id}")
def get_claim_details(claim_id: UUID, db: Session=Depends(get_db)):
    try:
        return claim_service.get_claim_details_service(claim_id, db)
    except ClaimNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
    
@router.get("/claims")
def view_all_claims(
    category: ClaimCategory|None=None,
    claim_status: ClaimStatus|None=None,
    assigned_status: ClaimAssignmentStatus|None=None,
    sort_by_date: SortByCategory|None=None,
    db: Session=Depends(get_db)):
    try:
        return claim_service.get_all_claims_service(category, claim_status, assigned_status, sort_by_date, db)
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.get("/claims/{claim_id}/submit")
def submit_claim(claim_id: UUID, db:Session=Depends(get_db)):
    try:
        return claim_service.submit_claim_service(claim_id, db)
    except ClaimNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    # except Exception:
    #     raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
@router.patch("/claims/{claim_id}/assign")
def assign_adjuster(claim_id, data: AssignAdjusterRequest, db:Session=Depends(get_db)):
    try:
        return claim_service.assign_adjuster_service(claim_id, data, db)
    except ClaimNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")
    
# @router.get("/claims/{claim_id}/assessment-result")
# def view_assessment_result(claim_id: UUID, db: Session=Depends(get_db)):

    
@router.patch("/claims/{claim_id}/approve")
def approve_claim(claim_id: UUID, data: ApproveClaimRequest, db: Session=Depends(get_db)):
    try:
        return claim_service.approve_claim_service(claim_id, data, db)
    except ClaimNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error") 
    
# @router.patch("/claims/{claim_id}/reject")
# def reject_claim()
