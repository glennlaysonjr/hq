import prisma from "./prisma";

export async function getRatingTypes() {
  const ratingTypes = await prisma.ratingTypes.findMany({
    where: { published: true },
  });
  return ratingTypes;
}

export async function getRatingType(id) {
  if (!id) {
    const validationError = createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      data: "name required",
    });
    return { validationError, status: 422 };
  }
  const ratingType = await prisma.ratingTypes.findUnique({
    where: {
      id: String(id),
    },
  });
  return { ratingTypes, status: 200 };
}
//Create Rating Type
export async function createRatingTypes(data) {
  let result = null;
  result = data;
  result = await prisma.ratingTypes.create({
    data: data,
  });
  return result;
}
