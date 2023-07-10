import prisma from "./prisma";

export async function getPages() {
  const pages = await prisma.pages.findMany({
    where: { published: true },
  });
  return pages;
}

export async function getPage(id) {
  if (!id) {
    const validationError = createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      data: "name required",
    });
    return { validationError, status: 422 };
  }
  const page = await prisma.pages.findUnique({
    where: {
      id: String(id),
    },
  });
  return { page, status: 200 };
}
//Create Page
export async function createPage(data) {
  let result = null;
  result = data;
  result = await prisma.pages.create({
    data: data,
  });
  return result;
}
