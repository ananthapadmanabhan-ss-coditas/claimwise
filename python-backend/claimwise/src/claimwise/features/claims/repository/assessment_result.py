from src.claimwise.models.assessment_result import AssessmentResult

class AssessmentResultRepository:

    def create_assessment_result_repository(self, claim_id, summary, missing_information, recommended_decision, db):
        new_assessment_result=AssessmentResult(
            claim_id=claim_id,
            summary=summary
        )

        db.add(new_assessment_result)
        db.commit()

    # def get_assessment_result_by_