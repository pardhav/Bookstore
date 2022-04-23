import algoliasearch from "algoliasearch/lite";

export async function searchUsingTitle(title: string) {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY as string
  );
  const index = client.initIndex("Books");
  return await index.search(title);
}
