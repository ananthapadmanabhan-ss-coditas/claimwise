export interface EmailRequest{
  email:string;
}

export interface EmailResponse{
  message:string;
  success:boolean;
  data:string
}

export interface VerifyOTPRequest{
  email:string
  code:string;
}

export interface VerifyOTPResponse{
  
}