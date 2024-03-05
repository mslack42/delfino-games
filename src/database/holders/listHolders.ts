import prisma from "@/db";

export async function listHolders() {
  return await prisma.person.findMany();
}
