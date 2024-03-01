"use client";
import { KeyValue } from "@/components/common/KeyValue";
import { CustomButton } from "@/components/input/CustomButton";
import { ApiRoutes, ApplicationRoutes } from "@/constants/routes";
import { EditUserInput, editUserSchema } from "@/lib/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, User, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditProps = {
  user: User & { accounts: Account[] };
};

export function UserEditForm({ user }: EditProps) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
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

      if(!res.ok) {
        // TODO some error handling
        return
      }

      router.push(ApplicationRoutes.Users);
      router.refresh();
    } catch (error: any) {
      //   toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl">Edit User</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} id="editUser">
        <div className="p-2 flex flex-col">
          <KeyValue
            dataKey={"Name"}
            dataValue={
              <>
                <input {...register("name")} placeholder={user.name} />
                {errors["name"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["name"]?.message as string}
                  </span>
                )}
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
          <KeyValue
            dataKey={"Email"}
            dataValue={
              <>
                <input {...register("email")} placeholder={user.email ?? ""} />
                {errors["email"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["email"]?.message as string}
                  </span>
                )}
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
                {errors["role"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["email"]?.message as string}
                  </span>
                )}
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
