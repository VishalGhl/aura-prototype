import './globals.css'
import FeedbackButton from '@/components/FeedbackButton'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FeedbackButton />
        {children}
      </body>
    </html>
  )
}