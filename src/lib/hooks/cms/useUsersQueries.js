import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../../../services/users";
import { queryKeys } from "../../queryKeys";

export const usersQueryKey = queryKeys.users.all;

export function useUsersQuery(params = {}, options = {}) {
  return useQuery({
    queryKey: [...usersQueryKey, "catalog"],
    queryFn: () => getUsers(),
    placeholderData: (previous) => previous,
    ...options,
  });
}

export function useUsersMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: usersQueryKey });
  return {
    createUser: useMutation({ mutationFn: createUser, onSuccess: invalidate }),
    updateUser: useMutation({ mutationFn: ({ id, data }) => updateUser(id, data), onSuccess: invalidate }),
    deleteUser: useMutation({ mutationFn: deleteUser, onSuccess: invalidate }),
  };
}
