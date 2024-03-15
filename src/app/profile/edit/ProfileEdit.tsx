"use client";
import { KeyValue } from "@/components/common/KeyValue";
import { CustomButton } from "@/components/input/CustomButton";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { EditProfileInput, editProfileSchema } from "@/lib/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Conditional } from "@/components/common/Conditional";

type EditProps = {
  user: User & { accounts: Account[] };
};
export function ProfileEdit({ user }: EditProps) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { update: updateSession, data: sessionData } = useSession();

  const methods = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name,
      id: user.id,
      email: user.email ?? undefined,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<EditProfileInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch(ApiRoutes.EditProfile, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        // TODO some error handling
        return;
      }

      await updateSession({
        ...sessionData,
        user: { ...sessionData?.user, name: values.name, email: values.email },
      });
      router.push(ApplicationRoutes.Profile);
      router.refresh();
    } catch (error: any) {
      //   toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} id="editProfile">
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
          form="editProfile"
        />
      </div>
    </div>
  );
}
