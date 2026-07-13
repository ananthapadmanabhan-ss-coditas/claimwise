import { useForm } from "react-hook-form";
import FormField from "../../../../components/forms/FormField/FormField";
import Input from "../../../../components/forms/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import styles from "./EmailForm.module.scss"
import { emailSchema, type EmailFormData } from "../../schema/loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EmailFormProp } from "./EmailForm.types";
const EmailForm = ({form}:EmailFormProp) => {
  const {register,handleSubmit,formState: { errors }} = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
    });
  const onSubmit=()=>{
    //API CALLS
    form("OTP")
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

      <Button type="submit">
        SEND OTP
      </Button>

    </form>
  );
};
export default EmailForm;
