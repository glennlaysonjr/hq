import { getPage, getPages } from "@/server/data/pages";

export default defineEventHandler(async () => {
  return await getPages();
});
