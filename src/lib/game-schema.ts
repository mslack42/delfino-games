import { tryParseInt } from "@/util/tryParseInt";
import { Ownership, Location } from "@prisma/client";
import { TypeOf, object, string, boolean } from "zod";

const ownershipValues: string[] = Object.values(Ownership);
const locationValues: string[] = Object.values(Location).map((v) => v);

export const addGameSchema = object({
  ownership: string(),
  location: string(),
  ownerId: string().min(-1, "Invalid Owner"),
  newOwner: string().optional(),
  holderId: string().min(-2, "Invalid Holder"),
  newHolder: string().optional(),
  isInRotation: boolean().default(false),
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
        data.ownership !== "Personal" ||
        (ownerIdInt !== null &&
          ownerIdInt !== undefined &&
          (ownerIdInt >= 0 || (data.newOwner && data.newOwner.length > 0)))
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
          (holderIdInt === -1 && data.newHolder && data.newHolder.length > 0) ||
          holderIdInt === -2)
      );
    },
    {
      path: ["newHolder"],
      message: "Holder must be specified",
    }
  )
  .refine(
    (data) => {
      const holderIdInt = tryParseInt(data.holderId);
      const ownerIdInt = tryParseInt(data.ownerId);
      return !(holderIdInt === -2 && ownerIdInt === -2);
    },
    {
      path: ["holderId"],
      message: "Holder must be specified",
    }
  );

// Currently, this is identical to game creation above
export const editGameSchema = object({
  ownership: string(),
  location: string(),
  ownerId: string().min(-1, "Invalid Owner"),
  newOwner: string().optional(),
  holderId: string().min(-2, "Invalid Holder"),
  newHolder: string().optional(),
  isInRotation: boolean().default(false),
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
        data.ownership !== "Personal" ||
        (ownerIdInt !== null &&
          ownerIdInt !== undefined &&
          (ownerIdInt >= 0 || (data.newOwner && data.newOwner.length > 0)))
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
          (holderIdInt === -1 && data.newHolder && data.newHolder.length > 0) ||
          holderIdInt === -2)
      );
    },
    {
      path: ["newHolder"],
      message: "Holder must be specified",
    }
  )
  .refine(
    (data) => {
      const holderIdInt = tryParseInt(data.holderId);
      const ownerIdInt = tryParseInt(data.ownerId);
      return !(holderIdInt === -2 && ownerIdInt === -2);
    },
    {
      path: ["holderId"],
      message: "Holder must be specified",
    }
  );

export type AddGameInput = TypeOf<typeof addGameSchema>;
export type EditGameInput = TypeOf<typeof editGameSchema>;
