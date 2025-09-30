export const metadata = {
  title: 'Overstimulated Brain Tools',
  description: 'I build tools that help overstimulated brains think clearly. Starting with mine.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: white;
            color: black;
          }
          
          ::selection {
            background: black;
            color: white;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}