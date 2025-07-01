import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from './components/LoginPage.jsx'
import ContentPage from './components/ContentPage.jsx'
import PlayQuiz from './components/playQuiz.jsx'
import { Provider } from 'react-redux'
import quesByCtgStore from './store/index.js'
import HomePage from './components/HomePage.jsx'
import RegistrationPage from './components/RegistrationPage.jsx'
import ReadNotes from './components/ReadNotes.jsx'


const router = createBrowserRouter([ 
  { 
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/signup", element: <RegistrationPage />},
      { path: "/login", element: <LoginPage /> },
      { path: "/", element: <ContentPage /> },
      { path: "/playQuiz", element: <PlayQuiz /> },
      {path: "/readNotes", element: <ReadNotes /> }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={quesByCtgStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
