import { getHolder } from "@/database/holders/getHolder";
import { EditHolderForm } from "./EditHolderForm";
import { redirect } from "next/navigation";

type Props = {
  params: {
    personId: string;
  };
};

export default async function EditHolder(props: Props) {
  const holder = await getHolder(props.params.personId);

  if (!holder) {
    redirect("/people");
  }

  return (
    <div className="w-full max-w-4xl pt-5">
      <div className="flex flex-wrap justify-center text-center">
        <div className="w-96  border-double border-teal-800 rounded-lg py-6 bg-teal-200">
          <EditHolderForm holder={holder}></EditHolderForm>
        </div>
      </div>
    </div>
  );
}
