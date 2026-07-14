from src.claimwise.models.assessment_result import AssessmentResult

class AssessmentResultRepository:

    def create_assessment_result(self, claim_id, summary, db):
        new_assessment_result=AssessmentResult(
            claim_id=claim_id,
            summary=summary
        )

        db.add(new_assessment_result)
        db.commit()