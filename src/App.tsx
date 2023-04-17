import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useGradientStore from './store'
import Editor from './editor'
import Output from './output'

function App() {

  const outputRef = useRef<HTMLDivElement>(null)

  return (
    <div className="App small:flex h-screen overflow-hidden" >
      <Editor outputRef={outputRef} />
      <Output refT={outputRef} />
    </div>
  )
}

export default App
