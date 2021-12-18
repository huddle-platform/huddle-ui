import './App.css';
import { useGetChatsQuery, useGetMeQuery } from './schemas';
import { authenticationStream } from './client';
import { AuthenticationManagerPopup, LogoutButton } from './authentication/AuthenticationManagerPopup';
const App: React.FC = () => {
  const { data } = useGetChatsQuery();
  const { data: meData } = useGetMeQuery();
  return (
    <div className="App">
      <AuthenticationManagerPopup a={authenticationStream.observable} />
      <h1>Huddle</h1>
      <p>User with email {meData?.me.email}</p>
      This is our great app called Huddle. Here we have an example gql query result:
      {data?.chats.map(chat => (<p key={chat.id}>ID:{chat.id}, with:{chat.with.username}</p>))}
      
      <p><LogoutButton /></p>
    </div>
  );
}

export default App;
