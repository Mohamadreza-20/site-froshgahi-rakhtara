import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../../../services/users";
import { queryKeys } from "../../queryKeys";

export const usersQueryKey = queryKeys.users.all;

export function useUsersQuery(options = {}) {
  return useQuery({ queryKey: usersQueryKey, queryFn: getUsers, ...options });
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
