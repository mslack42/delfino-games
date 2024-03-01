import { Location } from "@prisma/client";
import prisma from "@/db";

export async function updateHolder(name: string, office: Location, id: number) {
  await prisma.person.update({
    where: {
      id: id,
    },
    data: {
      location: {
        set: office as Location,
      },
      name: {
        set: name,
      },
    },
  });
}
