import'@/styles/globals.css';

export const metadata = {
  title: 'Memorama'
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
