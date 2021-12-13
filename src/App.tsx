import './App.css';
import { useGetChatsQuery, useGetMeQuery } from './schemas';
import { authenticationObservable } from './client';
import { AuthenticationManagerPopup } from './authentication/AuthenticationManagerPopup';
const App: React.FC = () => {
  const { data } = useGetChatsQuery();
  return (
    <div className="App">
      <AuthenticationManagerPopup a={authenticationObservable} />
      <h1>Huddle</h1>
      This is our great app called Huddle. Here we have an example gql query result:
      {data?.chats.map(chat => (<p>ID:{chat.id}, with:{chat.with.username}</p>))}
    </div>
  );
}

export default App;
