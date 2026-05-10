import type {Metadata} from "next";
import {Golos_Text} from 'next/font/google'
import '@/styles/_base.sass'
import HeaderApp from "@/components/header";
import stl from './globals.module.sass'
import WeatherInit from "@/components/weather/init";
import Script from 'next/script';
import FooterApp from "@/components/footer";
import {ThemeProvider} from "@teispace/next-themes";

const golos = Golos_Text({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-golos',
})
const host = process.env.NEXT_PUBLIC_API_KEY_MAPS;
export const metadata: Metadata = {
    title: "WeatherPet",
    description: "Weather pet-project",
    other: {
        'yandex-tableau-widget': 'logo=/web-app-manifest-192x192.png, color=#fefdf8, title=WeatherPet',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={golos.variable} suppressHydrationWarning>
        <body className={golos.className}>
        <WeatherInit/>
        <ThemeProvider>
            <HeaderApp/>
            <main className={stl.layout}>
                {children}
            </main>
            <FooterApp/>
        </ThemeProvider>

        <Script src={`https://api-maps.yandex.ru/v3/?apikey=${host}&lang=ru_RU`} strategy="beforeInteractive"/>

        <Script
            id="sw"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js', {
                  scope: '/',
                  updateViaCache: 'none',
                })
              }
            `
            }}
        />

        </body>
        </html>
    );
}
