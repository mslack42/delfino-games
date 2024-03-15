import { RoleCheck } from "@/components/auth/serverside/RoleCheck";

export async function UnverifiedUserMessage() {
  return (
    <RoleCheck type="oneOf" roles={["Unverified"]}>
      <div className="bg-red-300 w-full p-10 my-2 rounded-xl flex justify-center text-center min-w-full flex-wrap md:flex-nowrap">
        <div className="flex-1 flex flex-row md:flex-col justify-center h-max w-full">
          <div className="rounded-full bg-red-800 h-28 w-28 text-8xl text-white">
            !
          </div>
        </div>
        <div className="text-lg flex-grow md:text-left pt-4 md:pt-0 pl-0 md:pl-4 w-full text-center">
          <p>
            Your account is not verified. This means that you only have limited
            functionality available to you.
          </p>
          <br />
          <p>
            Contact anyone with an Admin account in order to get your account
            verified.
          </p>
          <br />
          <p>{"Or, y'know, you could just wait."}</p>
        </div>
      </div>
    </RoleCheck>
  );
}
