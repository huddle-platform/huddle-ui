import Input from "../shared/Input"
import { ChatBubble, ChatBubbleProps } from "./ChatBubble"
import "./chat.css"
import { useState } from "react"

type ChatProps = {
    messages: ChatBubbleProps[]
    onMessage?: (message: ChatBubbleProps) => Promise<void>
}
export const Chat: React.FC<ChatProps> = props => {
    const [outQueue, setOutQueue] = useState<ChatBubbleProps[]>([])
    return (
        <div>
            <div className="chat">
                {props.messages.map(m => <ChatBubble {...m} />)}
                {outQueue.map(p => (
                    <ChatBubble {...p} pending />
                ))}
            </div>
            <Input description="Send a message" clearOnEnter style={{
                width: "80%",
                marginLeft: "2%"
            }} onEnter={(m) => {
                if (!props.onMessage) return
                const toAdd = { sender: "me", message: m, date: new Date() }
                setOutQueue([...outQueue, toAdd])
                props.onMessage(toAdd).then(() => {
                    setOutQueue(outQueue.filter(v => !props.messages.includes(v)))
                }).catch(() => {
                    alert("message could not be sent!")
                    setOutQueue(outQueue.filter(v => v != toAdd))
                })

            }
            } />
        </div>
    )
}