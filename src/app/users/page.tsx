import { listUsers } from "@/database/users/listUsers";
import { UserTable } from "./UserTable";
import { Referral } from "./Referral";

export default async function Users() {
  const users = await listUsers();

  return (
    <div className="text-center">
      <h1 className="text-2xl pt-4">Users</h1>
      <p>Below is a list of all site users.</p>
      <br />
      <UserTable users={users} />
      <Referral code={process.env.INVITATION_CODE!} />
    </div>
  );
}
