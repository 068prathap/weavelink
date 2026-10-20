import { Hind_Madurai } from 'next/font/google';
import Header from '@/components/Header/Header';
import './globals.scss';

const hindMadurai = Hind_Madurai({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'tamil'],
  variable: '--font-main',
});

export const metadata = {
  title: {
    default: 'WeaveLink',
    template: '%s | WeaveLink',
  },
  description: 'Connect with cloth manufacturers and dealers. Post products, post requirements and get quotes.',
};

export const viewport = {
  themeColor: '#1f3a5f',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={hindMadurai.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
