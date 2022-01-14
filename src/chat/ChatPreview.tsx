import { Avatar } from "@mui/material"
import "./chatPreview.css"
export type ChatPreviewProps = {
    name: string
    messagePreview: string
    profileImageURL?: string
    active?: boolean
    onClick?: () => void
}
export const ChatPreview: React.FC<ChatPreviewProps> = props => {
    const classname = "chat-preview" + (props.active ? " chat-preview-active" : "")
    return (
        <div className={classname} onClick={props.onClick}>
            <div className="avatar-container">
                <Avatar src={props.profileImageURL} />
            </div>
            <div className="right-side-container">
                <h2>{props.name}</h2>
                <p>{props.messagePreview}</p>
            </div>
        </div>
    )
}