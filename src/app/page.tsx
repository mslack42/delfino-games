import { RoleCheck } from "@/components/auth/RoleCheck";

export default async function Home() {
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
        <RoleCheck
          type="oneOf"
          roles={["Verified"]}
          content={
            <>
              <div>
                <p>Your account is not verified.</p>
                <p>
                  This means that you only have limited functionality available
                  to you.
                </p>
                <p>
                  Contact anyone with an Admin account in order to get your
                  account verified.
                </p>
              </div>
            </>
          }
        />
      </div>
    </>
  );
}
