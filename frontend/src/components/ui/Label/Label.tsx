import type { LabelProps } from "./Label.types";

const Label=({children,className,...props}:LabelProps)=>{
  return(
    <label className={className} {...props}>{children}</label>
  );
}

export default Label