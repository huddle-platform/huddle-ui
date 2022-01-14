import "./chatBubble.css"

export type ChatBubbleProps = {
    sender: "me" | string
    message: string
    pending?: boolean
    date: Date
}
export const ChatBubble: React.FC<ChatBubbleProps> = props => {
    const className = "chat-bubble" +
        (props.sender == "me" ? " chat-bubble-me" : " chat-bubble-other") +
        (props.pending ? " chat-bubble-pending" : "")
    return (
        <div className={className} key={props.date.getTime()}>
            <div className="bubble-date">{props.date.toLocaleString()}</div>
            {props.sender == "me" ? null : <div className="sender-indicator">{props.sender}</div>}
            <p>{props.message}</p>
        </div>
    )
}