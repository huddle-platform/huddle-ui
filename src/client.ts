import { HttpLink, ApolloClient, InMemoryCache, ApolloLink, Observable } from "@apollo/client";
import { AuthenticationRequest } from "./authentication/authenticationObserbale";

const endpointLink = new HttpLink({
    //uri: 'https://huddle.ridilla.eu/api/query',
    uri: 'http://localhost:8080/api/query',
    credentials: "include"
});
const subscribers: ZenObservable.SubscriptionObserver<AuthenticationRequest>[] = []
export const authenticationObservable = new Observable<AuthenticationRequest>((s) => { subscribers.push(s) })
const LoginLink = new ApolloLink((operation, forward) => {
    const observable = endpointLink.request(operation);
    return new Observable((observer) => {
        const subs = observable!.subscribe({
            next: (data) => {
                if (data.errors?.[0]?.message.includes("authenticate")) {
                    subscribers.forEach(s => s.next({
                        onFailed: () => {
                            observer.next(data)
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
                    }))
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
                observer.complete();
            }
        });
    });
});

export const client = new ApolloClient({
    // uri: 'https://huddle.ridilla.eu/api/query',
    cache: new InMemoryCache(),
    link: LoginLink
});