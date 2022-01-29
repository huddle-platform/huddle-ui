import { useEffect, useState } from "react"
import PushStream from "zen-push"

type ClientConfig={
    gqlUrl:string
    kratosUrl:string
}
type Config={
    clientConfig:ClientConfig
    view: "desktop" | "mobile"
}
const productionConfig= {
    gqlUrl:'/api/query',
    kratosUrl:'/.ory/kratos',
}
const localConfig= {
    gqlUrl: 'http://localhost:8080/api/query',
    kratosUrl: 'http://localhost:8090',
}

export const clientConfig=localConfig

export const config:Config={
    clientConfig,
    view:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"mobile":"desktop"
}

const configPushStream=new PushStream<Config>()

const useConfig=()=>{
    const [c,setConfig]=useState<Config>(config)
    useEffect(()=>{
        const subscr=configPushStream.observable.subscribe(setConfig)
        return ()=>subscr.unsubscribe()
    })
    return c
}
export default useConfig