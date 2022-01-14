import './App.css';
import { authenticationStream } from './client';
import { AuthenticationManagerPopup, LogoutButton } from './authentication/AuthenticationManagerPopup';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/home-page';
import { Navigator } from './navigator/Navigator';
import { MyProfile } from './profile/MyProfile';
import { Messanger } from './chat/Messanger';
import { ProjectEditor } from './projectEditor/ProjectEditor';
const App: React.FC = () => {
  return (
    <div>
      <AuthenticationManagerPopup a={authenticationStream.observable} />
      <Navigator />
      <Routes>
        <Route path="profile" element={<MyProfile />} />
        <Route path="edit-project/:id" element={<ProjectEditor/>} />
        <Route path="messages" element={<Messanger />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
