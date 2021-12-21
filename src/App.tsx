import './App.css';
import { useGetChatsQuery } from './schemas';
import ShowList from './project-list/project-list';
import ShowDetail from './project-detail/project-detail';
import Home from './home-header/home-header';
import HomePage from './home-page/home-page';

function App() {
  const { data, loading } = useGetChatsQuery();
  if (loading) return <div>Loading...</div>
  return (
    <HomePage></HomePage>
  );
}

export default App;
