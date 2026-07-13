import type { CardProps } from "./Card.types"
import styles from './Card.module.scss'
import clsx from "clsx";

const Card=(
  {children,
  onClick,
  className,
  ...props}:CardProps)=>{

  return(

    <div className={clsx(styles.card,className)} onClick={onClick} {...props}>

      {children}

    </div>

  );
  
}

export default Card