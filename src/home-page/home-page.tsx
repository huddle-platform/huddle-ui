import { Home } from '@mui/icons-material';
import 'react'
import HomeHeader from '../home-header/home-header';
import ShowDetail from '../project-detail/project-detail';
import ShowList from '../project-list/project-list';
import { useGetChatsQuery } from '../schemas';

function HomePage() {
    const { data, loading } = useGetChatsQuery();
    if (loading) return <div>Loading...</div>
    return (
        <div>
        
        {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}
            <HomeHeader></HomeHeader>
            <ShowList></ShowList>
            <ShowDetail></ShowDetail>
        </div>
    );
}

export default HomePage;