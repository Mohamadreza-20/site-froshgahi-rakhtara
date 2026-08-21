import { useCallback } from "react";
import { toast } from "sonner";
import { useUsersMutations } from "../cms/useUsersQueries";

export function useUserCrudActions({ editingUser, deletingUser, closeModal, setDeletingUser, setNewUserId }) {
  const mutations = useUsersMutations();

  const submitUser = useCallback(async (form, onCreated) => {
    if (editingUser) {
      await mutations.updateUser.mutateAsync({ id: editingUser.id, data: form });
      toast.success("اطلاعات کاربر بروزرسانی شد");
    } else {
      const created = await mutations.createUser.mutateAsync(form);
      onCreated?.();
      setNewUserId(created.id);
      window.setTimeout(() => setNewUserId(null), 1500);
      toast.success("کاربر جدید با موفقیت ایجاد شد");
    }
    closeModal();
  }, [closeModal, editingUser, mutations.createUser, mutations.updateUser, setNewUserId]);

  const deleteSelectedUser = useCallback(async () => {
    if (!deletingUser) return;
    await mutations.deleteUser.mutateAsync(deletingUser.id);
    toast.success(`کاربر «${deletingUser.name}» حذف شد`);
    setDeletingUser(null);
  }, [deletingUser, mutations.deleteUser, setDeletingUser]);

  return {
    ...mutations,
    submitting: mutations.createUser.isPending || mutations.updateUser.isPending,
    deleting: mutations.deleteUser.isPending,
    submitUser,
    deleteSelectedUser,
  };
}
