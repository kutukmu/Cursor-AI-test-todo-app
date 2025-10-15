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
        dailyTasks: [
          ["Amla Oil Scalp Massage", "Hydrating Hair Mask", "Mindful Meditation"],
          ["Bhringraj Treatment", "Gentle Scalp Massage", "Deep Breathing Exercise"],
          ["Neem & Brahmi Oil Application", "Steam Treatment", "Gratitude Journaling"],
          ["Scalp Detox Rinse", "Protein Hair Mask", "Yoga Practice"],
          ["Herbal Oil Massage", "Hair Growth Visualization", "Nutritious Meal"],
          ["Deep Conditioning Treatment", "Scalp Acupressure", "Rest & Hydration"],
          ["Final Growth Oil Treatment", "Celebration Ritual", "Progress Photos"],
        ],
        dailyInstructions: [
          [
            "Warm 2-3 tablespoons of Amla oil. Gently massage into scalp using circular motions for 5-10 minutes. Focus on areas where you want more growth.",
            "Mix 1 ripe avocado with 2 tablespoons of coconut milk. Apply from roots to tips, focusing on dry areas. Leave for 15 minutes, then rinse with cool water.",
            "Find a quiet space. Sit comfortably and visualize your hair growing healthy and strong. Focus on gratitude for your hair journey. Practice for 5 minutes."
          ],
          [
            "Apply Bhringraj oil (or powder mixed with coconut oil) to scalp. Massage for 10 minutes using firm but gentle pressure. Cover with shower cap for 30 minutes, then wash.",
            "Use your fingertips (not nails) to massage entire scalp in small circles. Spend extra time on the hairline and crown. This stimulates blood flow for growth.",
            "Sit or lie down comfortably. Breathe in for 4 counts, hold for 4, exhale for 4. Repeat for 5 minutes. Deep breathing reduces stress that can block hair growth."
          ],
          [
            "Mix Neem powder with Brahmi powder and coconut oil to make a paste. Apply to scalp and hair. The antibacterial properties cleanse while promoting growth.",
            "Boil water, pour into bowl. Lean over with towel over head to trap steam. Steam for 10 minutes. This opens cuticles and helps treatments penetrate deeper.",
            "Write down 3 things you're grateful for today. Gratitude reduces cortisol (stress hormone) which can affect hair health. Make this a daily habit."
          ],
          [
            "Mix 2 tablespoons apple cider vinegar with 1 cup water. Apply to scalp and massage. Let sit 5 minutes. This removes buildup and balances pH for optimal growth.",
            "Beat 1-2 eggs (depending on hair length). Apply to damp hair from roots to ends. Leave 20 minutes. Rinse with cool water. Eggs provide protein to strengthen hair.",
            "Follow a 15-minute yoga video focusing on inversions (downward dog, legs up wall). These poses increase blood flow to the scalp, delivering nutrients for growth."
          ],
          [
            "Create a blend of castor oil, rosemary oil, and peppermint oil (10:2:1 ratio). Warm slightly. Massage into scalp for 10 minutes. These oils are clinically proven for growth.",
            "Close your eyes and visualize your hair at your desired length and health. See yourself confidently running fingers through thick, strong hair. Visualization activates growth mindset.",
            "Eat a meal rich in protein (eggs, fish, beans), iron (spinach, lentils), and omega-3s (salmon, walnuts). Hair is made of protein and needs these nutrients to grow."
          ],
          [
            "Apply a thick, moisturizing conditioner or hair mask. Focus on ends but include scalp. Cover with plastic cap and leave for 30-60 minutes. Deep conditioning prevents breakage.",
            "Use your fingertips to press key pressure points on your scalp: temples, crown, base of skull, behind ears. Hold each for 10 seconds. This stimulates energy flow for hair.",
            "Drink at least 8 glasses of water today. Get 8 hours of sleep. Hair grows during rest, and proper hydration ensures nutrients reach the follicles."
          ],
          [
            "Do a final oil treatment with your favorite growth oil. Massage thoroughly, taking time to appreciate how far you've come. Leave in for 1 hour minimum before washing.",
            "Create a small ritual to honor your commitment. Light a candle, play music, take a bath. Celebrate that you completed all 7 days! You're building lasting hair care habits.",
            "Take photos from all angles (front, back, sides). Measure your hair length. Compare with Day 1 photos. You might see growth, but you've definitely improved scalp health!"
          ]
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

