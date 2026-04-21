import { useRef, useCallback, useState, useEffect } from 'react'

export const useAudio = () => {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const start = useCallback(() => {
    if (ctxRef.current) return

    const audio = new Audio('/music.mp3')
    audio.loop = true

    const ctx = new AudioContext()
    ctxRef.current = ctx

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    analyserRef.current = analyser
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 3)
    masterRef.current = master

    const source = ctx.createMediaElementSource(audio)
    source.connect(master)
    master.connect(analyser)
    analyser.connect(ctx.destination)

    ctx.resume().then(() => audio.play().catch(() => { }))
  }, [])

  const toggleMute = useCallback(() => {
    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    setIsMuted(prev => {
      const next = !prev
      const now = ctx.currentTime
      const fadeTime = 0.3 // seconds

      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(
        next ? 0 : 0.8,
        now + fadeTime
      )

      return next
    })
  }, [])

  const getFrequencyData = useCallback((): Uint8Array | null => {
    if (!analyserRef.current || !dataArrayRef.current) return null
    analyserRef.current.getByteFrequencyData(dataArrayRef.current)
    return dataArrayRef.current
  }, [])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/hover.mp3')
    audioRef.current.volume = 0.4
  }, [])

  const playHoverSound = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    audio.play().catch(() => { })
  }, [])

  return { start, toggleMute, isMuted, getFrequencyData, playHoverSound }
}
