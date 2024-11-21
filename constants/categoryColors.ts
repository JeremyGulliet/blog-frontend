export const CATEGORY_COLORS: { [key: string]: string } = {
  story: "bg-blue-500",
  nature: "bg-green-500",
  food: "bg-purple-500",
  tech: "bg-orange-500",
  news: "bg-pink-500",
  retraite: "bg-yellow-500",
  default: "bg-gray-500",
};

// Fonction pour capitaliser la première lettre
export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getCategoryColor = (categoryName: string): string => {
  // Convertir en minuscules pour la recherche
  const normalizedCategoryName = categoryName.toLowerCase();
  return CATEGORY_COLORS[normalizedCategoryName] || CATEGORY_COLORS.default;
};
