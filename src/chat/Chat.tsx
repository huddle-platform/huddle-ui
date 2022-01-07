import Input from "../shared/Input"
import { ChatBubble, ChatBubbleProps } from "./ChatBubble"
import "./chat.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { MessageAuthor, useGetChatWithUserIdMutation, useWriteMessageToUserIdMutation } from "../schemas"

type ChatProps = {
    withUserId: string
}
export const Chat: React.FC<ChatProps> = props => {
    const [outQueue, setOutQueue] = useState<ChatBubbleProps[]>([])
    const [messageLimit, setMessageLimit]=useState(100)
    const [updateChat, res] = useGetChatWithUserIdMutation({ variables: { userId: props.withUserId, start: 0, count: messageLimit } })
    const [writeMessage] = useWriteMessageToUserIdMutation()
    const [divElement,setRef]=useState<HTMLDivElement|null>(null)
    const cbRef=useCallback<(node:HTMLDivElement|null)=>void>((node)=>{
        setRef(node)
        if(node){
            node.scrollTop = node.scrollHeight
        }
    },[])
    updateChat()
    if (!props.withUserId) return null
    if (res.loading) return <div>Loading...</div>
    if (res.error) return <div>Error: {res?.error?.message}</div>

    const messages = res.data?.getChatById?.messages
    const sortedMessages = messages?.map(m => ({ ...m, time: new Date(m.time) })).sort((a, b) => a.time.getTime() - b.time.getTime())
    return (
        <div>
            <div className="chat" ref={cbRef}>
                {sortedMessages?.map(m => (<ChatBubble
                    date={m.time}
                    message={m.content}
                    sender={m.author == MessageAuthor.Me ? "me" : (res.data?.getChatById?.other?.username || "other")} />)
                )}
                {outQueue.map(p => (
                    <ChatBubble {...p} pending />
                ))}
            </div>
            <Input description="Send a message" clearOnEnter style={{
                width: "80%",
                marginLeft: "2%"
            }} onEnter={(m) => {
                const toAdd = { sender: "me", message: m, date: new Date() }
                setOutQueue([...outQueue, toAdd])
                writeMessage({ variables: { userId: props.withUserId, message: m } }).then((res) => {
                    res.data?.getChatById?.writeMessage.time
                    if (divElement) {
                        divElement.scrollTo({ top: divElement.scrollHeight, behavior: 'smooth' })
                    }
                    updateChat().then(() => {
                        setOutQueue(outQueue.filter(p => p != toAdd))
                    })
                })
            }} />
        </div>
    )
}