'use client'
import { useState } from 'react'

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  const submitFeedback = async () => {
    // Simple feedback collection
    console.log('User feedback:', feedback)
    alert('Thanks for your feedback! We\'re constantly improving AURA. 🚀')
    setFeedback('')
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 glass border border-aura-purple/20 px-4 py-2 rounded-xl text-aura-purple hover:border-aura-purple/40 transition-all"
      >
        💡 Feedback
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass border border-aura-azure/20 p-6 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-aura-azure mb-4">Share Your Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What do you love? What can be improved? What features would you like to see?"
              className="w-full h-32 bg-aura-black border border-aura-azure/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-aura-azure/40 focus:outline-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={submitFeedback}
                className="bg-aura-azure text-aura-black px-4 py-2 rounded-lg font-semibold hover:bg-aura-azure/90 transition-all flex-1"
              >
                Send Feedback
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-aura-azure text-aura-azure px-4 py-2 rounded-lg font-semibold hover:bg-aura-azure/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}