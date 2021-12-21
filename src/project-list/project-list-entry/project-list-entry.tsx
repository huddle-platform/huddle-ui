import './project-list-entry.css';
import { ReactSVG } from 'react-svg';
import SVG, {Props as SVGProps} from 'react-inlinesvg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';

function ShowEntry() {
  return (
    <div className="project-list-entry">
      <h1 className="project-list-entry">Project title</h1>

      <LocationOn className="project-list-entry-location"/>
      <span>
      <h2 className="project-list-entry">Location</h2>
      </span>
      
      <body className="project-list-entry">This is our great app called Huddle. Here we have an example gql query result:</body>

      <AccessTimeIcon className="project-list-entry-time"/>
      <span>
      <h3 className="project-list-entry">last updated 2 hours ago</h3>
      </span>

      <hr className="project-list-entry"/>
    </div>
  );
}

export default ShowEntry;
