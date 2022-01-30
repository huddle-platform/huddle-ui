import { TrafficOutlined } from "@mui/icons-material"
import { useState } from "react"
import { Chat, ChatParticipant } from "./ChatList"
import { UnifiedChat, UserChat } from "./Chat"
import { ChatBubbleProps } from "./ChatBubble"
import { ChatList } from "./ChatList"
import "./messanger.css"
export const Messanger: React.FC = props => {
    const [chosenChat, setChosenChat] = useState<Chat | undefined>(undefined)
    return (
        <div className="messanger">
            <div className="chat-container">
                <UnifiedChat chat={chosenChat} />
            </div>
            <ChatList onChatSelected={setChosenChat} />
        </div>
    )
}