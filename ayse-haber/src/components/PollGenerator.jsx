'use client'

import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function PollGenerator({ articleText }) {
  const [poll, setPoll] = useState(null)
  const [loading, setLoading] = useState(false)
  const [votes, setVotes] = useState({})
  const [totalVotes, setTotalVotes] = useState(0)

  // API key'i direkt burada tanımlıyoruz
  const API_KEY = 'AIzaSyDEOtA6iHFHdIyts91_gBRRsBjB2pDZAtE'

  const generatePoll = async () => {
    if (!articleText) return
    
    setLoading(true)
    try {
      console.log('API Key kullanılıyor:', API_KEY ? 'Mevcut' : 'Eksik')
      
      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const prompt = `
        Bu haber metni için kısa bir anket sorusu oluştur:
        
        "${articleText}"
        
        Lütfen şu formatta JSON döndür:
        {
          "question": "Anket sorusu",
          "options": [
            {"id": 1, "text": "Seçenek 1"},
            {"id": 2, "text": "Seçenek 2"},
            {"id": 3, "text": "Seçenek 3"},
            {"id": 4, "text": "Seçenek 4"}
          ]
        }
        
        Sadece JSON döndür, başka açıklama ekleme.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('API Response:', text)
      
      // Markdown wrapper'ı temizle
      let cleanText = text
      if (text.includes('```json')) {
        cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      }
      
      console.log('Temizlenmiş JSON:', cleanText)
      
      // JSON'u parse et
      const pollData = JSON.parse(cleanText)
      setPoll(pollData)
      
      // Başlangıç oylarını ayarla
      const initialVotes = {}
      pollData.options.forEach(option => {
        initialVotes[option.id] = Math.floor(Math.random() * 50) + 10
      })
      setVotes(initialVotes)
      setTotalVotes(Object.values(initialVotes).reduce((a, b) => a + b, 0))
      
    } catch (error) {
      console.error('Anket oluşturma hatası:', error)
      // Fallback anket
      setPoll({
        question: "Bu haber hakkında ne düşünüyorsunuz?",
        options: [
          { id: 1, text: "Çok önemli bir konu" },
          { id: 2, text: "Dikkat çekici" },
          { id: 3, text: "Orta düzeyde önemli" },
          { id: 4, text: "Daha fazla bilgi gerekli" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVote = (optionId) => {
    setVotes(prev => {
      const newVotes = { ...prev, [optionId]: prev[optionId] + 1 }
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
  }, [articleText])

  if (loading) {
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
      
      <div className="poll-footer">
        Toplam {totalVotes} oy
      </div>
    </div>
  )
}
