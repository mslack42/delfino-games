"use client";
import { Conditional } from "@/components/common/Conditional";
import { CustomButton } from "@/components/input/CustomButton";
import { useToast } from "@/components/shadcn/use-toast";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { EditHolderInput, editHolderSchema } from "@/lib/holder-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location, Person } from "@prisma/client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  holder: Person;
  onSubmitComplete?: () => void;
};

export function EditHolderForm({ holder, onSubmitComplete }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

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
      const res = await fetch(ApiRoutes.EditPerson, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 500) {
          toast({
            title: "Failed to edit holder - internal failure",
            type: "background",
            variant: "destructive",
          });
        }
        if (res.status === 400) {
          toast({
            title: "Failed to edit holder - validation failure",
            type: "background",
            variant: "destructive",
          });
        }
        return;
      }
      toast({
        title: "Holder edited successfully",
      });
      onSubmitComplete && onSubmitComplete();
    } catch (error: any) {
      toast({
        title: "Failed to edit holder",
        type: "background",
        variant: "destructive",
      });
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
        <Conditional when={!!errors["name"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["name"]?.message as string}
          </span>
        </Conditional>
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
        <Conditional when={!!errors["office"]}>
          <span className="text-red-500 text-xs pt-1 block">
            {errors["office"]?.message as string}
          </span>
        </Conditional>
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
