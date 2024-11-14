import qs from "qs";
import {
  articleSchema,
  articleListSchema,
  categoriesListSchema,
  commentSchema,
} from "@/lib/types/zodTypes";

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

export const getArticles = async ({
  category,
}: {
  category: string | null;
}) => {
  const jsonResponse = await fetchStrapi({
    resourceName: "articles",
    sort: ["id:desc"],
    populate: ["cover", "author", "category", "comments"],
    pagination: { page: 1, pageSize: 100 },
    filters: category
      ? {
          category: {
            name: {
              $eqi: category,
            },
          },
        }
      : {},
    status: "published",
    method: "GET",
    noCache: true,
  });

  const { data: articles } = articleListSchema.parse(jsonResponse);
  return articles;
};

export const getArticlesBySlug = async (slug: string) => {
  const jsonResponse = await fetchStrapi({
    resourceName: `articles`,
    filters: { slug: { $eq: slug } },
    populate: ["cover", "author", "category", "comments"],
    fields: ["title", "description", "updatedAt", "createdAt", "content", "slug"],
    noCache: true,
  });

  const article = articleSchema.parse(jsonResponse.data[0]);
  return article;
};

export const getCategory = async () => {
  const jsonResponse = await fetchStrapi({
    resourceName: "categories",
    sort: ["id:desc"],
    fields: ["name"],
  });

  const categories = categoriesListSchema.parse(jsonResponse.data);
  return categories;
};

export const createComment = async ({
  articleSlug,
  content,
  author,
}: {
  articleSlug: string;
  content: string;
  author: string;
}) => {
  try {
    // Récupérer l'article par son slug
    const articleResponse = await fetchStrapi({
      resourceName: "articles",
      filters: { slug: { $eq: articleSlug } },
      fields: ["documentId", "title", "description"],
      noCache: true,
    });

    if (!articleResponse.data || articleResponse.data.length === 0) {
      throw new Error("Article not found");
    }

    const article = articleSchema.parse(articleResponse.data[0]);
    console.log("Article found:", article);
    const documentId = article.documentId;

    // Créer le commentaire avec le documentId de l'article
    const jsonResponse = await fetchStrapi({
      resourceName: "comments",
      method: "POST",
      body: {
        article: documentId,
        content,
        author,
      },
      type: "content",
      noCache: true,
    });

    const comment = commentSchema.parse(jsonResponse.data);
    console.log("Comment created:", comment);

    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to fetch from Strapi");
  }
};
