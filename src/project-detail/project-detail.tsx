import { Link } from 'react-router-dom';
import { useGetMeWithoutLoginPromptQuery, useGetProjectByIdQuery } from '../schemas';
import ImageGallery from "react-image-gallery"
import './project-detail.css'
import "react-image-gallery/styles/css/image-gallery.css";
import useConfig from '../config';
import Button from '../shared/Button';
export type ProjectDetailProps = {
    id: string
    onBackClicked?: () => void
}
const ProjectDetail: React.FC<ProjectDetailProps> = (props) => {
    const projectResult = useGetProjectByIdQuery({ variables: { id: props.id } });
    const meResult = useGetMeWithoutLoginPromptQuery();
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
            <p>{projectResult.data?.getProject?.description}</p>
            {images && images.length > 0 ? <div >
                <ImageGallery items={images.map(image => ({
                    original: image.url,
                    thumbnail: image.url,
                    description: image.description || undefined
                }))} />
            </div> : null}
            <p>Created by {projectResult.data?.getProject?.creator.username}</p>
            {meResult.data?.meIfLoggedIn && meResult.data?.meIfLoggedIn?.id == projectResult.data?.getProject?.creator.id ? <Link to={"/edit-project/" + props.id}>Edit</Link> : null}
        </div>
    );
}

export default ProjectDetail;