"use client";
import { CustomButton } from "@/components/input/CustomButton";
import { FormEvent } from "react";

export function BggSearchBox({
  search,
  heading,
}: {
  search: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  heading: string;
}) {
  return (
    <div className="py-4 text-center flex justify-center">
      <div className="flex flex-col justify-center h-full">
        <div className="py-6 w-96 rounded-lg bg-teal-200  border-solid border-4 border-teal-800">
          <div className="text-center text-teal-800 flex flex-col justify-between gap-4">
            <h1 className="text-2xl px-2">{heading}</h1>
            <form onSubmit={search} className="flex justify-around gap-0">
              <input
                type="text"
                name="searchTerm"
                maxLength={100}
                minLength={1}
                className="px-1"
              />
              <CustomButton
                type="submit"
                innerText="Go!"
                actionType="confirm"
                className="w-min py-1 px-3 rounded"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
