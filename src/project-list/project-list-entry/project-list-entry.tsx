import './project-list-entry.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import { Bookmark } from '@mui/icons-material';

export type ProjectListEntryProps = {
  name: string;
  id: string;
  location?: string;
  lastUpdated?: string;
  description: string;
  saved?: boolean
  onClick?: (id: string) => void;
}
const ProjectListEntry: React.FC<ProjectListEntryProps> = (props) => {
  return (
    <div className="project-list-entry" onClick={() => {
      props.onClick?.(props.id);
    }} key={props.id}>
      {props.saved && <Bookmark style={{position:"absolute",right:20}}/>}
      <h1 className="project-list-entry">{props.name}</h1>

      <LocationOn className="project-list-entry-location" />
      <span>
        <h2 className="project-list-entry">{props.location || "unknown"}</h2>
      </span>

      <p className="project-list-entry">{props.description.substring(0, 100)}</p>

      <AccessTimeIcon className="project-list-entry-time" />
      <span>
        <h3 className="project-list-entry">last updated {props.lastUpdated} ago</h3>
      </span>

      <hr className="project-list-entry" />
    </div>
  );
}

export default ProjectListEntry;
