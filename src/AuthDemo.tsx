import React from 'react';
import { Configuration, V0alpha2Api } from '@ory/kratos-client'
const config = new Configuration({
    basePath: 'http://localhost:8090',
    baseOptions: {
        withCredentials: true
    }
});
const api = new V0alpha2Api(config);
export const AuthDemo: React.FC = () => {
    return (
        <div>
            <h1>Auth Demo</h1>
            <button onClick={async () => {
                console.log('registering user');
                const resp = await api.initializeSelfServiceRegistrationFlowForBrowsers()
                console.log(resp.data);
                if (!resp) return
                const registrationFlowId = resp.data.id;
                const csrf_token = resp.data.ui.nodes[0].attributes.value as string;

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
                const csrf_token = resp.data.ui.nodes[0].attributes.value as string;

                const registrationResponse = await api.submitSelfServiceLoginFlow(loginFlowId, undefined, {
                    method: "password",
                    password: "pi<uewfpiwduciQD",
                    password_identifier: "ole.petersen@go4more.de",
                    csrf_token: csrf_token
                })
                console.log(registrationResponse.data);
            }}>login</button>
        </div>
    )
}