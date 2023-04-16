import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useGradientStore from './store'
import Editor from './editor'
import Output from './output'

function App() {

  return (
    <div className="App flex h-screen overflow-hidden">
      <Editor />
      <Output />
    </div>
  )
}

export default App
