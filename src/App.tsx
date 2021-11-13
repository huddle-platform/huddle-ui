import './App.css';
import { useGetMessagesQuery } from './schemas';
function App() {
  const { data, loading } = useGetMessagesQuery();
  if (loading) return <div>Loading...</div>
  return (
    <div className="App">
      <h1>Huddle</h1>
      This is our great app called Huddle. Here we have an example gql query result:
      {data?.messages.map(message => (<p>ID:{message.id}, Message:{message.message}</p>))}
    </div>
  );
}

export default App;
