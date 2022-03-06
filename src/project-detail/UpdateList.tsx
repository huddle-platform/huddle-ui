import { ImageGallery } from "../shared/ImageGallery"
import "./updateList.css"
type Update = {
    content: string
    timestamp: Date
    images?: string[]
}
type UpdateListProps = {
    updates: Update[]
}
export const UpdateList: React.FC<UpdateListProps> = props => {
    return (
        <div>
            <h2>Updates</h2>
            {props.updates.map(update => (
                <div className="update-container">
                    <p className="update-timestamp">{Math.round((new Date().getTime() - update.timestamp.getTime()) / (1000 * 3600 * 24)).toString()} days ago</p>
                    <p className="update-content">{update.content}</p>
                    {update.images && <ImageGallery images={update.images.map(i => ({ url: i }))} />}
                    <hr />
                </div>
            ))}
        </div>
    )
}