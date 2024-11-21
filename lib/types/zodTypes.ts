import { z } from "zod";

// Schéma de commentaire
export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
  isReply: z.boolean().optional().nullable(),
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

const imageFormatSchema = z.object({
  name: z.string(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  path: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  url: z.string(),
});

const imageSchema = z.object({
  type: z.literal("image"),
  image: z.object({
    name: z.string(),
    alternativeText: z.string().nullable(),
    url: z.string(),
    caption: z.string().nullable(),
    width: z.number(),
    height: z.number(),
    formats: z
      .object({
        thumbnail: imageFormatSchema,
      })
      .optional(),
    hash: z.string(),
    ext: z.string(),
    mime: z.string(),
    size: z.number(),
    previewUrl: z.string().nullable(),
    provider: z.string(),
    provider_metadata: z.unknown().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  children: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string(),
    }),
  ),
});

const quoteSchema = z.object({
  type: z.literal("quote"),
  children: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string(),
    }),
  ),
});

// Schémas pour HeroSection
export const imageHero = z.object({
  id: z.number(),
  documentId: z.string(),
  url: z.string(),
  alternativeText: z.string().nullable(),
});

export const linkSchema = z.object({
  id: z.number(),
  url: z.string(),
  text: z.string(),
});

export const heroSectionPropsSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  __component: z.string(),
  heading: z.string(),
  subHeading: z.string(),
  image: imageHero,
  link: linkSchema,
});



// Export des schémas
export const contentSchema = z.array(
  z.discriminatedUnion("type", [
    headingSchema,
    paragraphSchema,
    listSchema,
    imageSchema,
    quoteSchema,
  ]),
);

// Schéma pour le composant media
const mediaComponentSchema = z.object({
  __component: z.string(),
  id: z.number(),
  file: z.object({
    id: z.number(),
    documentId: z.string(),
    name: z.string(),
    alternativeText: z.string().nullable(),
    caption: z.string().nullable(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }).optional().nullable(),
});

export const articleSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  publishedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
  blocks: z
    .array(
      z.discriminatedUnion("__component", [
        z.object({
          __component: z.literal("shared.texte"),
          id: z.number(),
          content: contentSchema,
        }),
        z.object({
          __component: z.literal("shared.media"),
          id: z.number(),
          file: mediaComponentSchema.shape.file,
        }),
        z.object({
          __component: z.literal("shared.slider"),
          id: z.number(),
          files: z.array(mediaComponentSchema.shape.file),
        }),
      ]),
    )
    .optional()
    .nullable(),
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
      avatar: z
        .object({
          url: z.string(),
          alternativeText: z.string().nullable().optional(),
          width: z.number(),
          height: z.number(),
        })
        .optional()
        .nullable(),
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

// Types du Header

const socialLinkSchema = z.object({
  id: z.number(),
  text: z.string(),
  url: z.string(),
});

const navBarItem = z.array(
  z.object({
    id: z.number(),
    text: z.string(),
    url: z.string(),
  }),
);

export const headerSchema = z.object({
  data: z.object({
    logoText: z.object({
      id: z.number(),
      text: z.string(),
      url: z.string(),
    }),
    socialLink: z.array(socialLinkSchema),
    navBar: navBarItem
  }),
});

// Types du ResponsiveMenu

export const logoTextSchema = z.object({
  id: z.number(),
  text: z.string(),
  url: z.string(),
});

export const navBarItemSchema = z.object({
  id: z.number(),
  text: z.string(),
  url: z.string(),
});

// Schéma principal pour ResponsiveMenu
export const responsiveMenuSchema = z.object({
  navBar: z.array(navBarItemSchema),
  socialLink: z.array(socialLinkSchema),
  logoText: logoTextSchema,
});

// Types du Footer

export const footerPropsSchema = z.object({
  data: z.object({
    logoText: z.object({
      id: z.number(),
      text: z.string(),
      url: z.string(),
    }),
    text: z.string(),
    socialLink: z.array(socialLinkSchema),
  }),
});



// Types inférés
export type Article = z.infer<typeof articleSchema>;
export type ArticleComment = z.infer<typeof commentSchema>;
export type Content = z.infer<typeof contentSchema>;
export type BaseNode = z.infer<typeof baseNodeSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Link = z.infer<typeof linkSchema>;
export type HeroSectionProps = z.infer<typeof heroSectionPropsSchema>;
export type HeaderProps = z.infer<typeof headerSchema>;
export type FooterProps = z.infer<typeof footerPropsSchema>;
export type LogoText = z.infer<typeof logoTextSchema>;
export type NavBarItem = z.infer<typeof navBarItemSchema>;
export type ResponsiveMenuProps = z.infer<typeof responsiveMenuSchema>;
