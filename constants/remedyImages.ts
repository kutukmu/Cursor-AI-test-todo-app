// Hero images for each remedy type
// Store your images in: assets/remedy-images/
// Supported formats: .jpg, .jpeg, .png, .webp

// Fallback image - will be used until you add your custom images
const fallbackImage = require("../assets/remedy-fallback.png");

// Import your custom images here (will use fallback until you add them)
const images = {
  "28-day": fallbackImage, // Replace with: require("../assets/remedy-images/28-day-complete-reset.jpg")
  "21-day-hydration": fallbackImage, // Replace with: require("../assets/remedy-images/21-day-hydration.jpg")
  "14-day-growth": fallbackImage, // Replace with: require("../assets/remedy-images/14-day-growth.jpg")
  "7-day-repair": fallbackImage, // Replace with: require("../assets/remedy-images/7-day-repair.jpg")
  "10-day-detox": fallbackImage, // Replace with: require("../assets/remedy-images/10-day-detox.jpg")
  "14-day-shine": fallbackImage, // Replace with: require("../assets/remedy-images/14-day-shine.jpg")
  "21-day-curl": fallbackImage, // Replace with: require("../assets/remedy-images/21-day-curl.jpg")
  "3-day-emergency": fallbackImage, // Replace with: require("../assets/remedy-images/3-day-emergency.jpg")
  "14-day-frizz": fallbackImage, // Replace with: require("../assets/remedy-images/14-day-frizz.jpg")
  "30-day-wellness": fallbackImage, // Replace with: require("../assets/remedy-images/30-day-wellness.jpg")
  default: fallbackImage,
};

export const REMEDY_IMAGES = {
  // 1. 28-Day Complete Hair Reset
  "28-Day Complete Hair Reset": images["28-day"],
  
  // 2. 21-Day Hydration Intensive
  "21-Day Hydration Intensive": images["21-day-hydration"],
  
  // 3. 14-Day Growth Accelerator
  "14-Day Growth Accelerator": images["14-day-growth"],
  
  // 4. 7-Day Damage Repair Intensive
  "7-Day Damage Repair Intensive": images["7-day-repair"],
  
  // 5. 10-Day Scalp Reset Detox
  "10-Day Scalp Reset Detox": images["10-day-detox"],
  
  // 6. 14-Day Brilliant Shine Treatment
  "14-Day Brilliant Shine Treatment": images["14-day-shine"],
  
  // 7. 21-Day Curl Revival
  "21-Day Curl Revival": images["21-day-curl"],
  
  // 8. 3-Day Hair Emergency SOS
  "3-Day Hair Emergency SOS": images["3-day-emergency"],
  
  // 9. 14-Day Frizz-Free Transformation
  "14-Day Frizz-Free Transformation": images["14-day-frizz"],
  
  // 10. 30-Day Hair & Scalp Wellness Journey
  "30-Day Hair & Scalp Wellness Journey": images["30-day-wellness"],
  
  // Default fallback
  default: images.default
};

// Helper function to get image for a remedy
export const getRemedyImage = (title: string): any => {
  return REMEDY_IMAGES[title as keyof typeof REMEDY_IMAGES] || REMEDY_IMAGES.default;
};

// Category-based hero images (optional - uses same images as remedies)
export const CATEGORY_IMAGES = {
  growth: images["14-day-growth"],
  moisture: images["21-day-hydration"],
  repair: images["7-day-repair"],
  detox: images["10-day-detox"],
  shine: images["14-day-shine"],
  curl: images["21-day-curl"],
  smoothing: images["14-day-frizz"],
  wellness: images["30-day-wellness"],
  default: images.default
};

// Get image by category
export const getCategoryImage = (category: string): any => {
  return CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES] || CATEGORY_IMAGES.default;
};

