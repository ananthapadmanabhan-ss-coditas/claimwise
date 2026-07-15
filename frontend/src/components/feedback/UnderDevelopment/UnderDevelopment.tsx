import { useNavigate } from "react-router-dom"
import Button from "../../ui/Button/Button"
import styles from "./UnderDevelopment.module.scss"

const UnderDevelopment=()=>{
  const navigate=useNavigate()
  return(
    <div className={styles.UnderDevelopment}>
      <h1>We are currently under DEVELOPMENT</h1>
      <h2>We will come back soon :)</h2>
      <Button onClick={()=>navigate(-1)}>GO BACK</Button>
    </div>
  )
}

export default UnderDevelopment