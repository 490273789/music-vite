import { useRoutes, BrowserRouter } from 'react-router-dom'
import routes from './routes'

const Element = () => useRoutes(routes)
function App() {
  return (
    <BrowserRouter>
      <Element />
    </BrowserRouter>
  )
}

export default App
