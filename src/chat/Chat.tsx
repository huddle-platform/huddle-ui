import Input from "../shared/Input"
import { ChatBubble, ChatBubbleProps } from "./ChatBubble"
import "./chat.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { MessageAuthor, useGetChatWithProjectIdQuery, useGetChatWithUserAsProjectQuery, useGetChatWithUserIdQuery, useWriteMessageToProjectIdMutation, useWriteMessageToUserIdMutation, useWriteProjectMessageToUserIdMutation } from "../schemas"
import { Link } from "react-router-dom"
import { Chat, ChatParticipant, meFromChat, otherParticipantFromChat } from "./ChatList"

type UserChatProps = {
    withUserId: string
}
export const UserChat: React.FC<UserChatProps> = props => {
    const [outQueue, setOutQueue] = useState<ChatBubbleProps[]>([])
    const [messageLimit, setMessageLimit] = useState(100)
    const chatResult = useGetChatWithUserIdQuery({ pollInterval: 10000, variables: { userId: props.withUserId, count: messageLimit } })
    const [writeMessage] = useWriteMessageToUserIdMutation()
    const [divElement, setRef] = useState<HTMLDivElement | null>(null)
    const cbRef = useCallback<(node: HTMLDivElement | null) => void>((node) => {
        setRef(node)
        if (node) {
            node.scrollTop = node.scrollHeight
        }
    }, [])
    if (!props.withUserId) return null
    if (chatResult.loading && !chatResult.data) return <div>Loading...</div>
    if (chatResult.error) return <div>Error: {chatResult?.error?.message}</div>

    const messages = chatResult.data?.getChatByUserId?.messages
    const sortedMessages = messages?.map(m => ({ ...m, time: new Date(m.time) })).sort((a, b) => a.time.getTime() - b.time.getTime())
    const me = chatResult.data?.getChatByUserId?.me
    const otherUser = me == MessageAuthor.P1 ? chatResult.data?.getChatByUserId?.p2.user : chatResult.data?.getChatByUserId?.p1.user
    return (
        <div>
            <div className="chat" ref={cbRef}>
                {sortedMessages?.map(m => (<ChatBubble
                    date={m.time}
                    message={m.content}
                    sender={m.author == me ? "me" : (otherUser?.name || otherUser?.username || "other")} />)
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
                    if (divElement) {
                        divElement.scrollTo({ top: divElement.scrollHeight, behavior: 'smooth' })
                    }
                    chatResult.refetch().then(v => {
                        setOutQueue(outQueue.filter(p => p != toAdd))
                    })
                })
            }} />
        </div>
    )
}

type ProjectChatProps = {
    withProjectId: string
}
export const ProjectChat: React.FC<ProjectChatProps> = props => {
    const [outQueue, setOutQueue] = useState<ChatBubbleProps[]>([])
    const [messageLimit, setMessageLimit] = useState(100)
    const chatResult = useGetChatWithProjectIdQuery({ pollInterval: 10000, variables: { projectId: props.withProjectId, count: messageLimit } })
    const [writeMessage] = useWriteMessageToProjectIdMutation()
    const [divElement, setRef] = useState<HTMLDivElement | null>(null)
    const cbRef = useCallback<(node: HTMLDivElement | null) => void>((node) => {
        setRef(node)
        if (node) {
            node.scrollTop = node.scrollHeight
        }
    }, [])
    if (!props.withProjectId) return null
    if (chatResult.loading && !chatResult.data) return <div>Loading...</div>
    if (chatResult.error) return <div>Error: {chatResult?.error?.message}</div>

    const messages = chatResult.data?.getChatByProjectId?.messages
    const sortedMessages = messages?.map(m => ({ ...m, time: new Date(m.time) })).sort((a, b) => a.time.getTime() - b.time.getTime())
    const me = chatResult.data?.getChatByProjectId?.me
    const project = me == MessageAuthor.P1 ? chatResult.data?.getChatByProjectId?.p2.project : chatResult.data?.getChatByProjectId?.p1.project
    return (
        <div>
            <div className="chat-info"><Link to={"/?detail=" + props.withProjectId} >Project {project?.name}</Link></div>
            <div className="chat" ref={cbRef}>
                {sortedMessages?.map(m => (<ChatBubble
                    date={m.time}
                    message={m.content}
                    sender={m.author == me ? "me" : (project?.name || "Unnamed Project")} />)
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
                writeMessage({ variables: { projectId: props.withProjectId, message: m } }).then((res) => {
                    if (divElement) {
                        divElement.scrollTo({ top: divElement.scrollHeight, behavior: 'smooth' })
                    }
                    chatResult.refetch().then(v => {
                        setOutQueue(outQueue.filter(p => p != toAdd))
                    })
                })
            }} />
        </div>
    )
}

