import { Article, articleSchema } from "@/lib/types/zodTypes";


export const transformToArticle = (raw: unknown): Article | null => {
  try {
    const validatedData = articleSchema.parse(raw);

    // Valeurs par défaut pour les champs optionnels
    return {
      ...validatedData,
      createdAt: validatedData.createdAt || new Date().toISOString(),
      updatedAt:
        validatedData.updatedAt ||
        validatedData.createdAt ||
        new Date().toISOString(),
      publishedAt:
        validatedData.publishedAt ||
        validatedData.createdAt ||
        new Date().toISOString(),
      cover: validatedData.cover || {
        url: "",
        alternativeText: "",
        width: 0,
        height: 0,
      },
      author: validatedData.author || { name: "", email: "" },
      category: validatedData.category || { name: "" },
      comments: validatedData.comments || [],
      content: validatedData.content || [],
    };
  } catch (error) {
    console.error("Erreur de validation des données:", error);
    return null;
  }
};
