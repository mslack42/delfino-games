"use client";
import { CustomButton } from "@/components/input/CustomButton";
import { ApiRoutes, ApplicationRoutes } from "@/constants/routes";
import { EditHolderInput, editHolderSchema } from "@/lib/holder-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location, Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  holder: Person;
};

export function EditHolderForm({ holder }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const methods = useForm<EditHolderInput>({
    resolver: zodResolver(editHolderSchema),
    defaultValues: {
      id: holder.id,
      name: holder.name,
      office: holder.location,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<EditHolderInput> = async (values) => {
    try {
      setSubmitting(true);
      await fetch(ApiRoutes.EditPerson, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push(ApplicationRoutes.People);
    } catch (error: any) {
      //   toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="editHolder">
      <div>
        <label>
          <b>Name: </b>
        </label>
        <input {...register("name")} placeholder={holder.name} />
        {errors["name"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["name"]?.message as string}
          </span>
        )}
      </div>
      <div>
        <label>
          <b>Office: </b>
        </label>
        <select {...register("office")}>
          {Object.values(Location).map((l) => {
            return (
              <option value={l} key={l}>
                {l}
              </option>
            );
          })}
        </select>
        {errors["office"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["office"]?.message as string}
          </span>
        )}
      </div>
      <input {...register("id")} type="hidden"></input>
      <div className="flex flex-row justify-end w-full px-4">
        <CustomButton
          type="submit"
          innerText={submitting ? "loading..." : "Save"}
          actionType="confirm"
          className="p-2 rounded-lg"
          disabled={submitting}
          form="editHolder"
        />
      </div>
    </form>
  );
}
