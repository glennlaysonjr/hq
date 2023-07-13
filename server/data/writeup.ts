import prisma from "./prisma";

export async function getWriteUps() {
  const writeups = await prisma.writeups.findMany({
    where: { published: true },
  });
  return writeups;
}

export async function getWriteUp(id) {
  if (!id) {
    const validationError = createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      data: "name required",
    });
    return { validationError, status: 422 };
  }
  const writeup = await prisma.writeups.findUnique({
    where: {
      id: String(id),
    },
  });
  return { writeup, status: 200 };
}
//Create WriteUp
export async function createWriteUp(data) {
  let result = null;
  result = data;
  result = await prisma.writeups.create({
    data: data,
  });
  return result;
}
