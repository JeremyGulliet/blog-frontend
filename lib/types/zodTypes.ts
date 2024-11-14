// types/zodTypes.ts
import { z } from "zod";

// Schéma de commentaire
export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional().nullable(),
  publishedAt: z.string().optional().nullable(),
  article: z.object({ documentId: z.string() }).optional(),
});

// Schémas de base
const baseNodeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string(),
    bold: z.boolean().optional().nullable(),
    italic: z.boolean().optional().nullable(),
    underline: z.boolean().optional().nullable(),
    strikethrough: z.boolean().optional().nullable(),
  }),
  z.object({
    type: z.literal("link"),
    url: z.string(),
    children: z.array(
      z.object({
        type: z.literal("text"),
        text: z.string(),
      }),
    ),
  }),
]);

// Schémas de contenu
const headingSchema = z.object({
  type: z.literal("heading"),
  level: z.number(),
  children: z.array(baseNodeSchema),
});

const paragraphSchema = z.object({
  type: z.literal("paragraph"),
  children: z.array(baseNodeSchema),
});

const listSchema = z.object({
  type: z.literal("list"),
  format: z.enum(["unordered", "ordered"]),
  children: z.array(
    z.object({
      type: z.literal("list-item"),
      children: z.array(baseNodeSchema),
    }),
  ),
});

const imageSchema = z.object({
  type: z.literal("image"),
  image: z.object({
    name: z.string(),
    alternativeText: z.string().optional().nullable(),
    url: z.string(),
    caption: z.string().optional().nullable(),
    width: z.number(),
    height: z.number(),
    formats: z
      .object({
        thumbnail: z
          .object({
            name: z.string(),
            url: z.string(),
            width: z.number(),
            height: z.number(),
            size: z.number(),
          })
          .optional()
          .nullable(),
        medium: z
          .object({
            name: z.string(),
            url: z.string(),
            width: z.number(),
            height: z.number(),
            size: z.number(),
          })
          .optional()
          .nullable(),
        small: z
          .object({
            name: z.string(),
            url: z.string(),
            width: z.number(),
            height: z.number(),
            size: z.number(),
          })
          .optional()
          .nullable(),
        large: z
          .object({
            name: z.string(),
            url: z.string(),
            width: z.number(),
            height: z.number(),
            size: z.number(),
          })
          .optional()
          .nullable(),
      })
      .optional()
      .nullable(),
  }),
  children: z.array(baseNodeSchema),
});

// Export des schémas
export const contentSchema = z.array(
  z.discriminatedUnion("type", [
    headingSchema,
    paragraphSchema,
    listSchema,
    imageSchema,
  ]),
);

export const articleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  publishedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
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
  comments: z.array(commentSchema).optional().nullable(),
  content: contentSchema.optional().nullable(),
});

export const articleListSchema = z.object({
  data: z.array(articleSchema),
});

export const categoriesListSchema = z.array(
  z.object({
    name: z.string(),
  }),
);

// Types inférés
export type Article = z.infer<typeof articleSchema>;
export type ArticleComment = z.infer<typeof commentSchema>;
export type Content = z.infer<typeof contentSchema>;
export type BaseNode = z.infer<typeof baseNodeSchema>;
