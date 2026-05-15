import { useState, useEffect, Suspense } from 'react'
import { Profile } from '../profile/Profile'
import { Social } from '../social/Social'
import './Hub.css'

type Screen = 'main' | 'profile' | 'social'

interface HubProps {
  isMuted: boolean
  onToggleMute: () => void
  playHoverSound: () => void
}

const NAV_ITEMS = [
  { id: 'profile' as const, code: '01', label: 'PROFILE_DATA.sys', desc: 'Entity identification matrix' },
  { id: 'social'  as const, code: '02', label: 'NETWORK_LINKS.exe', desc: 'Communication endpoints'      },
]

const MuteIcon = ({ muted }: { muted: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {muted ? (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
      </>
    ) : (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    )}
  </svg>
)

export const Hub = ({ isMuted, onToggleMute, playHoverSound }: HubProps) => {
  const [screen, setScreen] = useState<Screen>('main')
  const [transitioning, setTransitioning] = useState(false)
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 120)
    return () => clearTimeout(t)
  }, [])

  const navigate = (next: Screen) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setScreen(next)
      setTransitioning(false)
    }, 380)
  }

  return (
    <div className={`hub ${booted ? 'hub--booted' : ''}`}>
      <div className="hub__corner hub__corner--tl" />
      <div className="hub__corner hub__corner--tr" />
      <div className="hub__corner hub__corner--bl" />
      <div className="hub__corner hub__corner--br" />

      <div className="hub__edge hub__edge--top">
        <span className="hub__edge-text">SYS::ONLINE</span>
        <span className="hub__edge-sep">{'///'}</span>
        <span className="hub__edge-text hub__edge-ping">{'◉ UPLINK ACTIVE'}</span>
      </div>

      <div className="hub__edge hub__edge--bottom">
        <span className="hub__edge-text">{'JACK THOMSON // v2.0.0'}</span>
        <span className="hub__edge-sep">{'///'}</span>
        <span className="hub__edge-text">2026</span>
      </div>

      <button className="hub__mute" onClick={onToggleMute} onMouseEnter={playHoverSound}>
        <MuteIcon muted={isMuted} />
        <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
      </button>

      <div className={`hub__viewport ${transitioning ? 'hub__viewport--exit' : 'hub__viewport--enter'}`}>
        {screen === 'main' && (
          <MainNav onNavigate={navigate} playHoverSound={playHoverSound} />
        )}
        {screen === 'profile' && (
          <Suspense fallback={null}>
            <Profile onBack={() => navigate('main')} playHoverSound={playHoverSound} />
          </Suspense>
        )}
        {screen === 'social' && (
          <Suspense fallback={null}>
            <Social onBack={() => navigate('main')} playHoverSound={playHoverSound} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

interface MainNavProps {
  onNavigate: (s: Screen) => void
  playHoverSound: () => void
}

const MainNav = ({ onNavigate, playHoverSound }: MainNavProps) => (
  <div className="hub__main">
    <div className="hub__identity">
      <div className="hub__reticle">
        <div className="hub__reticle-ring hub__reticle-ring--outer" />
        <div className="hub__reticle-ring hub__reticle-ring--inner" />
        <div className="hub__reticle-crosshair hub__reticle-crosshair--h" />
        <div className="hub__reticle-crosshair hub__reticle-crosshair--v" />
        <div className="hub__reticle-dot" />
      </div>
      <p className="hub__eyebrow">ENTITY IDENTIFIED</p>
      <h1 className="hub__name" data-text="JACK THOMSON">JACK THOMSON</h1>
      <p className="hub__title">STAFF SOFTWARE ENGINEER</p>
    </div>

    <div className="hub__divider" />

    <nav className="hub__nav">
      <p className="hub__nav-prompt">SELECT MODULE</p>
      {NAV_ITEMS.map((item, i) => (
        <button
          key={item.id}
          className="hub__nav-item"
          style={{ '--i': i } as React.CSSProperties}
          onClick={() => onNavigate(item.id)}
          onMouseEnter={playHoverSound}
        >
          <span className="hub__nav-code">[{item.code}]</span>
          <div className="hub__nav-text">
            <span className="hub__nav-label">{item.label}</span>
            <span className="hub__nav-desc">{item.desc}</span>
          </div>
          <span className="hub__nav-arrow">▶</span>
        </button>
      ))}
    </nav>
  </div>
)
