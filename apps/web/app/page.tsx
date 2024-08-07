import { Appbar } from "./_components/Appbar";
import { Hero } from "./_components/Hero";


export default function Home() {
  return (
    <main className="pb-48">
        <Appbar />
        <Hero />
        <div className="pt-8">
          video here
        </div>
    </main>
  );
}