import React, { useEffect, useState } from 'react';
import { Configuration, V0alpha2Api } from '@ory/kratos-client'
import 'AuthenticationManagerPopup.css'
import { AuthenticationRequest } from './authenticationObserbale';
import { Observable } from '@apollo/client';
const config = new Configuration({
    basePath: 'http://localhost:8090',
    baseOptions: {
        withCredentials: true
    }
});
const api = new V0alpha2Api(config);
export const AuthenticationManagerPopup: React.FC<{ a: Observable<AuthenticationRequest> }> = (props) => {
    const [authRequest, setAuthRequest] = useState<AuthenticationRequest | null>(null)
    useEffect(() => {
        const subscription = props.a.subscribe(req => {
            setAuthRequest(req)
        })
        return () => {
            subscription.unsubscribe()
        }
    })
    if (!authRequest)
        return null
    return (
        <div id="authentication-manager-popup">
            <h1>Authentication Panel</h1>
            <button onClick={async () => {
                console.log('registering user');
                const resp = await api.initializeSelfServiceRegistrationFlowForBrowsers()
                console.log(resp.data);
                if (!resp) return
                const registrationFlowId = resp.data.id;
                const csrf_token = (resp.data.ui.nodes[0].attributes as { value: string }).value;

                const registrationResponse = await api.submitSelfServiceRegistrationFlow(registrationFlowId, {
                    method: "password",
                    password: "pi<uewfpiwduciQD",
                    traits: {
                        email: "ole.petersen@go4more.de"
                    },
                    csrf_token: csrf_token
                })
                console.log(registrationResponse.data);
            }}>register</button>

            <button onClick={async () => {
                console.log('login');
                const resp = await api.initializeSelfServiceLoginFlowForBrowsers()
                console.log(resp.data);
                if (!resp) return
                const loginFlowId = resp.data.id;
                const csrf_token = (resp.data.ui.nodes[0].attributes as { value: string }).value;

                const registrationResponse = await api.submitSelfServiceLoginFlow(loginFlowId, undefined, {
                    method: "password",
                    password: "pi<uewfpiwduciQD",
                    password_identifier: "ole.petersen@go4more.de",
                    csrf_token: csrf_token
                })
                console.log(registrationResponse.data);
                authRequest.onFinished()
                setAuthRequest(null)
            }}>login</button>
            <button onClick={async () => {
                console.log('login');
                const resp = await api.createSelfServiceLogoutFlowUrlForBrowsers()
                console.log(resp.data);
                if (!resp) return
                const logoutTken = resp.data.logout_token

                const registrationResponse = await api.submitSelfServiceLogoutFlow(logoutTken)
                console.log(registrationResponse.data);
            }}>logout</button>
            <button onClick={() => {
                authRequest.onFailed("User closed window")
                setAuthRequest(null)
            }}>close</button>
        </div>
    )
}