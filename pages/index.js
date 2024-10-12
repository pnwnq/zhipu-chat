import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const assistantResponse = await getZhipuResponse(newMessages)
      setMessages([...newMessages, { role: 'assistant', content: assistantResponse }])
    } catch (error) {
      console.error('Error getting Zhipu response:', error)
      setMessages([...newMessages, { role: 'assistant', content: '抱歉，我遇到了一些问题。请稍后再试。' }])
    } finally {
      setIsLoading(false)
    }
  }

  const getZhipuResponse = async (messages) => {
    const response = await fetch('/api/zhipu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    return data.content;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>智谱对话</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">智谱对话</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={isLoading}
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
        </form>
      </main>
    </div>
  )
}
