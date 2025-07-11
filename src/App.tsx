import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>AlgUI</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)} variant="primary">
          count is {count}
        </Button>
        <Button onClick={() => setCount(0)} variant="secondary" size="small">
          Reset
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Welcome to AlgUI - A React TypeScript application with SASS
      </p>
    </>
  )
}

export default App
