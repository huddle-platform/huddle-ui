import { Home } from '@mui/icons-material';
import 'react'
import HomeHeader from '../home-header/home-header';
import ShowDetail from '../project-detail/project-detail';
import ShowList from '../project-list/project-list';
import "./home-page.css"

function HomePage() {
    return (
        <div style={{ position: "relative" }}>

            {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}
                <HomeHeader></HomeHeader>
            <div className='home-bottom'>
                <ShowList></ShowList>
                <ShowDetail></ShowDetail>
            </div>
        </div>
    );
}

export default HomePage;