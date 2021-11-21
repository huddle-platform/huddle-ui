import './App.css';
import { useGetChatsQuery } from './schemas';
import ShowList from './project-list/project-list';
import ShowDetail from './project-detail/project-detail';

function App() {
  const { data, loading } = useGetChatsQuery();
  if (loading) return <div>Loading...</div>
  return (
    <div className="App">
      <h1>Huddle</h1>
      This is our great app called Huddle. Here we have an example gql query result:
      {/* {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))} */}
      <div className="home-content">
        <ShowList></ShowList>
        <ShowDetail></ShowDetail>
      </div>
    </div>
  );
}

export default App;
