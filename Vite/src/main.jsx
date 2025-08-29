import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import App2 from './App2.jsx'

// 아래는 Router 사용을 위해 필요
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  //StrictMode가 있으면 App() 실행이 두 번 되는(console.log가 두 번찍힘. 이건 의도된 동작임. 이걸 주석하면 한번만 찍힘)
  //<StrictMode>
  <BrowserRouter>
      { <App /> }
      {/* { <App2 /> } */}
  </BrowserRouter>
  //</StrictMode>,
)
