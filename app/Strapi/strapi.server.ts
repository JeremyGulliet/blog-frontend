import qs from "qs";
import { z } from "zod";

export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  slug: z.string().optional().nullable(),
  cover: z
    .object({
      url: z.string(),
      alternativeText: z.string().optional(),
      width: z.number(),
      height: z.number(),
    })
    .optional()
    .nullable(),
  author: z
    .object({
      name: z.string(),
      email: z.string(),
    })
    .optional()
    .nullable(),
  category: z
    .object({
      name: z.string(),
    })
    .optional()
    .nullable(),
});

const articleListSchema = z.object({
  data: z.array(articleSchema),
});

export const categoriesListSchema = z.array (z.object({
  name: z.string()
}))

export const fetchStrapi = async ({
  resourceName,
  sort = [],
  populate = [],
  fields = [],
  filters = {},
  pagination = {
    page: 1,
    pageSize: 100,
  },
  status = "published",
  method = "GET",
  body = {},
  type = "content",
  headers = {},
  noCache = false,
}: {
  resourceName: string;
  sort?: string[];
  populate?: string[];
  fields?: string[];
  filters?: object;
  pagination?: {
    page: number;
    pageSize: number;
  };
  status?: "draft" | "published";
  method?: "GET" | "POST" | "PUT";
  body?: object;
  type?: "auth" | "content";
  headers?: HeadersInit;
  noCache?: boolean;
}) => {
  const urlParams = qs.stringify(
    {
      populate: populate,
      fields: fields,
      sort: sort,
      filters: filters,
      pagination: pagination,
      status,
      noCache: noCache ? "1" : undefined,
      _timestamp: noCache ? new Date().getTime() : undefined, // Ajout d'un timestamp pour éviter le cache
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await fetch(
    `http://localhost:1337/api/${resourceName}?${urlParams}`,
    {
      method,
      body:
        method !== "GET"
          ? JSON.stringify(
              type === "content"
                ? {
                    data: body,
                  }
                : body,
            )
          : undefined,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": noCache ? "no-store" : "default",
        ...headers,
      },
    },
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to fetch from Strapi");
  }
  const jsonResponse = await response.json();
  return jsonResponse;
};


export const getArticles = async ({ category }: { category: string | null }) => {
  const jsonResponse = await fetchStrapi({
    resourceName: "articles",
    sort: ["id:desc"],
    populate: ["cover", "author", "category"],
    pagination: { page: 1, pageSize: 100 },
    filters: category ? {
      category: {
        name: {
          $eqi: category
        }
      }
    } : {},
    status: "published",
    method: "GET",
    noCache: true,
  });
  const { data: articles } = articleListSchema.parse(jsonResponse);
  //console.log(articles);
  return articles;
 }

 export const getArticlesBySlug = async (slug: string) => {
  const jsonResponse = await fetchStrapi({
    resourceName: `articles/${slug}`,
  });
   
   //console.log("API Response:", jsonResponse);
  const article = articleSchema.parse(jsonResponse.data);
  return article;
 }


 export const getCategory = async () => {
  const jsonResponse = await fetchStrapi({
    resourceName: "categories",
    sort: ["id:desc"],
    fields: ["name"],
  });
   
   const categories = categoriesListSchema.parse(jsonResponse.data);
  return categories;
 }