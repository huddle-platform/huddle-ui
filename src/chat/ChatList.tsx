import { ChatPreview, ChatPreviewProps } from "./ChatPreview";
import "./chatList.css"
import Input from "../shared/Input";
import { useState } from "react";
export const ChatList: React.FC<{ chats: ChatPreviewProps[], onChatSelected?: (index: number) => void }> = props => {
    const [selected, setSelected] = useState<number>(-1)
    return (
        <div className="chat-list">
            <Input description="Search" />
            {props.chats.map((c, i) => <ChatPreview active={i === selected} {...c} onClick={() => {
                props.onChatSelected?.(i)
                setSelected(i)
            }} />)}
        </div>
    )
}