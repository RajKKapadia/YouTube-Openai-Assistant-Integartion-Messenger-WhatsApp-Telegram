// src/components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    const footerSections = {
      product: {
        title: 'Product',
        links: [
          { name: 'Features', href: '#' },
          { name: 'Pricing', href: '#' },
          { name: 'Tutorial', href: '#' },
          { name: 'FAQs', href: '#' },
        ],
      },
      company: {
        title: 'Company',
        links: [
          { name: 'About Us', href: '#' },
          { name: 'Blog', href: '#' },
          { name: 'Careers', href: '#' },
          { name: 'Contact', href: '/contact' },
        ],
      },
      legal: {
        title: 'Legal',
        links: [
          { name: 'Privacy Policy', href: '#' },
          { name: 'Terms of Service', href: '#' },
          { name: 'Cookie Policy', href: '#' },
        ],
      },
      social: {
        title: 'Social',
        links: [
          { name: 'Twitter', href: '#' },
          { name: 'LinkedIn', href: '#' },
          { name: 'GitHub', href: '#' },
        ],
      },
    };
  
    return (
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Footer Sections */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          {/* Bottom Section */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📄</span>
                <span className="text-xl font-bold">ChatwithPDF</span>
              </div>
              <p className="mt-4 md:mt-0 text-gray-400 text-sm">
                © {currentYear} ChatwithPDF. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;