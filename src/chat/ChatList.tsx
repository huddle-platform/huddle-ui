import { ChatPreview, ChatPreviewProps } from "./ChatPreview";
import "./chatList.css"
import Input from "../shared/Input";
import { useEffect, useState } from "react";
import { MessageAuthor, useGetUserIdByUsernameQuery, useMyChatsQuery } from "../schemas";
export const ChatList: React.FC<{ onChatSelected?: (selectedUserId: string) => void }> = props => {
    const [searchInput, setSearchInput] = useState("")
    const myChatsQueryResult = useMyChatsQuery({ pollInterval: 10000 })
    const foundUser = useGetUserIdByUsernameQuery({ variables: { username: searchInput } })
    const [selected, setSelected] = useState<number>(-1)
    const filteredList = myChatsQueryResult.data?.chats?.filter(chat => chat.other?.username?.toLowerCase().includes(searchInput.toLowerCase())) || []
    if (foundUser.data?.getUserByUsername && filteredList.length === 0) {
        filteredList.push({
            messages: [{ author: MessageAuthor.Other, content: "Start chatting with me!", time: new Date() }],
            other: foundUser.data.getUserByUsername
        })
    }
    return (
        <div className="chat-list">
            <Input description="Search chat or user" onChange={(v) => setSearchInput(v)} />
            {filteredList.map((c, i) => <ChatPreview messagePreview={c.messages[0].content} name={c.other.username || ""} onClick={() => {
                props.onChatSelected?.(c.other.id)
                setSelected(i)
            }} active={selected == i} />)}
        </div>
    )
}