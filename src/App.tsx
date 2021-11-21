import './App.css';
import { useGetChatsQuery } from './schemas';
function App() {
  const { data, loading } = useGetChatsQuery();
  if (loading) return <div>Loading...</div>
  return (
    <div className="App">
      <h1>Huddle</h1>
      This is our great app called Huddle. Here we have an example gql query result:
      {data?.chats.map(chat => (<p>ID:{chat.id}, with:{chat.with.username}</p>))}
    </div>
  );
}

export default App;
