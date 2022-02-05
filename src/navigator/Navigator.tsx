import { Link } from "react-router-dom"
import { AccountCircleOutlined, Chat, ChatOutlined, InfoOutlined, MailOutline, MarkAsUnreadOutlined, MarkUnreadChatAltOutlined } from "@mui/icons-material"
import { grey } from '@mui/material/colors';
import "./navigator.css";

export const Navigator: React.FC = () => {
    return (
        <div className="huddle-navigator">
            <Link to="/">Huddle</Link>
            <div className="huddle-navigator-right">
                <Link to="/messages"><ChatOutlined fontSize="inherit" sx={{ color: grey[900] }} /></Link>
                <Link to="/profile"><AccountCircleOutlined fontSize="inherit" sx={{ color: grey[900] }} /></Link>
                <Link to="/about"><InfoOutlined fontSize="inherit" sx={{ color: grey[900] }} /></Link>
            </div>
        </div>
    )
}
// later for notifications
//<MarkUnreadChatAltOutlined/>