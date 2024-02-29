import { Location } from "@prisma/client";
import { TypeOf, object, string , number as number_} from "zod";

const locationValues: string[] = Object.values(Location).map(v => v)

export const editHolderSchema = object({
    name: string({required_error: "Name is required"}).min(1,"Name is required"),
    office: string({invalid_type_error: "Invalid location"}),
    id: number_()
}).refine((data) => locationValues.includes(data.office), {
    path: ["office"],
    message: "Invalid office"
})

export type EditHolderInput = TypeOf<typeof editHolderSchema>