import { useNavigate } from "react-router-dom";

import styles from "./ClaimCard.module.scss"
import Button from "../../../../components/ui/Button/Button";
import Card from "../../../../components/ui/Card/Card";
import type { ClaimCardProps } from "./ClaimCard.types";


const ClaimCard = ({ claim }: ClaimCardProps) => {
  const navigate = useNavigate();
 
 const handleClaimId = async () => {
    try{
      navigate("")
    }
    catch{}
};

return (
    <Card className={styles.courseCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>{claim.title ?? "TITLE"}</h3>
      </div>

      <p className={styles.description}>{claim.description}</p>

      <div className={styles.status}>
        <span className={styles.label}>STATUS: </span>
        <span>{claim.status}</span>
      </div>

      <div className={styles.footer}>
        <span className={styles.capacity}>Date: {claim.date}</span>
          <Button onClick={handleClaimId} variant="success">
            View Details
          </Button>
      </div>
    </Card>
  );
};

export default ClaimCard;
