export const metadata = {
  title: "Izwelakhe — Strategy, Construction & Property",
  description: "Multi-disciplinary South African company providing business consulting, construction services, and property development solutions.",
  keywords: "business consulting South Africa, construction services, property development, student accommodation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, background: "#090909" }}>{children}</body>
    </html>
  );
}
