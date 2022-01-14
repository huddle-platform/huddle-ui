import { TrafficOutlined } from "@mui/icons-material"
import { useState } from "react"
import { Chat } from "./Chat"
import { ChatBubbleProps } from "./ChatBubble"
import { ChatList } from "./ChatList"
import "./messanger.css"
export const Messanger: React.FC = props => {
    const [chosenUserId, setChosenUserId] = useState<string>("")
    return (
        <div className="messanger">
            <div className="chat-container">
                <Chat withUserId={chosenUserId} />
            </div>
            <ChatList onChatSelected={setChosenUserId} />
        </div>
    )
}