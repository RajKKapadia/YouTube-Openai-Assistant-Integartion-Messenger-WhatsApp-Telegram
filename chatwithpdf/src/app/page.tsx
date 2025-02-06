// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      title: 'PDF Chat Intelligence',
      description: 'Engage in natural conversations with your PDF documents using advanced AI technology. Get instant answers and insights from your documents.',
      icon: '🤖',
    },
    {
      title: 'Multi-PDF Support',
      description: 'Upload and analyze multiple PDFs simultaneously for comprehensive information retrieval. Compare and cross-reference content easily.',
      icon: '📚',
    },
    {
      title: 'Social Integration',
      description: 'Share insights and connect through Facebook, WhatsApp, and Telegram. Collaborate with team members efficiently.',
      icon: '🔗',
    },
    {
      title: 'Smart Search',
      description: 'Quickly find specific information across all your uploaded documents with our intelligent search functionality.',
      icon: '🔍',
    },
  ];

  const benefits = [
    {
      title: 'Save Time',
      description: 'Reduce document review time by up to 75% with AI-powered analysis',
      icon: '⚡',
    },
    {
      title: 'Increase Accuracy',
      description: 'Get precise answers and reduce human error in document analysis',
      icon: '✅',
    },
    {
      title: 'Easy Sharing',
      description: 'Share insights instantly with built-in social media integration',
      icon: '🔄',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Chat with Your PDF Documents Using AI
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Transform the way you interact with documents. Get instant answers, insights, and analysis from your PDFs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/rag" 
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Try Now Free
                </Link>
                <Link 
                  href="#features" 
                  className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm">
                  {/* Replace with your hero image */}
                  <div className="p-6">
                    <div className="bg-white/80 rounded-lg p-4 mb-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full bg-white/60 rounded"></div>
                      <div className="h-3 w-5/6 bg-white/60 rounded"></div>
                      <div className="h-3 w-4/6 bg-white/60 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Document Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes it easy to understand and extract information from your PDF documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ChatwithPDF?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the benefits of AI-powered document analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the power of AI-driven document analysis.
            </p>
            <Link 
              href="/rag"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Try ChatwithPDF Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ChatwithPDF has revolutionized the way we handle document analysis. It's incredibly fast and accurate.",
                author: "Sarah Johnson",
                role: "Research Analyst"
              },
              {
                quote: "The ability to chat with multiple PDFs simultaneously has saved our team countless hours of work.",
                author: "Michael Chen",
                role: "Project Manager"
              },
              {
                quote: "The social sharing features make it easy to collaborate with my team on document insights.",
                author: "Emily Brown",
                role: "Content Strategist"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}