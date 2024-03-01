import prisma from "@/db";

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  return await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: password,
      accounts: {
        create: {
          role: "Unverified",
        },
      },
    },
  });
}
