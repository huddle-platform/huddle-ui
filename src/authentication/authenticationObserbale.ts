export type AuthenticationRequest = {
    message?: string
    onFinished: () => void
    onFailed: (message?: string) => void
}