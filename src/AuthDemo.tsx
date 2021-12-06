import React from 'react';
import { Configuration, V0alpha2Api } from '@ory/kratos-client'
export const AuthDemo: React.FC = () => {
    return (
        <div>
            <h1>Auth Demo</h1>
            <button onClick={async () => {
                console.log('login');
                const config = new Configuration({ basePath: 'http://127.0.0.1:4433' });
                const api = new V0alpha2Api(config);
                const resp = await api.initializeSelfServiceRegistrationFlowForBrowsers()
                console.log(resp.data);
                const registrationFlowId = resp.data.id;

                const registrationResponse = await api.submitSelfServiceRegistrationFlow(registrationFlowId, {
                    method: "password",
                    password: "1234",
                    traits: {
                        email: "ole.petersen@go4more.de"
                    }
                },{"Accept": "application/json"})
                console.log(registrationResponse.data);
            }}>Login</button>
        </div>
    )
}