import styles from "./page.module.css";
import Button from "@/components/ui/button";
import WeatherWidget from "@/components/weather/widget";


export default async function Home() {

  return (
    <main className={styles.page}>
      <Button text='Update' variant='btn'/>
      <WeatherWidget />
    </main>
  );
}
