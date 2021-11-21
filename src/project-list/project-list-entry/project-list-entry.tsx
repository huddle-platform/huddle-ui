import './project-list-entry.css';
import { ReactSVG } from 'react-svg';
import SVG, {Props as SVGProps} from 'react-inlinesvg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function ShowEntry() {
  return (
    <div className="project-list-entry">
        <h1 className="project-list-entry">Project title</h1>
        <h2 className="project-list-entry">Location</h2>
        <span>
        <body className="project-list-entry">This is our great app called Huddle. Here we have an example gql query result:</body>
        <AccessTimeIcon/>

        </span>
        <h3 className="project-list-entry">last updated 2 hours ago</h3>
    </div>
  );
}

export default ShowEntry;
