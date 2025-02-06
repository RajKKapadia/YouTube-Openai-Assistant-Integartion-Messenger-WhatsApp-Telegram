'use client';
// src/app/rag/page.tsx
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function RAGPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    assistant: ''
  });
  const [isGeneratingIndex, setIsGeneratingIndex] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<[string, string]>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  const handleApiSubmit = async () => {
    if (!apiKeys.openai || !apiKeys.assistant) {
      alert('Please enter both API keys');
      return;
    }

    setIsGeneratingIndex(true);
    try {
      // Store API keys in localStorage
      localStorage.setItem('openai_api_key', apiKeys.openai);
      localStorage.setItem('assistant_id', apiKeys.assistant);

      // Here you would typically make an API call to your backend to process files
      // For this example, we'll simulate the indexing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Index generated successfully! You can now start asking questions about your documents.'
      }]);
      setShowApiInput(false);
    } catch (error) {
      console.error('Error generating index:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error generating index. Please try again.'
      }]);
    } finally {
      setIsGeneratingIndex(false);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please upload at least one PDF file');
      return;
    }

    setIsUploading(true);
    try {
      // Here you would typically upload the files to your server
      // For this example, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowApiInput(true);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Files uploaded successfully! Please enter your API keys to continue.'
      }]);
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error uploading files. Please try again.'
      }]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      const openaiKey = localStorage.getItem('openai_api_key');
      const assistantId = localStorage.getItem('assistant_id');

      if (!openaiKey || !assistantId) {
        throw new Error('API keys not found');
      }

      // Make API call to your backend
      const response = await axios.post('/api/chat', {
        question: userMessage,
        chatHistory,
        openaiKey,
        assistantId
      });

      const assistantMessage = response.data.answer;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      setChatHistory(prev => [...prev, [userMessage, assistantMessage]]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upload PDFs</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            >
              <input {...getInputProps()} />
              <p>Drag & drop PDFs here, or click to select files</p>
            </div>

            {/* File List */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Uploaded Files:</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">📄</span>
                    <span className="text-sm truncate">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upload Button */}
            {files.length > 0 && !showApiInput && (
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </button>
            )}

            {/* API Key Input */}
            {showApiInput && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
                  <input
                    type="password"
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assistant ID</label>
                  <input
                    type="password"
                    value={apiKeys.assistant}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, assistant: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleApiSubmit}
                  disabled={isGeneratingIndex}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {isGeneratingIndex ? 'Generating Index...' : 'Generate Index'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about your PDFs..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!localStorage.getItem('openai_api_key')}
                />
                <button
                  type="submit"
                  disabled={!localStorage.getItem('openai_api_key') || isProcessing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}