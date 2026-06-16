import React from 'react'
import ReactDOM from 'react-dom/client'

function Test() {
  return <h1>Vanica Test</h1>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
)
