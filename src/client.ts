import { HttpLink, ApolloClient, InMemoryCache, ApolloLink, Observable } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import PushStream from "zen-push"
import { AuthenticationRequest } from "./authentication/authenticationObserbale";
import {clientConfig}  from "./config";
import { StrictTypedTypePolicies } from "./schemas";

const endpointLink = new HttpLink({
    uri: clientConfig.gqlUrl,
    credentials: "include"
});
export const authenticationStream = new PushStream<AuthenticationRequest>();
const LoginLink = new ApolloLink((operation, forward) => {
    const observable = endpointLink.request(operation);
    let waitingForLogin = false
    return new Observable((observer) => {
        const subs = observable!.subscribe({
            next: (data) => {
                if (data.errors?.[0]?.message.includes("authenticate")) {
                    waitingForLogin = true
                    authenticationStream.next({
                        onFailed: () => {
                            observer.next(data)
                            waitingForLogin = false
                        },
                        onFinished: () => {
                            // retry fetching data
                            subs.unsubscribe()
                            endpointLink.request(operation)?.subscribe({
                                next: data => observer.next(data),
                                complete: () => observer.complete(),
                                error: (err) => observer.error(err)
                            })
                        }
                    })
                } else {
                    // forward with error
                    observer.next(data);
                }
            },
            error: (error) => {
                observer.error(error);
            }
            ,
            complete: () => {
                if (!waitingForLogin) {
                    observer.complete();
                }
            }
        });
    });
});
const typePolicies: StrictTypedTypePolicies={
    Query:{
        fields:{
            searchProjects:offsetLimitPagination()
        }
    }
}
export const client = new ApolloClient({
    // uri: 'https://huddle.ridilla.eu/api/query',
    cache: new InMemoryCache({typePolicies}),
    link: LoginLink
});