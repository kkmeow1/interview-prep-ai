import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "InterviewAI - Master Your Interviews with AI",
  description: "Practice with intelligent AI interviewers, get real-time feedback, and improve your skills with personalized coaching. Ace your next interview with confidence.",
  keywords: ["interview practice", "AI interview", "interview preparation", "mock interview", "career coaching"],
  authors: [{ name: "InterviewAI Team" }],
  openGraph: {
    title: "InterviewAI - Master Your Interviews with AI",
    description: "Practice with intelligent AI interviewers, get real-time feedback, and improve your skills with personalized coaching.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewAI - Master Your Interviews with AI",
    description: "Practice with intelligent AI interviewers, get real-time feedback, and improve your skills with personalized coaching.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
