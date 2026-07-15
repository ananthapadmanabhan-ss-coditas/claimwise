import { useForm } from "react-hook-form";
import FormField from "../../../../components/forms/FormField/FormField";
import Input from "../../../../components/forms/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import styles from "./EmailForm.module.scss"
import { emailSchema, type EmailFormData } from "../../schema/loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EmailFormProp } from "./EmailForm.types";
import { useVerifyemailMutation } from "../../services/authapi";
import type { EmailRequest } from "../../types/auth.types";
const EmailForm = ({form,setEmail}:EmailFormProp) => {
  
  const [verifyemail,{isLoading}] =useVerifyemailMutation()

  const {register,handleSubmit,formState: { errors }} = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
    });
  const onSubmit=async(email:EmailRequest)=>{
    //API CALLS
    try{
      await verifyemail(email)
      setEmail(email.email)
      form("OTP")
    }
    catch(error){
      console.error(error)
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
      </FormField>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "SENDING OTP" : "SEND OTP"}
      </Button>

    </form>
  );
};
export default EmailForm;
