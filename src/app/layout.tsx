import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import {AuthContext, AuthContextProvider} from "@context/AuthContext";


export const metadata: Metadata = {
    title: "Space Traders",
    description: "Space Traders GUI",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
          <body>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
          </body>
        </html>
    );
}
