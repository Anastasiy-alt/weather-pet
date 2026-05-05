import type {Metadata} from "next";
import {Golos_Text} from 'next/font/google'
import '@/styles/_base.sass'
import HeaderApp from "@/components/header";
import stl from './globals.module.sass'
import WeatherInit from "@/components/weather/init";

const golos = Golos_Text({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-golos',
})

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
        <html lang="ru" className={golos.variable}>
        <body className={golos.className}>
        <WeatherInit/>
        <HeaderApp/>
        <main className={stl.layout}>{children}</main>
        </body>
        </html>
    );
}
