import { useState } from "react";
import ProjectDetail from "../project-detail/project-detail";
import ProjectListEntry, { ProjectListEntryProps } from "./project-list-entry/project-list-entry";
import './project-list.css'

export type ProjectListProps = {
    entries: ProjectListEntryProps[]
}
const ProjectList: React.FC<ProjectListProps> = (props) => {
    const [detailID,setDetailID]=useState("");
    return (
        <div className="project-browser">
            <div className="project-list">
                {props.entries.map(entry => <ProjectListEntry {...entry} onClick={(id=>{
                    setDetailID(id);
                })} />)}
            </div>
            <ProjectDetail id={detailID}/>
        </div>
    );
}



export default ProjectList;