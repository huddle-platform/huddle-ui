import './App.css';
import { useGetChatsQuery, useGetMeQuery } from './schemas';
import { authenticationStream } from './client';
import { AuthenticationManagerPopup, LogoutButton } from './authentication/AuthenticationManagerPopup';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/home-page';
const App: React.FC = () => {
  const { data } = useGetChatsQuery();
  const { data: meData } = useGetMeQuery();
  return (
    <Routes>
      <Route path="*" element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
