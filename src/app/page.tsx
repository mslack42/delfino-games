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
            This website provides an inventory of all the games that
            <i> could</i> be a fixture on a Monday night.
          </p>
          <br></br>
          <p className="text-2xl font-sans text-center">
            You can use this website to help find a game to play, by filtering
            the collection based on criteria and play count (and of course,
            whether someone says they&apos;ve brought it along this week!).
          </p>
          <br></br>
          <p className="text-2xl font-sans text-center">
            You can also make game requests - a simple expression of &apos;I
            would like to play this game&apos;. If you request a game that
            isn&apos;t currently &quot;in rotation&quot;, the holder of that
            game will know to swap it in. And if you request a game that is
            already available, then that helps all of us pick what games we want
            to play!
          </p>
          <br></br>
        </div>
        <SplashButtons />
      </div>
    </>
  );
}
