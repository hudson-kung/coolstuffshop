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
    description: "A tiny shop for useful, unusual, and delightfully unnecessary things.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "COOLSTUFF — Objects worth talking about",
      description: "Useful, unusual, and delightfully unnecessary things.",
      type: "website",
      images: [{ url: imageUrl, width: 1536, height: 1024, alt: "COOLSTUFF — Objects worth talking about" }],
    },
    twitter: { card: "summary_large_image", images: [imageUrl] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
