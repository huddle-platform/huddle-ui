import React from 'react';
import { Configuration, V0alpha2Api } from '@ory/kratos-client'
export const AuthDemo: React.FC = () => {
    return (
        <div>
            <h1>Auth Demo</h1>
            <button onClick={async () => {
                console.log('login');
                const config = new Configuration({ basePath: 'http://127.0.0.1:8090' });
                const api = new V0alpha2Api(config);
                const resp = await api.initializeSelfServiceRegistrationFlowForBrowsers()
                console.log(resp.data);
                if (!resp) return
                const registrationFlowId = resp.data.id;
                const csrf_token = resp.data.ui.nodes[0].attributes.value as string;

                const registrationResponse = await api.submitSelfServiceRegistrationFlow(registrationFlowId, {
                    method: "password",
                    password: "1234",
                    traits: {
                        email: "ole.petersen@go4more.de"
                    },
                    csrf_token: csrf_token
                })
                console.log(registrationResponse.data);
            }}>Login</button>
        </div>
    )
}