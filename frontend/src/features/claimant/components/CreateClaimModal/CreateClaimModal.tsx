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

const CreateClaimModal = ({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {

  const [btnstates,setBtnStates]=useState<"basic"|"upload"|"final">("basic")
  
  const {register:basicDetails,handleSubmit,formState:{errors}}=useForm()
  const {register:uploadDetails,handleSubmit:UploadHandler,formState:{errors:uploaderrors}}=useForm()

  const onBasicSubmit=async()=>{
    try{

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

  const onUploadSubmit=async()=>{
    try{

    }
    catch{

    }
  }

  return (
    <Modal
      title="Make a Claim"
      isOpen={true}
      onClose={() => setModal(false)}
    >
      <form className={styles.form} onSubmit={handleSubmit(onBasicSubmit)}>

        <FormField label="Title">
          <Input/>
        </FormField>

        <FormField label="Description">
          <TextArea/>
        </FormField>

        <FormField label="Category">
          <Select>

          </Select>
        </FormField>

        <FormField label="Date">
          <Input/>
        </FormField>

        <FormField label="Cost">
           <Input/>
        </FormField>

        <Button type="submit">
          Upload Basic Details
        </Button>

      </form>

      <form className={styles.form} onSubmit={UploadHandler(onUploadSubmit)}>

        <FormField>
          <FileInput multiple/>
        </FormField>

        <Button type="submit">
          Upload Attachments
        </Button>

      </form>

      <Button onClick={handleFinalSubmit}>SUBMIT CLAIM</Button>

    </Modal>
  );
};

export default CreateClaimModal;