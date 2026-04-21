import { useState } from 'react'
import './EnterScreen.css'

interface EnterScreenProps {
  onEnter: () => void
}

export const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [leaving, setLeaving] = useState(false)

  const handleClick = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onEnter, 750)
  }

  return (
    <div className={`enter-screen${leaving ? ' leaving' : ''}`} onClick={handleClick}>
      <div className="enter-screen__scanlines" />
      <div className="enter-screen__vignette" />
      <div className="enter-screen__content">
        <p className="enter-screen__eyebrow">SYSTEM ONLINE</p>
        <h1 className="enter-screen__title" data-text="JACK THOMSON">
          JACK THOMSON
        </h1>
        <p className="enter-screen__subtitle">STAFF SOFTWARE ENGINEER</p>
        <div className="enter-screen__divider" />
        <button className="enter-screen__cta">
          <span className="enter-screen__bracket">[</span>
          <span className="enter-screen__cta-label">ENTER</span>
          <span className="enter-screen__bracket">]</span>
        </button>
        <p className="enter-screen__hint">click anywhere to continue</p>
      </div>
    </div>
  )
}
