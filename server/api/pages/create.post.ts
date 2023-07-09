import { createPage } from "@/server/data/pages";
//import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  //const session = await getServerSession(event);
  const data = await readBody(event);
  console.log(data);
  //   if (!session) {
  //     throw createError({
  //       statusCode: 401,
  //       statusMessage: "Unauthorized client error",
  //     });
  //   }
  let page = createPage(data);
  return page;
});
