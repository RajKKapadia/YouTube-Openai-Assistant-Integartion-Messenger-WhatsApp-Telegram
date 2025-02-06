'use client';
// src/app/integrations/page.tsx
import { useState } from 'react';

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('facebook');
  const [integrationStatus, setIntegrationStatus] = useState({
    facebook: false,
    whatsapp: false,
    telegram: false
  });

  const integrations = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👥',
      description: 'Share PDF insights directly to your Facebook timeline or groups.',
      buttonText: 'Connect Facebook',
      color: 'bg-blue-600',
      setupSteps: [
        'Go to Facebook Developer Console',
        'Create a new application',
        'Configure OAuth settings',
        'Add domain to allowed origins'
      ]
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      description: 'Send PDF summaries and insights via WhatsApp messages.',
      buttonText: 'Connect WhatsApp',
      color: 'bg-green-500',
      setupSteps: [
        'Register for WhatsApp Business API',
        'Set up webhook endpoints',
        'Configure message templates',
        'Test connection'
      ]
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '📱',
      description: 'Share PDF content through Telegram channels or direct messages.',
      buttonText: 'Connect Telegram',
      color: 'bg-blue-400',
      setupSteps: [
        'Create a Telegram Bot via BotFather',
        'Get API credentials',
        'Set up webhook',
        'Configure bot commands'
      ]
    }
  ];

  const handleConnect = (platform: string) => {
    // Mock integration function - in real app, this would handle OAuth or API integration
    setIntegrationStatus(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const getIntegrationContent = (platform: string) => {
    const integration = integrations.find(i => i.id === platform);
    if (!integration) return null;

    return (
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{integration.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{integration.name}</h2>
                <p className="text-gray-600">{integration.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect(integration.id)}
              className={`px-6 py-2 text-white rounded-lg transition-all
                ${integrationStatus[integration.id as keyof typeof integrationStatus]
                  ? 'bg-gray-500 hover:bg-gray-600'
                  : `${integration.color} hover:opacity-90`
                }`}
            >
              {integrationStatus[integration.id as keyof typeof integrationStatus]
                ? 'Disconnect'
                : integration.buttonText}
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Setup Instructions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Integration Steps:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  {integration.setupSteps.map((step, index) => (
                    <li key={index} className="text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Share PDF summaries
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Direct messaging integration
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Automated notifications
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {integrationStatus[integration.id as keyof typeof integrationStatus] && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700">Successfully connected to {integration.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Social Media Integrations</h1>
        <p className="mt-2 text-gray-600">Connect your account with various social media platforms to share PDF insights.</p>
      </div>

      {/* Integration Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {integrations.map((integration) => (
            <button
              key={integration.id}
              onClick={() => setActiveTab(integration.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === integration.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <span className="flex items-center space-x-2">
                <span>{integration.icon}</span>
                <span>{integration.name}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Integration Content */}
      {getIntegrationContent(activeTab)}
    </div>
  );
}