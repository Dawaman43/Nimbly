import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Swapped Montserrat for JetBrains Mono for a technical feel
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// JetBrains Mono gives that "Cloud/Dev" aesthetic you see in high-end SaaS
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nimbly | Cloud Deployment Infrastructure",
  description:
    "Modern cloud deployment platform for mission-critical applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main App Container */}
          <div className="relative flex min-h-screen flex-col">
            {/* Global Background Layer - The Grid Pattern you liked */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background">
              <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Page Content */}
            <main className="flex-1 flex flex-col relative">{children}</main>

            {/* Global Footer (Optional but recommended for layout balance) */}
            <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm py-6">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row max-w-screen-2xl">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built by{" "}
                  <span className="font-semibold text-foreground">
                    Nimbly Infrastructure
                  </span>
                  . The source code is available on{" "}
                  <a
                    href="#"
                    className="font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  .
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    All systems operational
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
