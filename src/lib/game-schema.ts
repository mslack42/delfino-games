import { tryParseInt } from "@/util/tryParseInt";
import { Ownership, Location } from "@prisma/client";
import { TypeOf, object, string, number as number_, record } from "zod";

const ownershipValues: string[] = Object.values(Ownership);
const locationValues: string[] = Object.values(Location).map((v) => v);

export const addGameSchema = object({
  ownership: string(),
  location: string(),
  ownerId: string().min(-1, "Invalid Owner"),
  newOwner: string().optional(),
  holderId: string().min(-2, "Invalid Holder"),
  newHolder: string().optional(),
})
  .refine((data) => ownershipValues.includes(data.ownership), {
    path: ["ownership"],
    message: "Invalid ownership",
  })
  .refine((data) => locationValues.includes(data.location), {
    path: ["office"],
    message: "Invalid office",
  })
  .refine(
    (data) => {
      const ownerIdInt = tryParseInt(data.ownerId);
      return (
        ownerIdInt !== null &&
        ownerIdInt !== undefined &&
        (ownerIdInt >= 0 || data.newOwner)
      );
    },
    {
      path: ["newOwner"],
      message: "Owner must be specified",
    }
  )
  .refine(
    (data) => {
      const holderIdInt = tryParseInt(data.holderId);
      return (
        holderIdInt !== null &&
        holderIdInt !== undefined &&
        (holderIdInt >= 0 ||
          (holderIdInt === -1 && data.newHolder) ||
          holderIdInt === -2)
      );
    },
    {
      path: ["newHolder"],
      message: "Holder must be specified",
    }
  );

export type AddGameInput = TypeOf<typeof addGameSchema>;
