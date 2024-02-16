import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to Delfino Games</h1>
      <Link href={"/AddGames"}>Add new game</Link>
    </main>
  );
}
