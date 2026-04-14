import type { Metadata } from "next";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME || '';
const city = process.env.NEXT_PUBLIC_LAUNCH_CITY!;

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
	title: `${appName} - Know where tonight is worth going`,
	description: `The live nightlife map that shows what's actually happening inside venues right now. Join the waitlist — launching in ${city} first.`,
	openGraph: {
		title: `${appName} — Know where tonight is worth going`,
		description: `Join the waitlist. Be first when we launch in your city.`,
		images: ["/og-image.jpg"],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `${appName} — Know where tonight is worth going`,
		description: `Join the waitlist. Be first when we launch in your city.`,
	},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
