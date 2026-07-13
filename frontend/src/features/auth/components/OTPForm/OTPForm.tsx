import { useForm } from "react-hook-form";
import { otpSchema, type OTPFormData } from "../../schema/loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./OTPForm.module.scss"
import FormField from "../../../../components/forms/FormField/FormField";
import Input from "../../../../components/forms/Input/Input";
import Button from "../../../../components/ui/Button/Button";
const OTPForm = () => {
  const {register,handleSubmit,formState: { errors }} = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
    });
  const onSubmit=()=>{

  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField id="otp" label="OTP" error={errors.otp?.message}>
        <Input
          id="otp"
          type="otp"
          placeholder="Enter OTP"
          {...register("otp")}
        />
      </FormField>
      <Button type="submit">
      LOGIN
      </Button>

    </form>
  );
};
export default OTPForm;
