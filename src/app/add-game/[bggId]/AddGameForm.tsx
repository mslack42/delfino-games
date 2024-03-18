"use client";
import { CustomButton } from "@/components/input/CustomButton";
import { SelectOrNew } from "@/components/input/SelectOrNew";
import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { Ownership, Location } from "@prisma/client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddGameInput, addGameSchema } from "@/lib/game-schema";
import { BggSummaryData } from "@/bgg/types";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { useLocalStorageState } from "@/util/useLocalStorageState";
import { Conditional } from "@/components/common/Conditional";
import { useToast } from "@/components/shadcn/use-toast";

type AddGameFormProps = {
  holders: { id: number; name: string; location: Location }[];
  className?: string;
  bggData: BggSummaryData;
};
export function AddGameForm(props: AddGameFormProps) {
  const [currLocation, setCurrLocation] = useState<Location>("Poole");
  const [currOwnership, setCurrOwnership] = useState<Ownership>("Personal");
  const resetPeople = () => {
    resetField("ownerId", { defaultValue: "-2" });
    resetField("holderId", { defaultValue: "-2" });
  };
  const locationHolders = useMemo(
    () => props.holders.filter((h) => h.location === currLocation),
    [props.holders, currLocation]
  );
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [cachedFormInput, setCachedFormInput] = useLocalStorageState(
    "addgameform",
    {
      ownership: "Personal",
      ownerId: "-2",
      holderId: "-2",
    }
  );

  const methods = useForm<AddGameInput>({
    resolver: zodResolver(addGameSchema),
    defaultValues: cachedFormInput,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = methods;

  const onSubmitHandler: SubmitHandler<AddGameInput> = async (values) => {
    try {
      setSubmitting(true);
      setCachedFormInput(values);
      const res = await fetch(ApiRoutes.AddGame, {
        method: "POST",
        body: JSON.stringify({ formData: values, bggData: props.bggData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 500) {
          toast({
            title: "Failed to add game - internal failure",
            variant: "destructive",
            type: "background",
          });
        }
        if (res.status === 400) {
          toast({
            title: "Failed to add game - validation failure",
            variant: "destructive",
            type: "background",
          });
        }
        return;
      }

      toast({
        title: "Game added successfully",
      });
      router.push(ApplicationRoutes.Games);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Failed to add game",
        variant: "destructive",
        type: "background",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold pt-2">Enter Details:</h1>
      <form
        className={"text-justify " + props.className}
        onSubmit={handleSubmit(onSubmitHandler)}
        id="addNewGame"
      >
        <DataSummaryKeyValuePair
          dataKey="Ownership"
          dataValue={
            <>
              <select
                {...register("ownership")}
                value={currOwnership}
                onChange={(evt) =>
                  setCurrOwnership(evt.currentTarget.value as Ownership)
                }
              >
                {Object.values(Ownership).map((own) => (
                  <option value={own} key={own}>
                    {own}
                  </option>
                ))}
              </select>
              <Conditional when={!!errors["ownership"]}>
                <span className="text-warning text-xs pt-1 block">
                  {errors["ownership"]?.message as string}
                </span>
              </Conditional>
            </>
          }
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey="Location"
          dataValue={
            <>
              <select
                {...register("location")}
                value={currLocation}
                onChange={(evt) => {
                  setCurrLocation(evt.currentTarget.value as Location);
                  resetPeople();
                }}
              >
                {Object.values(Location).map((loc) => (
                  <option value={loc} key={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <Conditional when={!!errors["location"]}>
                <span className="text-warning text-xs pt-1 block">
                  {errors["location"]?.message as string}
                </span>
              </Conditional>
            </>
          }
        ></DataSummaryKeyValuePair>
        <Conditional when={currOwnership === "Personal"}>
          <DataSummaryKeyValuePair
            dataKey="Owner"
            dataValue={
              <>
                <SelectOrNew
                  selectListValues={[
                    { value: "-2", display: "Select..." },
                    ...locationHolders.map((h) => {
                      return {
                        value: `${h.id}`,
                        display: h.name,
                      };
                    }),
                  ]}
                  newValueString={"Add New..."}
                  selectProps={{
                    ...register("ownerId"),
                  }}
                  textProps={{
                    ...register("newOwner"),
                    placeholder: "New Games Owner...",
                  }}
                  className="text-right grow flex-nowrap"
                ></SelectOrNew>
                <Conditional when={!!errors["ownerId"]}>
                  <span className="text-warning text-xs pt-1 block">
                    {errors["ownerId"]?.message as string}
                  </span>
                </Conditional>
                <Conditional when={!!errors["newOwner"]}>
                  <span className="text-warning text-xs pt-1 block">
                    {errors["newOwner"]?.message as string}
                  </span>
                </Conditional>
              </>
            }
          ></DataSummaryKeyValuePair>
        </Conditional>
        <DataSummaryKeyValuePair
          dataKey="Holder"
          dataValue={
            <>
              <SelectOrNew
                selectListValues={[
                  currOwnership === "Personal"
                    ? { value: "-2", display: "(Same as owner)" }
                    : { value: "-2", display: "Select..." },
                  ...locationHolders.map((h) => {
                    return {
                      value: `${h.id}`,
                      display: h.name,
                    };
                  }),
                ]}
                newValueString={"Add New..."}
                selectProps={{
                  ...register("holderId"),
                }}
                textProps={{
                  ...register("newHolder"),
                  placeholder: "New Games Holder...",
                }}
                className="text-right grow flex-nowrap"
              ></SelectOrNew>
              <Conditional when={!!errors["holderId"]}>
                <span className="text-warning text-xs pt-1 block">
                  {errors["holderId"]?.message as string}
                </span>
              </Conditional>
              <Conditional when={!!errors["newHolder"]}>
                <span className="text-warning text-xs pt-1 block">
                  {errors["newHolder"]?.message as string}
                </span>
              </Conditional>
            </>
          }
        ></DataSummaryKeyValuePair>
        <DataSummaryKeyValuePair
          dataKey={"Adding to rotation?"}
          dataValue={
            <>
              <input type="checkbox" {...register("isInRotation")} />
            </>
          }
        />
        <CustomButton
          type="submit"
          innerText={submitting ? "loading..." : "Save"}
          actionType="confirm"
          disabled={submitting}
          className="w-20 rounded-lg py-1"
          form="addNewGame"
        />
      </form>
    </>
  );
}
