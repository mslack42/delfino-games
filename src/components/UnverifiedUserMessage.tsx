import { RoleCheck } from "@/components/auth/RoleCheck";

export async function UnverifiedUserMessage() {
  return (
    <RoleCheck
      type="oneOf"
      roles={["Verified"]}
      content={
        <>
          <div>
            <p>Your account is not verified.</p>
            <p>
              This means that you only have limited functionality available to
              you.
            </p>
            <p>
              Contact anyone with an Admin account in order to get your account
              verified.
            </p>
          </div>
        </>
      }
    />
  );
}
