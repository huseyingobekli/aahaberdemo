import { useEffect, useRef, useState } from 'react'

export default function TTSPlayer({ text, variant = 'full' }) {
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [voices, setVoices] = useState([])
	const [rate, setRate] = useState(1)
	const utteranceRef = useRef(null)

	// Load voices (browsers load them async)
	useEffect(() => {
		function loadVoices() {
			const list = window.speechSynthesis.getVoices()
			setVoices(list)
		}
		loadVoices()
		window.speechSynthesis.onvoiceschanged = loadVoices
		return () => {
			window.speechSynthesis.onvoiceschanged = null
		}
	}, [])

	// Prepare utterance whenever text or settings change
	useEffect(() => {
		const utterance = new SpeechSynthesisUtterance(text)
		utterance.lang = 'tr-TR'
		utterance.rate = rate
		// Prefer Turkish voice if available
		if (voices && voices.length > 0) {
			const v = voices.find(v => (v.lang || '').toLowerCase().startsWith('tr')) || voices[0]
			if (v) utterance.voice = v
		}
		utterance.onend = () => {
			setIsSpeaking(false)
			setIsPaused(false)
		}
		utterance.onerror = () => {
			setIsSpeaking(false)
			setIsPaused(false)
		}
		utteranceRef.current = utterance
		return () => {
			window.speechSynthesis.cancel()
		}
	}, [text, voices, rate])

	// If user changes rate while playing, restart from beginning
	useEffect(() => {
		if (!utteranceRef.current) return
		if (isSpeaking || isPaused) {
			window.speechSynthesis.cancel()
			window.speechSynthesis.speak(utteranceRef.current)
			setIsSpeaking(true)
			setIsPaused(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rate])

	const handlePlay = () => {
		if (!text || !utteranceRef.current) return
		// If paused, resume; else start speaking from scratch
		if (isPaused) {
			window.speechSynthesis.resume()
			setIsPaused(false)
			setIsSpeaking(true)
			return
		}
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(utteranceRef.current)
		setIsSpeaking(true)
	}

	const handlePause = () => {
		if (!isSpeaking) return
		window.speechSynthesis.pause()
		setIsPaused(true)
		setIsSpeaking(false)
	}

	const handleStop = () => {
		window.speechSynthesis.cancel()
		setIsSpeaking(false)
		setIsPaused(false)
	}

	if (variant === 'default') {
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
				<button
					onClick={() => (isSpeaking ? handlePause() : handlePlay())}
					className="tts-simple"
					title={isSpeaking ? 'Duraklat' : 'Oynat'}
					aria-label={isSpeaking ? 'Duraklat' : 'Oynat'}
				>
					{isSpeaking ? '⏸' : '▶'}
				</button>
				<div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
					<span style={{ fontSize: '12px', color: '#666' }}>Hız:</span>
					<input 
						type="range" 
						min="0.7" 
						max="2.5" 
						step="0.1" 
						value={rate} 
						onChange={(e) => setRate(parseFloat(e.target.value))}
						style={{ width: '60px', height: '20px' }}
					/>
					<span style={{ fontSize: '12px', color: '#666', minWidth: '25px' }}>{rate.toFixed(1)}x</span>
				</div>
			</div>
		)
	}

	if (variant === 'sidebar' || variant === 'button') {
		return (
			<button
				onClick={() => (isSpeaking ? handlePause() : handlePlay())}
				className="tts-simple"
				title={isSpeaking ? 'Duraklat' : 'Oynat'}
				aria-label={isSpeaking ? 'Duraklat' : 'Oynat'}
			>
				{isSpeaking ? '⏸' : '▶'}
			</button>
		)
	}

	if (variant === 'meta') {
		return (
			<button
				onClick={() => (isSpeaking ? handlePause() : handlePlay())}
				className="tts-simple"
				title={isSpeaking ? 'Duraklat' : 'Oynat'}
				aria-label={isSpeaking ? 'Duraklat' : 'Oynat'}
			>
				{isSpeaking ? '⏸' : '▶'}
			</button>
		)
	}

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
			<label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
				<span>Hız</span>
				<input type="range" min="0.7" max="2.5" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
				<span>{rate.toFixed(1)}</span>
			</label>
			<button onClick={handlePlay}>{isPaused ? 'Sürdür' : 'Oynat'}</button>
			<button onClick={handlePause} disabled={!isSpeaking}>Duraklat</button>
			<button onClick={handleStop}>Durdur</button>
		</div>
	)
}


