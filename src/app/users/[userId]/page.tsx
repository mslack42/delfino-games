import { getUser } from "@/database/users/getUser";
import { redirect } from "next/navigation";
import { UserEditForm } from "./UserEditForm";

type Props = {
  params: {
    userId: string;
  };
};

export default async function EditUser(props: Props) {
  const userId = props.params.userId;
  if (!userId) {
    redirect("/");
  }

  const user = await getUser(props.params.userId);

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <UserEditForm user={user} />
    </div>
  );
}
