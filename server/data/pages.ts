import prisma from "./prisma";

export async function getPages() {
  const pages = await prisma.pages.findMany({
    where: { published: true },
  });
  return pages;
}

export async function getPage(id) {
  const page = await prisma.pages.findUnique({
    where: {
      id: String(id),
    },
  });
  return page;
}

export async function createPage(data) {
  let result = null;
  result = data;
  result = await prisma.pages.create({
    data: data,
  });
  return result;
}
