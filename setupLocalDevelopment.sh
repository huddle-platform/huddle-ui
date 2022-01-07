kubectl port-forward --namespace default svc/gql-api-exposer 8080:8080 &
kubectl port-forward --namespace default svc/kratos-public 8090:80
pkill -signal -P ppid