import './App.css';
import { useGetChatsQuery } from './schemas';
import ShowList from './project-list/project-list';
import ShowDetail from './project-detail/project-detail';
import Home from './home-header/home-header';

function App() {
  const { data, loading } = useGetChatsQuery();
  if (loading) return <div>Loading...</div>
  return (
    <div className="App">
      
      {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}
        <Home></Home>
        <ShowList></ShowList>
        <ShowDetail></ShowDetail>
    </div>
  );
}

export default App;
