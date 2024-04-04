import Background from '@/components/background/Background';
import '@/styles/globals.css';


export const metadata = {
  title: 'Memorama Udg'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Background />
        {children}
      </body>
    </html>
  )
}
