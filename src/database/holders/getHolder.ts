import prisma from "@/db";
import { tryParseInt } from "@/util/tryParseInt";

export async function getHolder(id: string) {
  return await prisma.person.findFirst({
    where: {
      id: tryParseInt(id),
    },
  });
}
