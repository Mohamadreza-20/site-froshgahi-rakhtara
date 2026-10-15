import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader, StatCard, ConfirmDialog } from "../components/cms/ui";
import UsersTable from "../components/cms/features/users/UsersTable";
import UserFormModal from "../components/cms/features/users/UserFormModal";
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
} from "../services/users";

const PAGE_SIZE = 10;

export default function Users() {
	const [usersData, setUsersData] = useState([]);
	const [query, setQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState(null);
	const [deletingUser, setDeletingUser] = useState(null);
	const [newUserId, setNewUserId] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		async function getData() {
			const users = await getUsers();
			setUsersData(users);
		}
		getData();
	}, []);

	const filtered = useMemo(
		() =>
			usersData.filter(
				(currentUser) =>
					currentUser.name.includes(query) ||
					currentUser.email.toLowerCase().includes(query.toLowerCase()),
			),
		[usersData, query],
	);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

	useEffect(() => {
		setCurrentPage(1);
	}, [query]);

	useEffect(() => {
		if (currentPage > totalPages) setCurrentPage(totalPages);
	}, [totalPages, currentPage]);

	const paginated = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filtered.slice(start, start + PAGE_SIZE);
	}, [filtered, currentPage]);

	const { activeCount, managerCount, supportCount } = useMemo(() => {
		let activeCount = 0;
		let managerCount = 0;
		let supportCount = 0;
		for (const currentUser of usersData) {
			if (currentUser.status === "فعال") activeCount += 1;
			if (currentUser.role === "مدیر فروشگاه") managerCount += 1;
			if (currentUser.role === "پشتیبانی") supportCount += 1;
		}
		return { activeCount, managerCount, supportCount };
	}, [usersData]);

	const openCreateModal = () => {
		setEditingUser(null);
		setIsModalOpen(true);
	};

	const openEditModal = (user) => {
		setEditingUser(user);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingUser(null);
	};

	const handleSubmitUser = async (form) => {
		setSubmitting(true);
		try {
			if (editingUser) {
				const updated = await updateUser(editingUser.id, form);
				setUsersData((prev) =>
					prev.map((currentUser) => (currentUser.id === editingUser.id ? updated : currentUser)),
				);
				toast.success("اطلاعات کاربر بروزرسانی شد");
			} else {
				const created = await createUser(form);
				setUsersData((prev) => [created, ...prev]);
				setCurrentPage(1);
				setNewUserId(created.id);
				window.setTimeout(() => setNewUserId(null), 1500);
				toast.success("کاربر جدید با موفقیت ایجاد شد");
			}
			closeModal();
		} catch (error) {
			console.error("ذخیره کاربر با خطا مواجه شد:", error);
			toast.error("ذخیره کاربر با خطا مواجه شد");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteUser = async () => {
		if (!deletingUser) return;
		setDeleting(true);
		try {
			await deleteUser(deletingUser.id);
			setUsersData((prev) => prev.filter((currentUser) => currentUser.id !== deletingUser.id));
			toast.success(`کاربر «${deletingUser.name}» حذف شد`);
			setDeletingUser(null);
		} catch (error) {
			console.error("حذف کاربر با خطا مواجه شد:", error);
			toast.error("حذف کاربر با خطا مواجه شد");
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div className="space-y-6">
			<PageHeader
				title="کاربران"
				actionLabel="کاربر جدید"
				onAction={openCreateModal}
			/>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<StatCard label="مجموع کاربران" value={usersData.length} />
				<StatCard
					label="کاربران فعال"
					value={activeCount}
					valueClassName="text-[#16A34A]"
				/>
				<StatCard
					label="مدیران فروشگاه"
					value={managerCount}
					valueClassName="text-[#C026D3]"
				/>
				<StatCard
					label="اعضای پشتیبانی"
					value={supportCount}
					valueClassName="text-[#EA580C]"
				/>
			</div>

			<UsersTable
				users={paginated}
				totalCount={filtered.length}
				query={query}
				onQueryChange={setQuery}
				onEdit={openEditModal}
				onDelete={setDeletingUser}
				newUserId={newUserId}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>

			<UserFormModal
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmitUser}
				user={editingUser}
				submitting={submitting}
			/>

			<ConfirmDialog
				open={Boolean(deletingUser)}
				onClose={() => setDeletingUser(null)}
				onConfirm={handleDeleteUser}
				loading={deleting}
				title="حذف کاربر"
				description={
					deletingUser
						? `آیا از حذف «${deletingUser.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
						: ""
				}
			/>
		</div>
	);
}
