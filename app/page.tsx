import WeatherWidget from "@/components/weather/widget";
import stl from './globals.module.sass'

export default async function Home() {

  return (
    <main className={stl.layout}>
      <WeatherWidget />
    </main>
  );
}
