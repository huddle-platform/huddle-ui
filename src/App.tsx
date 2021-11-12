import './App.css';
import { useGetMeQuery } from './schemas';
function App() {
  const {data,loading}=useGetMeQuery();
  if(loading) return <div>Loading...</div>
  return (
    <div className="App">
      <h1>Huddle</h1>
      This is our great app called Huddle. Here we have an example gql query result:
      {data?.me?.name}
    </div>
  );
}

export default App;
