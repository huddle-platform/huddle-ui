import 'react'
import { useRef, useState } from 'react';
import useConfig from '../config';
import HomeHeader from '../home-header/home-header';
import ProjectList from '../project-list/project-list';
import { useSearchProjectsQuery } from '../schemas';
import "./home-page.css"

function HomePage() {
    const [searchString, setSearchString] = useState("");
    const [category, setCategory] = useState<string | undefined>(undefined)
    const getOptions = (cat?:string) => {
        if (cat)
            return { tag: cat }
    }
    //console.log(searchString);
    const projectData = useSearchProjectsQuery({ variables: { searchString: searchString, limit: 10, options: getOptions(category) } })
    const config = useConfig()
    const lastRefetch = useRef(-1)
    const onScrollToBottom = () => {
        if (lastRefetch.current === projectData.data?.searchProjects?.length) {
            return;
        }
        lastRefetch.current = projectData.data?.searchProjects?.length || -1;
        projectData.fetchMore({
            variables: {
                offset: projectData.data?.searchProjects?.length,
                limit: 10,
                options: getOptions(category) ,
                searchString: searchString
            }
        })
    }
    const entries = projectData.data?.searchProjects.map(p => ({
        description: p.description,
        id: p.id,
        name: p.name,
        lastUpdated: Math.round((new Date().getTime() - new Date(p.createdAt).getTime()) / (1000 * 3600 * 24)).toString() + " days"
    })) || []
    return (
        <div style={{ position: "relative" }}>
            {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}

            <HomeHeader onSearchStringChange={(searchString: string) => {
                setSearchString(searchString)
                projectData.refetch({
                    searchString: searchString,
                    limit: 10,
                    options: getOptions(category) ,
                });
            }} onCategoryChange={(newCategory) => {
                setCategory(newCategory)
                projectData.refetch({
                    searchString: searchString,
                    limit: 10,
                    options: getOptions(newCategory) ,
                });
            }} />
            <div className='home-bottom'>
                <ProjectList entries={entries} onScrollToBottom={onScrollToBottom} />
            </div>
        </div>
    );
}

export default HomePage;