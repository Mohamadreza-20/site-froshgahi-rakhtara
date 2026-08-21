import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendContactUsMessage } from "../../services/contactUs.service";
import { queryKeys } from "../queryKeys";

export function useSendContactMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ form, userId }) => sendContactUsMessage(form, userId),
    onSuccess: (_data, variables) => {
      if (variables?.userId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.contactMessages.mine(variables.userId),
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.contactMessages.all });
    },
  });
}
