import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "COOLSTUFF — Objects worth talking about",
    description: "A playful shop for controllers, keyboards, headsets, handhelds, and gaming setup gear.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "COOLSTUFF — Objects worth talking about",
      description: "Controllers, keyboards, headsets, handhelds, and gaming setup gear.",
      type: "website",
      images: [{ url: imageUrl, width: 1536, height: 1024, alt: "COOLSTUFF — Objects worth talking about" }],
    },
    twitter: { card: "summary_large_image", images: [imageUrl] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
