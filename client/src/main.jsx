import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProjectDetail from './pages/ProjectDetail'
import SuggestionBox from './pages/SuggestionBox';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profiles/:username',
        element: <Profile />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/projects/:projectId',
        element: <ProjectDetail />
      },
      {
        path: '/suggestions',
        element: <SuggestionBox />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)