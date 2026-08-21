import { useUserDialogState } from "./users-admin/useUserDialogState";
import { useUserCrudActions } from "./users-admin/useUserCrudActions";
import { toast } from "sonner";


export function useUserPageActions() {
  const dialogs = useUserDialogState();
  const crud = useUserCrudActions(dialogs);

  const submitUser = async (form, onCreated) => {
    try {
      await crud.submitUser(form, onCreated);
    } catch (error) {
      toast.error(error?.userMessage || "ذخیره کاربر با خطا مواجه شد");
    }
  };

  const deleteSelectedUser = async () => {
    try {
      await crud.deleteSelectedUser();
    } catch (error) {
      toast.error(error?.userMessage || "حذف کاربر با خطا مواجه شد");
    }
  };

  return { ...dialogs, submitting: crud.submitting, deleting: crud.deleting, submitUser, deleteSelectedUser };
}
