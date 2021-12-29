import './App.css';
import { authenticationStream } from './client';
import { AuthenticationManagerPopup, LogoutButton } from './authentication/AuthenticationManagerPopup';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/home-page';
import { Navigator } from './navigator/Navigator';
import { MyProfile } from './profile/MyProfile';
const App: React.FC = () => {
  return (
    <div>
      <AuthenticationManagerPopup a={authenticationStream.observable} />
      <Navigator />
      <Routes>
        <Route path="profile" element={<MyProfile />} />
        <Route path="messages" element={<div>Messages</div>} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
