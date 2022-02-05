import 'react'
import { useRef, useState } from 'react';
import useConfig from '../config';
import HomeHeader from '../home-header/home-header';
import ProjectList from '../project-list/project-list';
import { useSearchProjectsQuery } from '../schemas';
import "./home-page.css"

function HomePage() {
    //const [searchString, setSearchString] = useState("");
    //console.log(searchString);
    const projectData = useSearchProjectsQuery({ variables: { searchString: "", limit:10} })
    const config = useConfig()
    const lastRefetch = useRef(-1)
    const onScrollToBottom = () => {
        if (lastRefetch.current===projectData.data?.searchProjects?.length) {
            return;
        }
        lastRefetch.current = projectData.data?.searchProjects?.length||-1;
        projectData.fetchMore({
            variables: {
                offset: projectData.data?.searchProjects?.length,
                limit:10,
                searchString:""
            }
        })
    }
    const entries = projectData.data?.searchProjects.map(p => ({
        description: p.description,
        id: p.id,
        name: p.name,
        lastUpdated: Math.round((new Date().getTime() - new Date(p.createdAt).getTime()) / (1000 * 3600 * 24)).toString() + " days"
    })) || []
    if (config.view == "mobile") {
        return (
            <div>
                <p style={{ margin: "auto", marginLeft: "30px", marginRight: "10px", height: "60px", paddingTop: "30px" }}>Find your next student project <img src={"/ui/huddle-logo.png"} className="home-logo-huddle-icon-mobile" /></p>
                <div className='home-bottom'>
                    <ProjectList entries={entries} onScrollToBottom={onScrollToBottom} />
                </div>
            </div>)
    }
    return (
        <div style={{ position: "relative" }}>
            {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}
            <HomeHeader onStringChange={(searchString: string) => {
                projectData.refetch({searchString: searchString, limit:10});
            }}/>
            <div className='home-bottom'>
                <ProjectList entries={entries} onScrollToBottom={onScrollToBottom} />
            </div>
        </div>
    );
}

export default HomePage;