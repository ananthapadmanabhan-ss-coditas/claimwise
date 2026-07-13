import LoginForm from "../../features/auth/components/LoginForm/LoginForm"
import AuthLayout from "../../layouts/AuthLayout/AuthLayout"

const Login=()=>{
  return(
    <AuthLayout>
      <LoginForm/>
    </AuthLayout>
  )
}
export default Login