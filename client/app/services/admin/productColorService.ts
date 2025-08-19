export const productColor = {
  getColors: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/productColor");
      if (!res.ok) {
        return {
          success: false,
          error: "Erreur lors de la récupération des catégories",
        };
      }
      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      console.error(err);
    }
  },
};
