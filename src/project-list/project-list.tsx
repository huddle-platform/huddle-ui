import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useConfig from "../config";
import ProjectDetail from "../project-detail/project-detail";
import ProjectListEntry, { ProjectListEntryProps } from "./project-list-entry/project-list-entry";
import './project-list.css'

export type ProjectListProps = {
    entries: ProjectListEntryProps[]
    onScrollToBottom?: () => void
}
const ProjectList: React.FC<ProjectListProps> = (props) => {
    //const [detailID, setDetailID] = useState("");
    const config = useConfig()
    const lastScrollTop = useRef(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const [params, setParams] = useSearchParams();
    const detailID = params.get("detail") || ""
    const setDetailID = (id: string) => {
        if (id == "") {
            setParams({})
        } else {
            setParams({ "detail": id })
        }
    }
    if (scrollRef.current) {
        if (scrollRef.current.scrollHeight === scrollRef.current.clientHeight && lastScrollTop.current === 0) {
            props.onScrollToBottom?.()
            lastScrollTop.current = scrollRef.current.scrollTop;
        }
    }
    if (config.view === "mobile") {
        if (detailID != "") {
            return <ProjectDetail id={detailID} onBackClicked={() => {
                setDetailID("")
            }} />
        }
        return (
            <div className="project-list" style={{ width: "100%" }}>
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
            <div className="project-list" onScroll={(ev) => {
                const distanceToBottom = ev.currentTarget.scrollHeight - ev.currentTarget.scrollTop - ev.currentTarget.offsetHeight;
                const lastDistanceToBottom = ev.currentTarget.scrollHeight - lastScrollTop.current - ev.currentTarget.offsetHeight;
                if (distanceToBottom < 100 && lastDistanceToBottom > 100) {
                    lastScrollTop.current = ev.currentTarget.scrollTop;
                    props.onScrollToBottom?.();
                }
            }} ref={scrollRef}>
                {props.entries.map(entry => <ProjectListEntry {...entry} onClick={(id => {
                    setDetailID(id);
                })} />)}
            </div>
            <ProjectDetail id={detailID} />
        </div>
    );
}



export default ProjectList;