import prisma from "./prisma";

export async function getTags() {
  const tags = await prisma.tags.findMany({
    where: { published: true },
  });
  return tags;
}

export async function getTag(id) {
  if (!id) {
    const validationError = createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      data: "name required",
    });
    return { validationError, status: 422 };
  }
  const tag = await prisma.tags.findUnique({
    where: {
      id: String(id),
    },
  });
  return { tag, status: 200 };
}
//Create Tag
export async function createWriteUp(data) {
  let result = null;
  result = data;
  result = await prisma.tags.create({
    data: data,
  });
  return result;
}
