import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShowcaseImage,
  deleteShowcaseImage,
  getShowcaseImages,
  updateShowcaseImage,
} from "../../../services/showcase";
import { queryKeys } from "../../queryKeys";

export const showcaseQueryKey = queryKeys.showcase;

export function useShowcaseQuery(options = {}) {
  return useQuery({ queryKey: showcaseQueryKey, queryFn: getShowcaseImages, ...options });
}

export function useShowcaseCreateUpdateMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: showcaseQueryKey });
  return {
    create: useMutation({ mutationFn: createShowcaseImage, onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, data }) => updateShowcaseImage(id, data), onSuccess: invalidate }),
  };
}

export function useShowcaseRemoveMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShowcaseImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: showcaseQueryKey }),
  });
}

export function useShowcaseOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ first, second }) => {
      let firstUpdated = false;
      try {
        await updateShowcaseImage(first.id, first.data);
        firstUpdated = true;
        await updateShowcaseImage(second.id, second.data);
      } catch (error) {
        if (firstUpdated) {
          try {
            await updateShowcaseImage(first.id, first.originalData);
          } catch {
          }
        }
        throw error;
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: showcaseQueryKey }),
  });
}

export function useShowcaseMutations() {
  const { create, update } = useShowcaseCreateUpdateMutations();
  const remove = useShowcaseRemoveMutation();
  return { create, update, remove };
}
