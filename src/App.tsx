import { inject } from '@vercel/analytics'
import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { EnterScreen } from './components/enter/EnterScreen'
import { Scene } from './components/scene/Scene'
import { Hub } from './components/hub/Hub'
import { useAudio } from './hooks/useAudio'

function App() {
  useEffect(() => { inject() }, [])

  const [entered, setEntered] = useState(false)
  const { start, toggleMute, isMuted, playHoverSound } = useAudio()

  const handleEnter = useCallback(() => {
    start()
    setEntered(true)
  }, [start])

  return (
    <>
      <Scene />
      {entered ? (
        <Hub isMuted={isMuted} onToggleMute={toggleMute} playHoverSound={playHoverSound} />
      ) : (
        <EnterScreen onEnter={handleEnter} />
      )}
    </>
  )
}

export default App
