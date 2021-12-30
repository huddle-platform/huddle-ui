import { TrafficOutlined } from "@mui/icons-material"
import { useState } from "react"
import { Chat } from "./Chat"
import { ChatBubbleProps } from "./ChatBubble"
import { ChatList } from "./ChatList"
import "./messanger.css"
export const Messanger: React.FC = props => {
    const [messages, setMessages] = useState<ChatBubbleProps[]>([{ message: "Hi Ole", sender: "Paul", date: new Date() }])
    return (
        <div className="messanger">
            <div className="chat-container">
                <Chat messages={messages} onMessage={(m) => {
                    return new Promise<void>((res, rej) => {
                        setTimeout(() => {
                            setMessages([...messages, m])
                            res()
                        }, 1000)
                    })
                }} />
            </div>
            <ChatList chats={[{ messagePreview: "lored ipsum asodoasidjoasjdoiajsa soidjoasidjoasijdoasidjoasidjoasi djoasidjaosidjaosidjaosdijaosidjaosidjoasidj", name: "Paul" }, { messagePreview: "lored ipsum...", name: "Paul"}, { messagePreview: "lored ipsum...", name: "Paul" }]} />
        </div>
    )
}