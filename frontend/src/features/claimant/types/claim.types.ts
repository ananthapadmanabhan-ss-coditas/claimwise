export type Category="AUTO"|"HOME"|"TRAVEL"|"ACCIDENT"

export interface BaseClaimRequest{
  title:string;
  category:Category;
  description:string;
  date:string;
  estimated_cost:string;
}

export interface BaseClaimResponse{
  message:string;
  claim_id:string
}

export interface UploadClaimRequest{
  file:File
}

export interface SubmitClaimRequest{
  
}

export interface GetClaimsResponse{
    "id": string,
    "description": string,
    "estimated_cost": string,
    "status": string,
    "updated_at": string|null,
    "user_id": string|null,
    "category": Category,
    "date": string,
    "assigned_to": string|null,
    "created_at": string,
    "deleted_at": string|null
}

export interface ClaimByIdResponse extends GetClaimsResponse
{
  "attachments": any[]
}

