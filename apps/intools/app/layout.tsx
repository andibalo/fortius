import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intools",
  description: "Internal Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
