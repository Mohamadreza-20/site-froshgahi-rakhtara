import { useState } from "react";

export function useUserDialogState() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [newUserId, setNewUserId] = useState(null);

  const openCreateModal = () => { setEditingUser(null); setIsModalOpen(true); };
  const openEditModal = (user) => { setEditingUser(user); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingUser(null); };

  return { isModalOpen, editingUser, deletingUser, newUserId, setDeletingUser, setNewUserId, openCreateModal, openEditModal, closeModal, setEditingUser };
}
