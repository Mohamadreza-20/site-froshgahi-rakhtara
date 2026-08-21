import { useState } from "react";

export function useProductDialogState() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [newProductId, setNewProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateModal = () => { setEditingProduct(null); setIsModalOpen(true); };
  const openEditModal = (product) => { setEditingProduct(product); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingProduct(null); };

  return { editingProduct, deletingProduct, newProductId, isModalOpen, setDeletingProduct, setNewProductId, openCreateModal, openEditModal, closeModal, setEditingProduct, setIsModalOpen };
}
