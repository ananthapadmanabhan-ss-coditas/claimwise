from src.claimwise.models.assessment_result import AssessmentResult

class AssessmentResultRepository:

    def create_assessment_result_repository(self, claim_id, summary, missing_information, recommended_decision, explanation, confidence_score, db):
        new_assessment_result=AssessmentResult(
            claim_id=claim_id,
            summary=summary,
            missing_information=missing_information,
            recommended_decision=recommended_decision,
            explanation=explanation,
            confidence_score=confidence_score
        )

        db.add(new_assessment_result)
        db.commit()

    def get_assessment_result_by_claim_id_repository(self, claim_id, db):
        return db.query(AssessmentResult).filter(AssessmentResult.claim_id==claim_id).first()