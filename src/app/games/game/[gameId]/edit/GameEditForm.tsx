"use client";
import { BggDataSummary } from "@/components/data-display/BggDataSummary";
import { DataSummaryKeyValuePair } from "@/components/data-display/DataSummaryKeyValuePair";
import { CustomButton } from "@/components/input/CustomButton";
import { SelectOrNew } from "@/components/input/SelectOrNew";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { ApiRoutes } from "@/constants/ApiRoutes";
import { InventoryItem } from "@/database/types";
import { EditGameInput, editGameSchema } from "@/lib/game-schema";
import { createBggDataSummaryFromInventoryItem } from "@/util/data-conversion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location, Ownership } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Conditional } from "@/components/common/Conditional";
import { useToast } from "@/components/shadcn/use-toast";
import { BggExpansionSummaryData } from "@/bgg/types";
import { EditGameContext, EditGameContextType } from "./EditGameContext";
import { ExpansionsSelector } from "@/components/expansion-card/ExpansionsSelector";

type GameEditFormProps = {
  holders: { id: number; name: string; location: Location }[];
  data: InventoryItem;
  className?: string;
  expansions: BggExpansionSummaryData[];
};

export function GameEditForm(props: GameEditFormProps) {
  const { data, expansions, holders } = props;
  const [currLocation, setCurrLocation] = useState<Location>(
    data.dsData.location
  );
  const [currOwnership, setCurrOwnership] = useState<Ownership>(
    data.dsData.ownership
  );
  const resetPeople = () => {
    resetField("ownerId", { defaultValue: "-2" });
    resetField("holderId", { defaultValue: "-2" });
  };
  const locationHolders = useMemo(
    () => props.holders.filter((h) => h.location === currLocation),
    [props.holders, currLocation]
  );
  const [submitting, setSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>(
    data.dsData.ownedExpansions.map((ex) => ex.bggId)
  );

  const context: EditGameContextType = {
    expansions,
    holders,
    selectedExpansionBggIds: selectedIds,
    setSelectedExpansionBggIds: setSelectedIds,
  };

  const router = useRouter();
  const methods = useForm<EditGameInput>({
    resolver: zodResolver(editGameSchema),
    defaultValues: {
      ownership: data.dsData.ownership,
      location: data.dsData.location,
      ownerId: locationHolders.map((lh) => lh.id).includes(data.dsData.ownerId)
        ? data.dsData.ownerId.toString()
        : "-2",
      holderId: locationHolders
        .map((lh) => lh.id)
        .includes(data.dsData.holderId)
        ? data.dsData.holderId.toString()
        : "-2",
      isInRotation: data.dsData.inRotation,
    },
  });
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = methods;

  const onSubmitHandler: SubmitHandler<EditGameInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch(ApiRoutes.EditGame(data.id.toString()), {
        method: "POST",
        body: JSON.stringify({
          data: values,
          selectedExpansions: expansions.filter((ex) =>
            selectedIds.includes(ex.bggId)
          ),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (res.status === 500) {
          toast({
            title: "Failed to edit game - internal failure",
            type: "background",
            variant: "destructive",
          });
        }
        if (res.status === 400) {
          toast({
            title: "Failed to edit game - no game specified",
            type: "background",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Game edited successfully",
      });
      router.push(ApplicationRoutes.Game(data.id));
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Failed to edit game",
        type: "background",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EditGameContext.Provider value={context}>
      <div className="w-full md:w-1/2 ">
        <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
          <BggDataSummary
            data={createBggDataSummaryFromInventoryItem(data)}
          ></BggDataSummary>
        </div>
      </div>
      <div className="w-full md:w-1/2 ">
        <ExpansionsPicker />
        <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
          <div>
            <h1 className="text-xl">
              <b>This copy:</b>
            </h1>
            <div className="flex justify-center text-center flex-col ">
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
                  dataKey={"In rotation?"}
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
            </div>
          </div>
        </div>
      </div>
    </EditGameContext.Provider>
  );
}

function ExpansionsPicker() {
  const { expansions, selectedExpansionBggIds, setSelectedExpansionBggIds } =
    useContext(EditGameContext);

  const onToggle = (bggId: number) => {
    if (selectedExpansionBggIds.includes(bggId)) {
      setSelectedExpansionBggIds(
        selectedExpansionBggIds.filter((id) => id != bggId)
      );
    } else {
      setSelectedExpansionBggIds([...selectedExpansionBggIds, bggId]);
    }
  };

  return (
    <Conditional when={expansions.length > 0}>
      <div className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg">
        <h1 className="text-2xl font-bold pt-2">Possible Expansions:</h1>
        <ExpansionsSelector
          expansions={expansions!}
          onToggle={onToggle}
          selectedIds={selectedExpansionBggIds}
        />
      </div>
    </Conditional>
  );
}
