type STATUS="Success" | "Error" | "Info"

export interface MessageProps{
  type:STATUS
  message?:string
}