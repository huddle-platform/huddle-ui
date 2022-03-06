import { Link, useNavigate } from 'react-router-dom';
import { useGetMeWithoutLoginPromptQuery, useGetProjectByIdQuery, useGetProjectUpdatesByIdQuery, useSaveProjectMutation, useUnsaveProjectMutation, useWriteMessageToProjectIdMutation } from '../schemas';
import { ImageGallery } from '../shared/ImageGallery';
import './project-detail.css'
import useConfig from '../config';
import Button from '../shared/Button';
import ReactMarkdown from 'react-markdown';
import TagsComponent from '../shared/TagsComponent/TagsComponent';
import { BookmarkAdd, BookmarkAdded } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { UpdateList } from './UpdateList';
export type ProjectDetailProps = {
    id: string
    onBackClicked?: () => void
}
const ProjectDetail: React.FC<ProjectDetailProps> = (props) => {
    const projectResult = useGetProjectByIdQuery({ variables: { id: props.id } });
    const projectUpdateResult = useGetProjectUpdatesByIdQuery({ variables: { id: props.id } });
    const meResult = useGetMeWithoutLoginPromptQuery();
    const navigate = useNavigate();
    const [saveProject] = useSaveProjectMutation()
    const [unsaveProject] = useUnsaveProjectMutation()
    const [writeMessageToProject] = useWriteMessageToProjectIdMutation()
    const config = useConfig()
    if (props.id == "") return <div></div>
    if (projectResult.loading) return <div className='project-detail'>Loading...</div>
    if (projectResult.error) return <div className='project-detail'>Error: {projectResult.error.message}</div>
    const images = projectResult.data?.getProject?.images
    return (
        <div className="project-detail" style={{
            width: config.view == "mobile" ? "100%" : "60%"
        }}>
            {config.view == "mobile" && <Button onClick={props.onBackClicked} >Back</Button>}
            <h1>{projectResult.data?.getProject?.name}</h1>
            <TagsComponent tags={projectResult.data?.getProject?.tags || ["...still loading tags"]} />
            <ReactMarkdown >{projectResult.data?.getProject?.description || "(no description provided)"}</ReactMarkdown>
            {images && images.length > 0 ? <div >
                <ImageGallery images={images.map(image => ({
                    url: image.url,
                    description: image.description || undefined
                }))} />
            </div> : null}
            <p>Created by {projectResult.data?.getProject?.creator.username}</p>
            {meResult.data?.meIfLoggedIn && meResult.data?.meIfLoggedIn?.id == projectResult.data?.getProject?.creator.id ? <Link to={"/edit-project/" + props.id}>Edit</Link> : null}
            <Button filled onClick={() => {
                writeMessageToProject({ variables: { projectId: props.id, message: "Hi, I would like to connect!" } }).then(res => {
                    if (res.data?.writeMessageToProject) {
                        navigate("/messages")
                    }
                })
            }}>Connect</Button>
            {projectResult.data?.getProject?.saved ? <BookmarkAdded style={{ cursor: "pointer" }} fontSize="large" sx={{ color: grey[900] }} onClick={async () => {
                await unsaveProject({ variables: { projectId: props.id } })
                projectResult.refetch()
                projectResult.client.refetchQueries({
                    include: ["getSavedProjects"]
                })
            }} /> : <BookmarkAdd style={{ cursor: "pointer" }} fontSize="large" sx={{ color: grey[900] }} onClick={async () => {
                await saveProject({ variables: { projectId: props.id } })
                projectResult.refetch()
                projectResult.client.refetchQueries({
                    include: ["getSavedProjects"]
                })
            }} />}
            {projectUpdateResult.data?.getProject?.updates[0] && <UpdateList updates={projectUpdateResult.data.getProject?.updates.map(update => ({
                content: update.content,
                timestamp: new Date(update.time),
                images: update.images
            }))} />}
        </div>
    );
}

export default ProjectDetail;