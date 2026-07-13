import styles from './Button.module.scss'
import clsx from 'clsx';
import type { ButtonProps } from "./Button.types"

const Button = ({ className, children, variant, ...props }: ButtonProps) => {

  return (

    <button className={clsx(styles.button, className, variant && styles[variant])} {...props}>

      {children}

    </button>
  );

}
export default Button