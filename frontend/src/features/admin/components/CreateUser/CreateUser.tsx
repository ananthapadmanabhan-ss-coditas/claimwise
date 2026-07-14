import type { Dispatch, SetStateAction } from "react";
import Modal from "../../../../components/ui/Modal/Modal";
import styles from "./CreateUser.module.scss"
import { useForm } from "react-hook-form";
import FormField from "../../../../components/forms/FormField/FormField";
import Input from "../../../../components/forms/Input/Input";
import Select from "../../../../components/forms/Select/Select";
import Button from "../../../../components/ui/Button/Button";

const CreateUser=( {setModal}: {setModal: Dispatch<SetStateAction<boolean>>;})=>{

const{register,handleSubmit,formState:{errors}}=useForm();

const onInviteUser=()=>{

}

 return(
  <Modal title="INVITE A USER" isOpen={true} onClose={()=>setModal(false)}>

    <form className={styles.form} onSubmit={handleSubmit(onInviteUser)}>

      <FormField label="USER EMAIL">
        <Input placeholder="email"/>
      </FormField>

      <FormField label="SELECT ROLE">
        <Select>

        </Select>
      </FormField>

      <Button className={styles.padded} type="submit">
        INVITE
      </Button>

    </form>

  </Modal>
 );
}
export default CreateUser