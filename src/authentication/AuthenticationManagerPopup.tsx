import React, { useEffect, useState } from 'react';
import { Configuration, Identity, UiContainer, V0alpha2Api } from '@ory/kratos-client'
import './AuthenticationManagerPopup.css'
import { AuthenticationRequest } from './authenticationObserbale';
import { Observable, useApolloClient } from '@apollo/client';
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
export const getMyIdWithoutLoginPromtIfNotLoggedIn = async () => {
    try {

        const me = await api.toSession()
        return me.data.id
    } finally {
        return undefined
    }
}
export const AuthenticationManagerPopup: React.FC<{ a: Observable<AuthenticationRequest> }> = (props) => {
    const client = useApolloClient()
    const [authRequests, setAuthRequests] = useState<AuthenticationRequest[]>([])
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
            setAuthRequests([...authRequests, req])
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    if (authRequests.length === 0) {
        return null
    }
    return (
        <div id="authentication-manager-popup">
            <div>
                <h1>Authentication Panel</h1>
                {meData ? <p>Hello, {meData?.traits.email}</p> : null}
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
                        resp.data.ui
                        api.initializeSelfServiceVerificationFlowForBrowsers().then(resp => {
                            console.log(resp.data);
                            const csrf_token = (resp.data.ui.nodes[0].attributes as { value: string }).value;
                            api.submitSelfServiceVerificationFlow(resp.data.id, undefined, {
                                method: "link",
                                email: email,
                                csrf_token
                            }).then(resp => {
                                console.log(resp.data);
                                client.refetchQueries({
                                    include: "active",
                                });
                            })
                        })
                    } catch (e) {
                        alertUnknownError(e)
                    }
                }}>register</Button>
                <p>or</p>
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
                        authRequests.forEach(r => r.onFinished())
                        setAuthRequests([])
                    } catch (error) {
                        alertUnknownError(error)
                    }
                }}>login</Button>
                <br />
                <Button onClick={() => {
                    authRequests.forEach(r => r.onFailed("User closed window"))
                    setAuthRequests([])
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

type ErrorWithUI = { response: { data: { ui: UiContainer } } }
const isMessageError = (e: unknown): e is ErrorWithUI => {
    return ((e as ErrorWithUI).response?.data?.ui?.messages?.length || 0) > 0
}
const alertUnknownError = (e: unknown) => {
    if (isMessageError(e)) {
        for (const message of e.response.data.ui.messages!) {
            alert(message.text)
        }
    } else {
        alert(e)
    }
}