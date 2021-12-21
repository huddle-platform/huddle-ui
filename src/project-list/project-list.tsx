import ShowEntry from "./project-list-entry/project-list-entry";
import './project-list.css'

function ShowList() {
    return (
        <div className="project-list">
            <ShowEntry></ShowEntry>
            <ShowEntry></ShowEntry>
            <ShowEntry></ShowEntry>
            <ShowEntry></ShowEntry>
            <ShowEntry></ShowEntry>
            <ShowEntry></ShowEntry>
        </div>
    );
}

export default ShowList;