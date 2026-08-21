import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteContactMessage,
  getContactInfo,
  getContactMessages,
  getMyContactMessages,
  replyToContactMessage,
} from "../../../services/contactUs.service";
import { queryKeys } from "../../queryKeys";

export const contactMessagesQueryKey = queryKeys.contactMessages.all;
export const contactInfoQueryKey = queryKeys.contactInfo;

export function useContactMessagesQuery(options = {}) {
  return useQuery({ queryKey: contactMessagesQueryKey, queryFn: getContactMessages, ...options });
}

export function useMyContactMessagesQuery(userId, options = {}) {
  return useQuery({
    ...options,
    queryKey: queryKeys.contactMessages.mine(userId),
    queryFn: () => getMyContactMessages(userId),
    enabled: Boolean(userId) && options.enabled !== false,
  });
}

export function useContactInfoQuery(options = {}) {
  return useQuery({ queryKey: contactInfoQueryKey, queryFn: getContactInfo, ...options });
}

export function useContactMessageMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: contactMessagesQueryKey });
  };
  return {
    reply: useMutation({ mutationFn: ({ id, replyText }) => replyToContactMessage(id, replyText), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: deleteContactMessage, onSuccess: invalidate }),
  };
}
