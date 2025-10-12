import { mutation } from "./_generated/server";

// One-time mutation to seed the database with initial remedies
export const seedRemedies = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if remedies already exist
    const existing = await ctx.db.query("remedies").first();
    if (existing) {
      return { message: "Remedies already seeded" };
    }

    const remedies = [
      {
        title: "Coconut Oil Deep Nourishment",
        steps: 3,
        duration: "15 mins",
        category: "moisture",
        gradientStart: "#2A5C4E",
        gradientEnd: "#1A3D32",
        description: "A deeply nourishing treatment that penetrates hair shafts to restore moisture and prevent protein loss.",
        ingredients: ["Coconut oil", "Honey", "Avocado"],
        instructions: [
          "Warm coconut oil in a bowl",
          "Apply to hair from roots to tips",
          "Leave for 30 minutes, then wash",
        ],
        createdAt: Date.now(),
      },
      {
        title: "7-Day Ayurvedic Growth Plan",
        steps: 7,
        duration: "10 mins daily",
        category: "growth",
        gradientStart: "#7FA387",
        gradientEnd: "#5D8267",
        description: "Traditional Ayurvedic herbs and oils to promote hair growth and scalp health.",
        ingredients: ["Amla oil", "Bhringraj", "Neem", "Brahmi"],
        instructions: [
          "Massage scalp with herb-infused oil",
          "Leave overnight",
          "Wash with mild shampoo in morning",
        ],
        createdAt: Date.now() - 1000,
      },
      {
        title: "14-Day Shine & Repair",
        steps: 4,
        duration: "15 mins",
        category: "repair",
        gradientStart: "#4A7C6F",
        gradientEnd: "#35625A",
        description: "Restore damaged hair and add natural shine with this herbal repair treatment.",
        ingredients: ["Hibiscus flowers", "Aloe vera", "Rose water"],
        instructions: [
          "Blend hibiscus with aloe vera",
          "Apply to hair and scalp",
          "Leave for 20 minutes",
          "Rinse with cool water",
        ],
        createdAt: Date.now() - 2000,
      },
      {
        title: "28-Day Herbal Detox",
        steps: 3,
        duration: "20 mins",
        category: "detox",
        gradientStart: "#2D5A4C",
        gradientEnd: "#1F4238",
        description: "Cleanse scalp and remove buildup with this herbal detox treatment.",
        ingredients: ["Rosemary oil", "Tea tree oil", "Peppermint oil", "Apple cider vinegar"],
        instructions: [
          "Mix oils with apple cider vinegar",
          "Apply to scalp and massage",
          "Leave for 15 minutes then rinse",
        ],
        createdAt: Date.now() - 3000,
      },
      {
        title: "Aloe Vera Hydration Mask",
        steps: 2,
        duration: "20 mins",
        category: "moisture",
        gradientStart: "#6B9F7E",
        gradientEnd: "#4A7C5F",
        description: "Restore moisture and soothe the scalp with pure aloe vera.",
        ingredients: ["Fresh aloe vera gel", "Coconut oil", "Vitamin E"],
        instructions: [
          "Mix aloe vera gel with coconut oil",
          "Apply to hair and leave for 20 minutes",
        ],
        createdAt: Date.now() - 4000,
      },
      {
        title: "Fenugreek Strength Treatment",
        steps: 3,
        duration: "30 mins",
        category: "strength",
        gradientStart: "#8A6F4F",
        gradientEnd: "#6B5840",
        description: "Strengthen hair follicles and reduce hair fall with fenugreek seeds.",
        ingredients: ["Fenugreek seeds", "Yogurt", "Coconut oil"],
        instructions: [
          "Soak fenugreek seeds overnight",
          "Grind into paste with yogurt",
          "Apply and leave for 30 minutes",
        ],
        createdAt: Date.now() - 5000,
      },
      {
        title: "Rice Water Protein Treatment",
        steps: 2,
        duration: "15 mins",
        category: "protein",
        gradientStart: "#9FA89F",
        gradientEnd: "#7A8A7A",
        description: "Strengthen and add shine with fermented rice water rich in amino acids.",
        ingredients: ["Rice", "Water"],
        instructions: [
          "Ferment rice water for 24 hours",
          "Apply to hair and leave for 15 minutes",
        ],
        createdAt: Date.now() - 6000,
      },
      {
        title: "Onion Juice Growth Booster",
        steps: 3,
        duration: "30 mins",
        category: "growth",
        gradientStart: "#8F7A6A",
        gradientEnd: "#705B4D",
        description: "Boost collagen production and stimulate hair growth with onion juice.",
        ingredients: ["Onion", "Castor oil", "Lavender oil"],
        instructions: [
          "Extract onion juice and mix with oils",
          "Apply to scalp",
          "Leave for 30 minutes and wash thoroughly",
        ],
        createdAt: Date.now() - 7000,
      },
    ];

    // Insert all remedies
    for (const remedy of remedies) {
      await ctx.db.insert("remedies", remedy);
    }

    return { message: `Successfully seeded ${remedies.length} remedies` };
  },
});

