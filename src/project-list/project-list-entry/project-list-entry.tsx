import './project-list-entry.css';
import { ReactSVG } from 'react-svg';
import SVG, { Props as SVGProps } from 'react-inlinesvg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';

export type ProjectListEntryProps = {
  name: string;
  id: string;
  location?: string;
  lastUpdated?: string;
  description: string;
  onClick?: (id: string) => void;
}
const ProjectListEntry: React.FC<ProjectListEntryProps> = (props) => {
  return (
    <div className="project-list-entry" onClick={() => {
      props.onClick?.(props.id);
    }}>
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
