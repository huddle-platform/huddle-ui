import { Link } from 'react-router-dom';
import { useGetMeWithoutLoginPromptQuery, useGetProjectByIdQuery } from '../schemas';
import './project-detail.css'
export type ProjectDetailProps = {
    id: string
}
const ProjectDetail: React.FC<ProjectDetailProps> = (props) => {
    const projectResult = useGetProjectByIdQuery({ variables: { id: props.id } });
    const meResult = useGetMeWithoutLoginPromptQuery();
    if (props.id == "") return <div></div>
    if (projectResult.loading) return <div className='project-detail'>Loading...</div>
    if (projectResult.error) return <div className='project-detail'>Error: {projectResult.error.message}</div>
    return (
        <div className="project-detail">
            <h1>{projectResult.data?.getProject?.name}</h1>
            <p>{projectResult.data?.getProject?.description}</p>
            <p>Created by {projectResult.data?.getProject?.creator.username}</p>
            {meResult.data?.meIfLoggedIn && meResult.data?.meIfLoggedIn?.id == projectResult.data?.getProject?.creator.id ? <Link to={"/edit-project/" + props.id}>Edit</Link> : null}
        </div>
    );
}

export default ProjectDetail;