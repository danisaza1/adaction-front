import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Header  from "./components/header";
import  Footer  from "./components/footer";
import { AuthProvider } from './context/authContext';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Adaction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthProvider>
          <Header />
        {children}
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
