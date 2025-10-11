// Pre-defined hair routine templates for different hair types

export interface HairRoutineStep {
  text: string;
  category: "wash" | "condition" | "treatment" | "styling" | "protection" | "other";
  productName?: string;
}

export const routineTemplates = {
  curly: [
    { text: "Pre-poo with coconut oil", category: "treatment" as const, productName: "Coconut Oil" },
    { text: "Wash with sulfate-free shampoo", category: "wash" as const },
    { text: "Deep condition for 20 mins", category: "condition" as const },
    { text: "Apply leave-in conditioner", category: "styling" as const },
    { text: "Define curls with gel", category: "styling" as const },
    { text: "Diffuse on low heat", category: "styling" as const },
  ],
  straight: [
    { text: "Wash with volumizing shampoo", category: "wash" as const },
    { text: "Apply lightweight conditioner", category: "condition" as const },
    { text: "Apply heat protectant", category: "protection" as const },
    { text: "Blow dry with round brush", category: "styling" as const },
    { text: "Apply shine serum", category: "styling" as const },
  ],
  wavy: [
    { text: "Wet hair with water", category: "other" as const },
    { text: "Apply clarifying shampoo", category: "wash" as const },
    { text: "Condition mid-length to ends", category: "condition" as const },
    { text: "Scrunch in mousse", category: "styling" as const },
    { text: "Air dry or diffuse", category: "styling" as const },
  ],
  protective: [
    { text: "Moisturize scalp", category: "treatment" as const },
    { text: "Apply edge control", category: "styling" as const },
    { text: "Wrap hair in silk scarf", category: "protection" as const },
    { text: "Apply oil to ends", category: "treatment" as const },
  ],
  washDay: [
    { text: "Detangle with wide-tooth comb", category: "other" as const },
    { text: "Pre-poo treatment", category: "treatment" as const },
    { text: "Shampoo scalp", category: "wash" as const },
    { text: "Deep condition", category: "condition" as const },
    { text: "Rinse with cool water", category: "other" as const },
    { text: "T-shirt dry", category: "other" as const },
    { text: "Apply styling products", category: "styling" as const },
  ],
};

export const categoryEmojis = {
  wash: "🧴",
  condition: "💧",
  treatment: "✨",
  styling: "💇‍♀️",
  protection: "🛡️",
  other: "📝",
};

export const categoryColors = {
  wash: "#4fc3f7",
  condition: "#81c784",
  treatment: "#ff6b9d",
  styling: "#ba68c8",
  protection: "#ffd54f",
  other: "#90a4ae",
};

