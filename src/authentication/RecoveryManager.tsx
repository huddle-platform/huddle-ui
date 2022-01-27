import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import Input from "../shared/Input"
import { getAPI } from "./AuthenticationManagerPopup"

export const RecoveryManager: React.FC = () => {
    const [searchParams] = useSearchParams()
    const flow = searchParams.get("flow")
    return (
        <div>
            <h1>Set a new password</h1>
            <Input type="password" onEnter={async (newPassword) => {
                const api = await getAPI()
                const settingsFlowData = await api.initializeSelfServiceSettingsFlowForBrowsers()
                const csrf_token = (settingsFlowData.data.ui.nodes[0].attributes as { value: string }).value;
                const settingsFlowId = settingsFlowData.data.id;
                const submitSettingsFlowResponse = await api.submitSelfServiceSettingsFlow(settingsFlowId,undefined,{
                    method: "password",
                    password: newPassword,
                    csrf_token: csrf_token
                })
                console.log(submitSettingsFlowResponse)
            }
            } />
        </div>
    )
}