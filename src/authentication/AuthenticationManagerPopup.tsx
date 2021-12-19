import React, { useEffect, useState } from 'react';
import { Configuration, Identity, V0alpha2Api } from '@ory/kratos-client'
import './AuthenticationManagerPopup.css'
import { AuthenticationRequest } from './authenticationObserbale';
import { Observable } from '@apollo/client';
import { useGetMeQuery } from '../schemas';
import Button from '../shared/Button';
import Input from '../shared/Input';
const config = new Configuration({
    //basePath: 'http://localhost:8090',
    basePath: 'https://huddle.ridilla.eu/.ory/kratos',
    baseOptions: {
        withCredentials: true
    }
});
const api = new V0alpha2Api(config);
export const AuthenticationManagerPopup: React.FC<{ a: Observable<AuthenticationRequest> }> = (props) => {
    const [authRequest, setAuthRequest] = useState<AuthenticationRequest | null>(null)
    const [meData, setMeData] = useState<Identity | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        api.toSession().then(session => {
            console.log(session.data.identity)
            setMeData(session.data.identity)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    useEffect(() => {
        const subscription = props.a.subscribe(req => {
            setAuthRequest(req)
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    if (!authRequest)
        return null
    return (
        <div id="authentication-manager-popup">
            <div>
                <h1>Authentication Panel</h1>
                {meData ? <p>Hello, {meData.traits.email}</p> : null}
                <br />
                <Input onChange={setEmail} description='email' autoComplete='email' />
                <br />
                <Input onChange={setPassword} description='Password' autoComplete='current-password' type='password' />
                <br />
                <Button filled onClick={async () => {
                    try {
                        console.log('registering user');
                        const resp = await api.initializeSelfServiceRegistrationFlowForBrowsers()
                        console.log(resp.data);
                        if (!resp) return
                        const registrationFlowId = resp.data.id;
                        const csrf_token = (resp.data.ui.nodes[0].attributes as { value: string }).value;

                        const registrationResponse = await api.submitSelfServiceRegistrationFlow(registrationFlowId, {
                            method: "password",
                            password: password,
                            traits: {
                                email: email
                            },
                            csrf_token: csrf_token
                        })
                        console.log(registrationResponse.data);
                        api.initializeSelfServiceVerificationFlowForBrowsers().then(resp => {
                            console.log(resp.data);
                            const csrf_token = (resp.data.ui.nodes[0].attributes as { value: string }).value;
                            api.submitSelfServiceVerificationFlow(resp.data.id, undefined, {
                                method: "link",
                                email: email,
                                csrf_token
                            }).then(resp => {
                                console.log(resp.data);
                            })
                        })
                    } catch (e) {
                        alert(e)
                    }
                }}>register</Button>

                <br />
                <Button filled onClick={async () => {
                    try {
                        console.log('login');
                        const resp = await api.initializeSelfServiceLoginFlowForBrowsers()
                        console.log(resp.data);
                        if (!resp) return
                        const loginFlowId = resp.data.id;
                        const csrf_token = (resp.data.ui.nodes[0].attributes as { value: string }).value;

                        const registrationResponse = await api.submitSelfServiceLoginFlow(loginFlowId, undefined, {
                            method: "password",
                            password: password,
                            password_identifier: email,
                            csrf_token: csrf_token
                        })
                        console.log(registrationResponse.data);
                        authRequest.onFinished()
                        setAuthRequest(null)
                    } catch (error) {
                        alert(error)
                    }
                }}>login</Button>
                <br />
                <Button onClick={() => {
                    authRequest.onFailed("User closed window")
                    setAuthRequest(null)
                }}>close</Button>
            </div>
        </div>
    )
}
export const logout = async () => {
    console.log('logout');
    const resp = await api.createSelfServiceLogoutFlowUrlForBrowsers()
    console.log(resp.data);
    if (!resp) return
    const logoutResponse = await api.submitSelfServiceLogoutFlow(resp.data.logout_token)
    console.log(logoutResponse.data);
}
export const LogoutButton: React.FC = props => {
    return (
        <Button onClick={logout}>Logout</Button>
    )
}