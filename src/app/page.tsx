import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  const user = session?.user

  return (
    <>
      <div className="h-full flex-col text-center">
        <h1 className="text-4xl font-sans">Welcome to Delfino Games</h1>
        <br></br>
        <br></br>
        <p className="text-2xl font-sans text-center">
          This inventory websites spans the collection of multiple offices,
          multiple workers in those offices, as well as the company itself.
        </p>
        <br></br>
        <p className="text-2xl font-sans text-center">
          You can use this website to help find a game to play, or request a
          game to be available to play on a Monday night.
        </p>
        {user && (
          <div>Currently logged in as {user.name} ({user.email})</div>
        )}
      </div>
    </>
  );
}
