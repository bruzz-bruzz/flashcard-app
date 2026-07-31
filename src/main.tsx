import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import App from './components/App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/app' element={<App/>}></Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
)
