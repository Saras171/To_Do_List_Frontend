// Import custom fonts from Google using Next.js font optimization
import { Geist, Geist_Mono, Merriweather, Kaushan_Script } from "next/font/google";

// Global CSS styles
import "./globals.css";

// Toast notification provider
import { Toaster } from "react-hot-toast";

// Reusable Footer component
import Footer from "../components/Footer";

// Load Geist Sans font (for general UI text)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


// Load Geist Mono font (for monospace UI elements, code blocks, etc.)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// Load Merriweather font (for elegant body content and readable text)
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
});


// Load Kaushan Script font (used for logo/title "Schedo")
const kaushan = Kaushan_Script({
  subsets: ["latin"],
  variable: "--font-kaushan",
  weight: "400",
});


// Global site metadata (used by search engines & social media)
export const metadata = {
  title: "To-Do App",
  description: "Manage your tasks smartly",
};

/**
 * RootLayout component
 * - Wraps all pages of the app
 * - Injects global fonts, background gradient, Toaster, and Footer
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${geistSans.variable} ${geistMono.variable} ${kaushan.variable} bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen`}>
       
             {/* Main content (pages will render here) */}
 <main className="flex-grow">{children}</main>

  {/* Toast notification provider (top-right corner) */}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

        
        {/* Global footer (appears on all pages) */}
        <Footer />
      </body>
    </html>
  );
}
