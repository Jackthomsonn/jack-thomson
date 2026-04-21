import { inject } from '@vercel/analytics'
import { useState, useCallback, useEffect } from 'react'
import { SWRConfig, SWRConfiguration } from 'swr'
import './App.css'
import { EnterScreen } from './components/enter/EnterScreen'
import { Scene } from './components/scene/Scene'
import { Overlay } from './components/overlay/Overlay'
import { useAudio } from './hooks/useAudio'

const swrConfig: SWRConfiguration = {
  fetcher: (url: string) =>
    fetch(url).then(async (r) => {
      if (r.status === 200) return r.json()
      const { message } = await r.json()
      throw new Error(message)
    }),
  suspense: true,
}

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
        <SWRConfig value={swrConfig}>
          <Overlay isMuted={isMuted} onToggleMute={toggleMute} />
        </SWRConfig>
      ) : (
        <EnterScreen onEnter={handleEnter} />
      )}
    </>
  )
}

export default App
