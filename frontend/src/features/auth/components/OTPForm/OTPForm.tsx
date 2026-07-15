import { useForm } from "react-hook-form";
import { codeSchema, type CodeFormData } from "../../schema/loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./OTPForm.module.scss"
import FormField from "../../../../components/forms/FormField/FormField";
import Input from "../../../../components/forms/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import { useVerifyotpMutation } from "../../services/authapi";
import { useNavigate } from "react-router-dom";
import type { OTPFormProp } from "./OTPForm.types";
const OTPForm = ({email}:OTPFormProp) => {
  const navigate=useNavigate()
  const [verifyotp,{isLoading}]=useVerifyotpMutation()
  const {register,handleSubmit,formState: { errors },getValues} = useForm<CodeFormData>({
        resolver: zodResolver(codeSchema),
    });
  const onSubmit=async()=>{
    try{
      const code=getValues("code")
      const response=await verifyotp({email,code}).unwrap()
      localStorage.setItem("accessToken", response.data.accessToken!);
      localStorage.setItem("refreshToken", response.data.refreshToken!);
      navigate("/")
    }
    catch(error){
      console.error(error)
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField id="code" label="code" error={errors.code?.message}>
        <Input
          id="code"
          type="code"
          placeholder="Enter one time code"
          {...register("code")}
        />
      </FormField>
      <Button type="submit" disabled={isLoading}>
      {isLoading ? "Submitting OTP": "Send OTP"}
      </Button>

    </form>
  );
};
export default OTPForm;
