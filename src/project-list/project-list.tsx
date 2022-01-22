import { useState } from "react";
import useConfig from "../config";
import ProjectDetail from "../project-detail/project-detail";
import ProjectListEntry, { ProjectListEntryProps } from "./project-list-entry/project-list-entry";
import './project-list.css'

export type ProjectListProps = {
    entries: ProjectListEntryProps[]
}
const ProjectList: React.FC<ProjectListProps> = (props) => {
    const [detailID, setDetailID] = useState("");
    const config = useConfig()
    if (config.view === "mobile") {
        if (detailID != "") {
            return <ProjectDetail id={detailID}  onBackClicked={()=>{
                setDetailID("")
            }}/>
        }
        return (
        <div className="project-list" style={{width:"100%"}}>
            {props.entries.map(entry => <ProjectListEntry {...entry} onClick={(id => {
                setDetailID(id);
            })} />)}
        </div>)
    }
    if (detailID == "" && props.entries.length > 0) {
        setDetailID(props.entries[0].id);
    }
    return (
        <div className="project-browser">
            <div className="project-list">
                {props.entries.map(entry => <ProjectListEntry {...entry} onClick={(id => {
                    setDetailID(id);
                })} />)}
            </div>
            <ProjectDetail id={detailID} />
        </div>
    );
}



export default ProjectList;