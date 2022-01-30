import { ChatPreview, ChatPreviewProps } from "./ChatPreview";
import "./chatList.css"
import Input from "../shared/Input";
import { useEffect, useState } from "react";
import { MessageAuthor, MyChatsQuery, useGetMeQuery, useGetUserIdByUsernameQuery, useMyChatsQuery } from "../schemas";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never
export type Chat = ArrayElement<MyChatsQuery["chats"]>
export type ChatParticipant = Chat["p1"]
export const displaynameFromChatParticipant = (p?: ChatParticipant) => {
    if (!p) return "unknown"
    if (p.user) {
        return p.user.name || p.user.username || "(unnamed user)"
    }
    if (p.project) {
        return p.project.name
    }
    return "(unnamed participant)"
}
export const otherParticipantFromChat = (chat: Chat) => {
    switch (chat.me) {
        case MessageAuthor.P1:
            return chat.p2
        case MessageAuthor.P2:
            return chat.p1
        default:
            return undefined
    }
}

export const meFromChat = (chat: Chat) => {
    switch (chat.me) {
        case MessageAuthor.P1:
            return chat.p1
        case MessageAuthor.P2:
            return chat.p2
        default:
            return undefined
    }
}

export const displaynameFromChat = (chat: Chat) => {
    return displaynameFromChatParticipant(otherParticipantFromChat(chat))
}


export const ChatList: React.FC<{ onChatSelected?: (chat?: Chat) => void }> = props => {
    const [searchInput, setSearchInput] = useState("")
    const myChatsQueryResult = useMyChatsQuery({ pollInterval: 10000 })
    const meData = useGetMeQuery()
    const foundUser = useGetUserIdByUsernameQuery({ variables: { username: searchInput } })
    const [selected, setSelected] = useState<number>(-1)


    const filteredList = myChatsQueryResult.data?.chats?.filter(chat => displaynameFromChat(chat).toLowerCase().includes(searchInput.toLowerCase()))
        .map(c => ({ ...c, time: c.messages.length > 0 ? new Date(c.messages[0].time) : new Date(0) })) || []
    if (foundUser.data?.getUserByUsername && filteredList.length === 0) {
        filteredList.push({
            messages: [{ author: MessageAuthor.P1, content: "Start chatting with me!", time: new Date() }],
            p1: { user: { ...foundUser.data.getUserByUsername } },
            p2: { user: { id: (meData.data?.me.id || "") } },
            me: MessageAuthor.P2,
            time: new Date()
        })
    }
    const sortedChats = filteredList.sort((a, b) => b.time.getTime() - a.time.getTime())
    return (
        <div className="chat-list">
            <Input description="Search chat or user" onChange={(v) => setSearchInput(v)} />
            {sortedChats.map((c, i) => <ChatPreview messagePreview={c.messages[0].content} name={displaynameFromChat(c)} onClick={() => {
                props.onChatSelected?.(c)
                setSelected(i)
            }} active={selected == i} />)}
        </div>
    )
}