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

  const url = `http://localhost:1337/api/${resourceName}?${urlParams}`;
  //console.log(`Fetching from Strapi: ${url}`);

  const response = await fetch(url, {
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
      //Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      //"Cache-Control": noCache ? "no-store" : "default",
      ...headers,
    },
  });

  if (response.status !== 200 && response.status !== 201) {
    const errorText = await response.text();
    console.error(
      `Error fetching from Strapi: ${response.status} ${response.statusText} - ${errorText}`,
    );
    throw new Error(
      `Failed to fetch from Strapi: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const getArticles = async ({
  category,
  query,
  currentPage,
}: {
  category: string | null;
  query?: string | null;
    currentPage: number;
}) => {
  const filters: {

    category?: { name: { $eqi: string } };
    $or?: Array<
      | { title: { $containsi: string } }
      | { description: { $containsi: string } }
    >;
  } = {};

  if (category) {
    filters.category = {
      name: {
        $eqi: category,
      },
    };
  }

  if (query) {
    filters.$or = [
      {
        title: {
          $containsi: query,
        },
      },
      {
        description: {
          $containsi: query,
        },
      },
    ];
  }

  const PAGE_SIZE = 6;

  const jsonResponse = await fetchStrapi({
    resourceName: "articles",
    sort: ["id:desc"],
    populate: ["cover", "author", "author.avatar", "category", "comments"],
    filters,
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
    status: "published",
    method: "GET",
    noCache: true,
  });

  const { data: articles } = articleListSchema.parse(jsonResponse);
  //const meta = jsonResponse.meta;
  //console.dir(meta);

  return {
    articles,
    meta: {
      pagination: jsonResponse.meta.pagination,
    },
  };
};

export const getArticlesBySlug = async (slug: string) => {
  const jsonResponse = await fetchStrapi({
    resourceName: `articles`,
    filters: { slug: { $eq: slug } },
    populate: [
      "cover",
      "author",
      "author.avatar",
      "category",
      "comments",
      "blocks",
      "blocks.content",
      "blocks.image",
      "blocks.file",
      "blocks.files",
    ],
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
    noCache: true,
  });

  const categories = categoriesListSchema.parse(jsonResponse.data);
  return categories;
};

export const createComment = async ({
  articleSlug,
  content,
  author,
  isReply = false,
}: {
  articleSlug: string;
  content: string;
  author: string;
  isReply?: boolean;
}) => {
  try {
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

    
    const jsonResponse = await fetchStrapi({
      resourceName: "comments",
      method: "POST",
      body: {
        article: documentId,
        content,
        author,
        isReply,
      },
      type: "content",
      noCache: true,
    });

    const comment = commentSchema.parse(jsonResponse.data);
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to fetch from Strapi");
  }
};

export const getHomePageData = async () => {
  try {
    const homePageData = await fetchStrapi({
      resourceName: "home-page",
      populate: [
        "blocks",
        "blocks.image",
        "blocks.link",
        "blocks.feature",
        "blocks.feature.image.data",
        "blocks.feature.image.data.attributes",
      ],
      noCache: true,
    });
    return homePageData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const getGlobalData = async () => {
  try {
    const globalData = await fetchStrapi({
      resourceName: "global",
      populate: [
        "header.logoText",
        "header.navBar",
        "header.socialLink",
        "footer.logoText",
        "footer.socialLink",
      ],
      noCache: true,
    });
    return globalData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const getGlobalPageMetadata = async () => {
  try {
    const metadata = await fetchStrapi({
      resourceName: "global",
      populate: ["favicon", "defaultSeo", "defaultSeo.shareImage"],
      fields: ["siteName", "siteDescription"],
      noCache: true,
    });
    return metadata;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
}