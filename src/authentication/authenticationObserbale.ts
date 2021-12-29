import { Observable } from "@apollo/client";

export type AuthenticationRequest = {
    message?: string
    onFinished: () => void
    onFailed: (message?: string) => void
}