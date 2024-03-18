"use client";
import { KeyValue } from "@/components/common/KeyValue";
import { CustomButton } from "@/components/input/CustomButton";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { EditUserInput, editUserSchema } from "@/lib/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserType } from "./UserTable";
import { Conditional } from "@/components/common/Conditional";
import { useToast } from "@/components/shadcn/use-toast";

type EditProps = {
  user: UserType;
  onSubmitComplete?: () => void;
};

export function UserEditForm({ user, onSubmitComplete }: EditProps) {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const methods = useForm<EditUserInput>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      id: user.id,
      email: user.email ?? undefined,
      role: user.accounts[0].role ?? undefined,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<EditUserInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch(ApiRoutes.EditUser, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 500) {
          toast({
            title: "Failed to edit user - internal failure",
            type: "background",
            variant: "destructive",
          });
        }
        if (res.status === 400) {
          toast({
            title: "Failed to edit user - validation failed",
            type: "background",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "User edited successfully",
      });
      onSubmitComplete && onSubmitComplete();
    } catch (error: any) {
      toast({
        title: "Failed to edit user",
        type: "background",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmitHandler)} id="editUser">
        <div className="p-2 flex flex-col">
          <KeyValue
            dataKey={"Name"}
            dataValue={
              <>
                <input {...register("name")} placeholder={user.name} />
                <Conditional when={!!errors["name"]}>
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["name"]?.message as string}
                  </span>
                </Conditional>
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
          <KeyValue
            dataKey={"Email"}
            dataValue={
              <>
                <input {...register("email")} placeholder={user.email ?? ""} />
                <Conditional when={!!errors["email"]}>
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["email"]?.message as string}
                  </span>
                </Conditional>
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
          <KeyValue
            dataKey={"Role"}
            dataValue={
              <>
                <select {...register("role")}>
                  {Object.values(UserRole).map((r) => {
                    return (
                      <option value={r} key={r}>
                        {r}
                      </option>
                    );
                  })}
                </select>
                <Conditional when={!!errors["role"]}>
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["email"]?.message as string}
                  </span>
                </Conditional>
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
        </div>
        <input {...register("id")} type="hidden"></input>
      </form>
      <div className="flex flex-row justify-end w-full px-4">
        <CustomButton
          type="submit"
          innerText={submitting ? "loading..." : "Save"}
          actionType="confirm"
          className="p-2 rounded-lg"
          disabled={submitting}
          form="editUser"
        />
      </div>
    </div>
  );
}
