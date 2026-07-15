import { useState, type Dispatch, type SetStateAction } from "react";
import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";
import { useForm } from "react-hook-form";
import styles from "./CreateClaimModal.module.scss"
import FormField from "../../../../components/forms/FormField/FormField";
import Input from "../../../../components/forms/Input/Input";
import TextArea from "../../../../components/forms/TextArea/TextArea";
import Select from "../../../../components/forms/Select/Select";
import FileInput from "../../../../components/forms/FileInput/FileInput";
import { claimschema, type ClaimFormData } from "../../schema/claimschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBaseClaimMutation, useUploadClaimMutation } from "../../services/claimapi";

const CreateClaimModal = ({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [baseClaim,baseClaimState]=useBaseClaimMutation()
  const [UploadClaim,UploadClaimState]=useUploadClaimMutation()

  const [btnstates,setBtnStates]=useState<"basic"|"upload"|"final">("basic")

  const [selectedFile,setSelectedFile]=useState<File|null>(null)

  const [claimId,setClaimId]=useState("")
  
  const {register,handleSubmit,formState:{errors}}=useForm<ClaimFormData>({
    resolver:zodResolver(claimschema)
  })
  
  const onBasicSubmit=async(basicData:ClaimFormData)=>{

    try{
      const {claim_id}=await baseClaim(basicData).unwrap()
      setClaimId(claim_id)
    }
    catch(error){
      console.error(error)
    }
  }

  const onUploadSubmit=async(Uploaddata:{file:File})=>{
    try{
      await UploadClaim({claimId})
    }
    catch{

    }
  }

   const handleFinalSubmit=async()=>{
    try{

    }
    catch{

    }
  }

  return (
    <Modal
      title="Make a Claim"
      onClose={() => setModal(false)}
    >
      <form className={styles.form} onSubmit={handleSubmit(onBasicSubmit)}>

        <FormField id="title" label="Title" error={errors.title?.message}>

          <Input id="title" type="title" placeholder="Enter the title" {...register("title")}/>

        </FormField>

        <FormField id="description" label="Description" error={errors.description?.message}>

          <TextArea id="description" placeholder="Enter the description" {...register("description")}/>

        </FormField>

        <FormField id="category" label="Category" error={errors.category?.message}>

          <Select {...register("category")}>

            <Select.Option value="AUTO">AUTO</Select.Option>
            <Select.Option value="HOME">HOME</Select.Option>
            <Select.Option value="TRAVEL">TRAVEL</Select.Option>
            <Select.Option value="ACCIDENT">ACCIDENT</Select.Option>

          </Select>

        </FormField>

        <FormField id="date" label="Date" error={errors.date?.message}>

          <Input id="date" type="date" {...register("date")}/>

        </FormField>

        <FormField id="estimated_cost" label="Cost" error={errors.estimated_cost?.message}>
           <Input id="estimated_cost" type="estimated_cost" placeholder="Enter estimated cost" {...register("estimated_cost")}/>
        </FormField>

        <Button type="submit" disabled={baseClaimState.isSuccess}>
          Upload Basic Details
        </Button>

      </form>

      <form className={styles.form} onSubmit={onUploadSubmit}>

        <FormField>
          <FileInput multiple/>
        </FormField>

        <Button type="submit" disabled={!baseClaimState.isSuccess }>
          Upload Attachments
        </Button>

      </form>

      <Button onClick={handleFinalSubmit} disabled={!baseClaimState.isSuccess}>SUBMIT CLAIM</Button>

    </Modal>
  );
};

export default CreateClaimModal;