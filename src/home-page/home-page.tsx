import 'react'
import HomeHeader from '../home-header/home-header';
import ProjectList from '../project-list/project-list';
import { useSearchProjectsQuery } from '../schemas';
import "./home-page.css"

function HomePage() {
    const projectData = useSearchProjectsQuery({ variables: { searchString: "" } })
    return (
        <div style={{ position: "relative" }}>
            {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}
            <HomeHeader />
            <div className='home-bottom'>
                <ProjectList entries={projectData.data?.searchProjects.map(p => ({
                    description: p.description,
                    id: p.id,
                    name: p.name
                })) || []} />
            </div>
        </div>
    );
}

export default HomePage;