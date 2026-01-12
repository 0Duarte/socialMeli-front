import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Followers from './pages/Followers';
import Following from './pages/Following';
import Feed from './pages/Feed';
import Publish from './pages/Publish';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/:userId/followers" element={<Followers />} />
              <Route path="/users/:userId/followed" element={<Following />} />
              <Route path="/users/:userId/feed" element={<Feed />} />
              <Route path="/publish" element={<Publish />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
