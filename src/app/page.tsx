import { UnverifiedUserMessage } from "../components/UnverifiedUserMessage";
import { SplashButtons } from "../components/navigation/SplashButtons";

export default async function Home() {
  return (
    <>
      <div className="h-full flex flex-row flex-wrap">
        <div className="flex-col text-center pt-10 px-5 text-wrap w-full">
          <h1 className="text-4xl font-sans">Welcome to Delfino Games</h1>
          <br></br>
          <br></br>
          <UnverifiedUserMessage />
          <p className="text-2xl font-sans text-center">
            This inventory websites spans the collection of multiple offices,
            multiple workers in those offices, as well as the company itself.
          </p>
          <br></br>
          <p className="text-2xl font-sans text-center">
            You can use this website to help find a game to play, or request a
            game to be available to play on a Monday night.
          </p>
        </div>
        <SplashButtons />
      </div>
    </>
  );
}
