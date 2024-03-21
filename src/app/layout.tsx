import type { Metadata } from "next"
import "./globals.css"
import { Suspense } from "react"
import NavLinks from "@/components/NavLinks"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "AI Comparison",
  description: "AI comparison created using nextJs",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="content">
          <Suspense>
            <NavLinks />
          </Suspense>

          <div className={`container`}>{children}</div>
        </div>
      </body>
    </html>
  )
}
