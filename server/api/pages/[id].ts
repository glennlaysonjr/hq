import { getPage } from "@/server/data/pages";
export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const page = await getPage(id);
  if (!page) {
    const notFoundError = createError({
      statusCode: 404,
      statusMessage: "Page not found ",
    });
    sendError(event, notFoundError);
  }
  return page;
});
