'use client'

import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function PollGenerator({ articleText }) {
  const [poll, setPoll] = useState(null)
  const [loading, setLoading] = useState(false)
  const [votes, setVotes] = useState({})
  const [totalVotes, setTotalVotes] = useState(0)

  // API key'i environment variable'dan al
  const API_KEY = 'AIzaSyD4SVyASntIbi1oe_vabtdPL0nsOHEfx_o'

  const buildLocalPoll = (text) => {
    const trimmed = (text || '').trim()
    const firstSentence = trimmed.split(/[.!?]\s/)[0]?.slice(0, 120) || 'Bu haber'
    
    // Farklı soru tipleri
    const questionTypes = [
      `${firstSentence} konusunda hangi tarafı desteklersiniz?`,
      `${firstSentence} için en iyi çözüm nedir?`,
      `${firstSentence} durumunda ne yapardınız?`,
      `${firstSentence} haberini kim okumalı?`,
      `${firstSentence} gelişmesinin sonucu ne olur?`
    ]
    
    const question = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    
    // Yaratıcı seçenekler
    const optionSets = [
      [
        { id: 1, text: 'Aktif destek veririm' },
        { id: 2, text: 'Sessizce takip ederim' },
        { id: 3, text: 'Karşı çıkarım' },
        { id: 4, text: 'Bekleyip görürüm' }
      ],
      [
        { id: 1, text: 'Hemen harekete geçerim' },
        { id: 2, text: 'Plan yaparım' },
        { id: 3, text: 'Uzman görüşü alırım' },
        { id: 4, text: 'Durumu analiz ederim' }
      ],
      [
        { id: 1, text: 'Politikacılar' },
        { id: 2, text: 'Sivil toplum' },
        { id: 3, text: 'Uzmanlar' },
        { id: 4, text: 'Halk' }
      ]
    ]
    
    const options = optionSets[Math.floor(Math.random() * optionSets.length)]
    
    return { question, options }
  }

  const safeSetPoll = (pollData) => {
    setPoll(pollData)
    const initialVotes = {}
    pollData.options.forEach(option => {
      initialVotes[option.id] = Math.floor(Math.random() * 50) + 10
    })
    setVotes(initialVotes)
    setTotalVotes(Object.values(initialVotes).reduce((a, b) => a + b, 0))
  }

  const generatePoll = async () => {
    if (!articleText || articleText.trim().length < 10) {
      // Metin yetersizse yerel anket
      safeSetPoll(buildLocalPoll(articleText))
      return
    }

    setLoading(true)
    try {
      if (!API_KEY) {
        console.log('API key eksik, yerel anket kullanılıyor')
        safeSetPoll(buildLocalPoll(articleText))
        return
      }

      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const prompt = `Bu haber metni için yaratıcı ve ilginç bir anket sorusu üret. Klasik "ne düşünüyorsunuz" sorusu olmasın. Farklı soru tipleri kullan:
- "Bu haberi kim okumalı?"
- "Bu durumda ne yapardınız?"
- "Bu haberin sonucu ne olur?"
- "Bu konuda hangi tarafı desteklersiniz?"
- "Bu gelişme için en iyi çözüm nedir?"

Seçenekler de yaratıcı olsun, sadece "evet/hayır" olmasın. JSON formatında dön:

{
  "question": "Yaratıcı soru burada...",
  "options": [
    {"id": 1, "text": "İlginç seçenek 1"},
    {"id": 2, "text": "İlginç seçenek 2"},
    {"id": 3, "text": "İlginç seçenek 3"},
    {"id": 4, "text": "İlginç seçenek 4"}
  ]
}

Haber metni:
"""
${articleText}
"""`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Markdown code fence temizle
      let cleanText = text
      if (/```/g.test(cleanText)) {
        cleanText = cleanText.replace(/```json\n?|```/g, '')
      }

      let pollData
      try {
        pollData = JSON.parse(cleanText)
      } catch (e) {
        console.log('AI çıktısı parse edilemedi, yerel anket kullanılıyor')
        pollData = buildLocalPoll(articleText)
      }

      // Şema kontrolü
      if (!pollData?.question || !Array.isArray(pollData?.options)) {
        console.log('AI çıktısı geçersiz şema, yerel anket kullanılıyor')
        pollData = buildLocalPoll(articleText)
      }

      safeSetPoll(pollData)
    } catch (error) {
      console.error('Anket oluşturma hatası:', error)
      // Her durumda habere özel yerel anket
      safeSetPoll(buildLocalPoll(articleText))
    } finally {
      setLoading(false)
    }
  }

  const handleVote = (optionId) => {
    setVotes(prev => {
      const newVotes = { ...prev, [optionId]: (prev[optionId] || 0) + 1 }
      setTotalVotes(Object.values(newVotes).reduce((a, b) => a + b, 0))
      return newVotes
    })
  }

  const getPercentage = (optionId) => {
    if (totalVotes === 0) return 0
    return Math.round((votes[optionId] / totalVotes) * 100)
  }

  useEffect(() => {
    generatePoll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleText])

  if (loading && !poll) {
    return (
      <div className="poll-container">
        <div className="poll-loading">Anket oluşturuluyor...</div>
      </div>
    )
  }

  if (!poll) return null

  return (
    <div className="poll-container">
      <h3 className="poll-title">📊 Haber Anketi</h3>
      <p className="poll-question">{poll.question}</p>
      <div className="poll-options">
        {poll.options.map(option => (
          <div key={option.id} className="poll-option">
            <button
              className="poll-button"
              onClick={() => handleVote(option.id)}
            >
              <span className="poll-text">{option.text}</span>
              <div className="poll-bar">
                <div
                  className="poll-fill"
                  style={{ width: `${getPercentage(option.id)}%` }}
                ></div>
              </div>
              <span className="poll-percentage">{getPercentage(option.id)}%</span>
            </button>
          </div>
        ))}
      </div>
      <div className="poll-footer">Toplam {totalVotes} oy</div>
    </div>
  )
}
