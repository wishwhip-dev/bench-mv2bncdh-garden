import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Attribution } from "@/components/attribution";
import "./globals.css";
import { identity } from "./identity";
import { Providers } from "./providers";

// The deployed address, so link previews get an absolute URL for the share image. Vercel sets it
// at build time; elsewhere Next falls back to localhost, which is fine for local work.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// The blog's name, description and colour come from app/identity.ts. Change them there, not here.
export const metadata: Metadata = {
  metadataBase: productionHost ? new URL(`https://${productionHost}`) : undefined,
  title: { default: identity.name, template: `%s · ${identity.name}` },
  description: identity.description,
  applicationName: identity.name,
  openGraph: { title: identity.name, description: identity.description, siteName: identity.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: identity.accent,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-10">
            <header className="flex items-center justify-between gap-4 border-b border-border pb-5">
              <Link href="/" className="inline-flex min-h-11 items-center text-lg font-semibold tracking-tight no-underline">
                {identity.name}
              </Link>
              <span className="text-sm text-muted-foreground">Notes and essays</span>
            </header>
            <main className="flex-1">{children}</main>
            <div className="border-t border-border pt-3">
              <Attribution />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
