import { FitlogProvider } from "@/context/fitlogContext";
import NavBar from "@/components/Navber";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0c0c10] text-white">
        <FitlogProvider>
          <NavBar />
          <main>{children}</main>
        </FitlogProvider>
      </body>
    </html>
  );
}