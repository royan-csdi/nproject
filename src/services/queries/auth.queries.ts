import { useMutation } from "@tanstack/react-query";
import { login, register } from "../fetcher/auth.fetcher";
import { ILoginPayloadRequest, IRegisterPayloadRequest } from "@/interfaces";

export function useLoginMutation() {
    return useMutation({
        mutationKey: ['auth'],
        mutationFn: (body: ILoginPayloadRequest) => login(body)
    })
}

export function useRegisterMutation() {
    return useMutation({
        mutationKey: ['auth'],
        mutationFn: (body: IRegisterPayloadRequest) => register(body)
    })
}