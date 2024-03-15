"use client";
import { KeyValue } from "@/components/common/KeyValue";
import { CustomButton } from "@/components/input/CustomButton";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ApiRoutes } from "@/constants/ApiRoutes";
import {
  ChangePasswordInput,
  changePasswordSchema,
} from "@/lib/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function ChangePasswordForm() {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const methods = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = methods;

  const onSubmitHandler: SubmitHandler<ChangePasswordInput> = async (
    values
  ) => {
    try {
      setSubmitting(true);
      const res = await fetch(ApiRoutes.ChangePassword, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          //   errorData.errors.forEach((error: any) => {
          //     toast.error(error.message);
          //   });
          if (errorData.errors[0].currentPassword) {
            setError("currentPassword", errorData.errors[0].currentPassword);
          }

          return;
        }

        // toast.error(errorData.message);
        return;
      }

      router.push(ApplicationRoutes.Home);
    } catch (error: any) {
      //   toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-4xl">Change Password</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} id="changePassword">
        <div className="p-2 flex flex-col">
          <KeyValue
            dataKey={"Current"}
            dataValue={
              <>
                <input
                  {...register("currentPassword")}
                  type="password"
                  placeholder="Current Password"
                />
                {errors["currentPassword"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["currentPassword"]?.message as string}
                  </span>
                )}
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
          <KeyValue
            dataKey={"Password"}
            dataValue={
              <>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="New Password"
                />
                {errors["password"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["password"]?.message as string}
                  </span>
                )}
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
          <KeyValue
            dataKey={"Confirm Password"}
            dataValue={
              <>
                <input
                  {...register("passwordConfirm")}
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors["passwordConfirm"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["passwordConfirm"]?.message as string}
                  </span>
                )}
              </>
            }
            className="flex flex-row space-x-2 justify-between"
          />
        </div>
      </form>
      <div className="flex flex-row justify-end w-full px-4">
        <CustomButton
          type="submit"
          innerText={submitting ? "loading..." : "Save"}
          actionType="confirm"
          className="p-2 rounded-lg"
          disabled={submitting}
          form="changePassword"
        />
      </div>
    </div>
  );
}