type ProjectChatAsProjectProps = {
    projectId: string
    withUserId: string
}
export const ProjectChatAsProject: React.FC<ProjectChatAsProjectProps> = props => {
    const [outQueue, setOutQueue] = useState<ChatBubbleProps[]>([])
    const [messageLimit, setMessageLimit] = useState(100)
    const chatResult = useGetChatWithUserAsProjectQuery({
        pollInterval: 10000, variables: {
            projectId: props.projectId,
            userId: props.withUserId,
            count: messageLimit
        }
    })
    const [writeMessage] = useWriteProjectMessageToUserIdMutation()
    const [divElement, setRef] = useState<HTMLDivElement | null>(null)
    const cbRef = useCallback<(node: HTMLDivElement | null) => void>((node) => {
        setRef(node)
        if (node) {
            node.scrollTop = node.scrollHeight
        }
    }, [])
    if (!props.projectId) return null
    if (chatResult.loading && !chatResult.data) return <div>Loading...</div>
    if (chatResult.error) return <div>Error: {chatResult?.error?.message}</div>

    const messages = chatResult.data?.getProject?.getChatByUserId?.messages
    const sortedMessages = messages?.map(m => ({ ...m, time: new Date(m.time) })).sort((a, b) => a.time.getTime() - b.time.getTime())
    const me = chatResult.data?.getProject?.getChatByUserId?.me
    const project = me == MessageAuthor.P1 ? chatResult.data?.getProject?.getChatByUserId?.p1.project : chatResult.data?.getProject?.getChatByUserId?.p2.project
    const otherUser = me == MessageAuthor.P1 ? chatResult.data?.getProject?.getChatByUserId?.p2.user : chatResult.data?.getProject?.getChatByUserId?.p1.user
    return (
        <div>
            <div className="chat-info"><Link to={"/?detail=" + project?.id} >Writing as project {project?.name}</Link></div>
            <div className="chat" ref={cbRef}>
                {sortedMessages?.map(m => (<ChatBubble
                    date={m.time}
                    message={m.content}
                    sender={m.author == me ? "me" : (otherUser?.username || "other")} />)
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
                writeMessage({ variables: { projectId: props.projectId, userId: props.withUserId, message: m } }).then((res) => {
                    if (divElement) {
                        divElement.scrollTo({ top: divElement.scrollHeight, behavior: 'smooth' })
                    }
                    chatResult.refetch().then(v => {
                        setOutQueue(outQueue.filter(p => p != toAdd))
                    })
                })
            }} />
        </div>
    )
}

export const UnifiedChat: React.FC<{ chat?: Chat }> = ({ chat }) => {
    if (!chat) return null
    const me = meFromChat(chat)
    const other = otherParticipantFromChat(chat)
    if (me?.user && other?.user) {
        return <UserChat withUserId={other.user.id} />
    }
    if (me?.project && other?.user) {
        return <ProjectChatAsProject projectId={me.project.id} withUserId={other.user.id} />
    }
    if (me?.user && other?.project) {
        return <ProjectChat withProjectId={other.project.id} />
    }
    return null
}