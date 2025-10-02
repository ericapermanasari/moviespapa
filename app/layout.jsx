import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper';

export const metadata = {
  title: 'Moviespapa | Watch Movie Stream Movies and Tv Series Free ',
  description: 'Moviespapa is your one-stop destination for free movies, TV shows, and web series. Download thousands of titles in HD quality, with unlimited access to the latest blockbusters and trending series. Start your free entertainment journey today! ',
  openGraph: {
    title: 'Moviespapa | Watch Movie Stream Movies and Tv Series Free',
    description: 'Moviespapa is your one-stop destination for free movies, TV shows, and web series. Download thousands of titles in HD quality, with unlimited access to the latest blockbusters and trending series. Start your free entertainment journey today! ',
    url: 'https://Moviespapa-hd.netlify.app',
    siteName: 'Moviespapa',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54812286746_f853554453_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Moviespapa - Watch Movie Stream Movies and Tv Series Free',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123',
    creator: '@WatchStream123',
    title: 'Moviespapa | Watch Movie Stream Movies and Tv Series Free',
    description: 'Moviespapa is your one-stop destination for free movies, TV shows, and web series. Download thousands of titles in HD quality, with unlimited access to the latest blockbusters and trending series. Start your free entertainment journey today!',
    images: ['https://live.staticflickr.com/65535/54812286746_f853554453_b.jpg'],
  },
  // Tambahkan tag meta eksplisit untuk Facebook
  other: {
    'fb:app_id': '100074345305108',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	  <head>
        {/* Tag verifikasi Google Search Console */}
        <meta name="google-site-verification" content="FWK5nF-wfsTW4wp7aMKmhrwqkf-xYOPcPtbbQ47X7PU" />
      </head>
      <body>
        <AdsterraLayoutWrapper>
          <div className="flex flex-col min-h-screen bg-slate-900">
            <header className="w-full max-w-7xl mx-auto px-4 py-4 sticky top-0 z-50 bg-slate-900 shadow-lg">
              <Navbar />
            </header>
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 mt-2">
              {children}
            </main>
            <footer className="w-full max-w-7xl mx-auto px-4 py-8">
              {/* Tempatkan div Native Banner di sini, sebelum Footer */}
              <div id="container-94239f574c56d0c3eb0e8dcb1de02d4f"></div>
              <Footer />
            </footer>
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}