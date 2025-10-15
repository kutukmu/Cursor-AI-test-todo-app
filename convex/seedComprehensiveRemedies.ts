import { mutation } from "./_generated/server";

// Comprehensive hair remedies based on popular, evidence-based treatments
export const seedComprehensiveRemedies = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing remedies first (optional - comment out if you want to keep existing)
    const existing = await ctx.db.query("remedies").collect();
    for (const remedy of existing) {
      await ctx.db.delete(remedy._id);
    }

    const remedies = [
      // 1. THE ULTIMATE 28-DAY HAIR TRANSFORMATION
      {
        title: "28-Day Complete Hair Reset",
        steps: 28,
        duration: "10-15 mins daily",
        category: "growth",
        gradientStart: "#7FA387",
        gradientEnd: "#5D8267",
        description: "A comprehensive month-long journey to transform your hair from the inside out. This science-backed program combines ancient wisdom with modern techniques to address growth, strength, moisture, and shine. Perfect for anyone ready to commit to their best hair ever.",
        ingredients: [
          "Rosemary Oil",
          "Castor Oil",
          "Coconut Oil",
          "Aloe Vera Gel",
          "Rice Water",
          "Biotin Supplement",
          "Silk Pillowcase"
        ],
        instructions: [
          "Week 1: Focus on scalp health and detox",
          "Week 2: Deep moisture and protein balance",
          "Week 3: Growth stimulation and strengthening",
          "Week 4: Maintenance and protective styling"
        ],
        dailyTasks: [
          // Week 1: Detox & Foundation
          ["Gentle scalp massage with rosemary oil", "Clarifying shampoo (remove buildup)", "Set growth intentions journal"],
          ["Scalp exfoliation scrub", "Deep conditioning mask", "Take progress photos"],
          ["Warm oil treatment (coconut + castor)", "Protective overnight braid", "Drink 8 glasses water"],
          ["Rice water rinse", "Air dry naturally", "Vitamins + biotin supplement"],
          ["Scalp acupressure (5 mins)", "Leave-in conditioner", "Silk pillowcase night"],
          ["Aloe vera scalp treatment", "Gentle detangling session", "Meditation for hair health"],
          ["Rest day: Protective style", "Scalp moisturizer only", "Weekly measurements"],
          
          // Week 2: Moisture & Repair
          ["Avocado hair mask", "Steam treatment (10 mins)", "Trim split ends"],
          ["Coconut milk deep soak", "Cold water final rinse", "Protein-rich breakfast"],
          ["Banana + honey mask", "Gentle brush massage", "Hydration tracking"],
          ["Egg protein treatment", "Cool blow dry", "Collagen supplement"],
          ["Yogurt + lemon scalp mask", "Natural oils seal", "Stress relief exercise"],
          ["Shea butter moisture lock", "Protective bun style", "Sleep mask routine"],
          ["Rest day: Silk scarf wrap", "Light oil massage", "Progress photos"],
          
          // Week 3: Growth Activation
          ["Rosemary + peppermint oil massage", "Inversion method (5 mins)", "Growth affirmations"],
          ["Castor oil eyebrow to scalp", "Scalp tapping technique", "Green tea rinse"],
          ["Onion juice treatment", "Ginger scalp stimulation", "Iron-rich meal"],
          ["Fenugreek seed paste", "Hot towel wrap", "Biotin focus"],
          ["Amla powder treatment", "Brahmi oil massage", "Yoga for circulation"],
          ["Black seed oil application", "Derma roller session (optional)", "Zinc supplement"],
          ["Rest day: Protective style", "Light maintenance", "Measure hair growth"],
          
          // Week 4: Strengthen & Maintain
          ["Rice water + tea rinse", "Protein treatment", "Celebration ritual"],
          ["Keratin mask DIY", "Silk press or blow out", "Style photoshoot"],
          ["Henna strengthening treatment", "Color gloss (optional)", "Hair goals review"],
          ["Apple cider vinegar rinse", "Balance pH", "Healthy fats meal"],
          ["Mayonnaise deep condition", "Shine serum", "Confidence affirmations"],
          ["Hibiscus flower treatment", "Natural curl definition", "Community share"],
          ["Final care routine", "Protective styling", "Maintenance plan setup"],
          ["Celebration day", "Final photos", "Next goals setting"]
        ],
        dailyInstructions: [
          // Week 1: Detox & Foundation
          [
            "Warm 2-3 tbsp rosemary oil. Massage scalp in circular motions for 10 mins. This stimulates blood flow and prepares follicles for growth.",
            "Use a clarifying shampoo to remove all product buildup. Focus on scalp, not ends. This creates a clean slate for your transformation journey.",
            "Write down your hair goals and why they matter to you. Set clear intentions. Visualization is scientifically proven to improve outcomes."
          ],
          [
            "Mix 2 tbsp brown sugar with your conditioner. Gently scrub scalp in sections. Rinse thoroughly. Exfoliation removes dead skin cells blocking follicles.",
            "Apply a protein-rich deep conditioner. Cover with plastic cap and sit under warm towel for 20 mins. Protein rebuilds damaged hair structure.",
            "Take clear photos from front, back, and both sides. Measure hair length from root to tip at your longest point. You'll thank yourself later!"
          ],
          [
            "Mix equal parts coconut and castor oil. Warm and apply generously to scalp and hair. The combination penetrates deeply to nourish from within.",
            "Braid hair loosely before bed. Sleep on silk pillowcase. This protects hair and prevents breakage while you sleep.",
            "Track your water intake today. Aim for 8 glasses minimum. Hair is 25% water - hydration is crucial for growth and strength."
          ],
          [
            "Rinse hair with rice water (fermented for 24-48 hours). Leave for 10 mins, then rinse. Rice water contains inositol which repairs and strengthens.",
            "Let hair air dry completely. No heat today! Air drying preserves moisture and prevents heat damage. Be patient with your hair.",
            "Take your biotin supplement with breakfast. Biotin (B7) is essential for keratin production - the protein that makes up your hair."
          ],
          [
            "Spend 5 minutes pressing acupressure points on your scalp: temples, crown, base of skull. This ancient technique improves circulation and energy flow.",
            "Apply a lightweight leave-in conditioner focusing on mid-lengths to ends. Don't overload roots. This maintains moisture without weighing hair down.",
            "Switch to your silk pillowcase tonight. Cotton absorbs moisture and causes friction. Silk reduces breakage by up to 40%."
          ],
          [
            "Extract fresh aloe vera gel (or use 100% pure). Apply to scalp and massage gently. Aloe soothes inflammation and provides vitamins A, C, E.",
            "Use a wide-tooth comb to gently detangle from ends up to roots. Never brush wet hair! Work in sections and be patient to avoid breakage.",
            "Spend 10 minutes meditating on hair health. Stress releases cortisol which blocks growth. Meditation lowers cortisol significantly."
          ],
          [
            "Style hair in a protective style (braids, bun, twists). Let your hair rest! Constant manipulation causes breakage.",
            "Apply a light oil or butter to scalp only - no heavy products today. Your scalp needs to breathe.",
            "Measure your hair again and compare with Day 2. Take notes on how your hair feels - softer? Stronger? Document your journey."
          ],
          
          // Week 2: Moisture & Repair (Days 8-14)
          [
            "Mash 1 ripe avocado with 1 tbsp honey and 1 tbsp olive oil. Apply as mask for 30 mins. Avocado provides healthy fats that deeply moisturize.",
            "Boil water, pour in bowl. Lean over with towel creating a tent. Steam for 10 mins. This opens cuticles allowing deeper product penetration.",
            "Use sharp hair scissors to trim any visible split ends. Don't be afraid! Trimming prevents splits from traveling up the hair shaft."
          ],
          [
            "Mix 1 can coconut milk with 2 tbsp honey. Soak hair completely for 20 mins. Coconut milk penetrates the hair shaft better than most conditioners.",
            "After washing, rinse with the coldest water you can tolerate for 30 seconds. Cold water seals cuticles creating incredible shine.",
            "Eat a protein-rich breakfast: eggs, Greek yogurt, or protein shake. Hair is made of protein (keratin) - you need protein to build strong hair."
          ],
          [
            "Mash 1 banana with 2 tbsp yogurt and 1 tbsp honey. Apply for 20 mins. Banana provides potassium and natural oils for elasticity.",
            "Use a boar bristle brush on dry hair before bed. Brush from roots to ends to distribute natural oils. This creates natural shine.",
            "Download a water tracking app or use a marked bottle. Dehydration makes hair brittle. Aim for half your body weight in ounces of water."
          ],
          [
            "Beat 2 eggs and apply to damp hair. Leave 20 mins, rinse with COOL water (hot scrambles eggs!). Eggs provide protein and biotin.",
            "Blow dry on COOL setting only if needed. Heat damages protein bonds. If you must use heat, always use a heat protectant spray first.",
            "Take a collagen supplement with Vitamin C (improves absorption). Collagen provides amino acids that strengthen hair from within."
          ],
          [
            "Mix 3 tbsp yogurt with juice of half a lemon. Massage into scalp for 15 mins. Lactic acid exfoliates, probiotics nourish scalp microbiome.",
            "Apply argan oil or jojoba oil to ends while hair is damp. These oils most closely mimic your natural sebum, sealing in moisture perfectly.",
            "Do 20 minutes of stress-relieving activity: yoga, walk, dance. Chronic stress causes telogen effluvium (excessive shedding)."
          ],
          [
            "Warm shea butter until soft. Apply to hair in sections from mid-shaft to ends. Shea butter locks in moisture for days.",
            "Style in a low bun or loose braid. Tight styles cause traction alopecia. Always prioritize hair health over trendy tight styles.",
            "Create an evening routine: herbal tea, face mask, deep breathing. Better sleep = better hair growth. Hair grows during deep sleep cycles."
          ],
          [
            "Wrap hair in silk scarf or use silk cap. Keep protective style from yesterday. Rest days are crucial for length retention.",
            "Apply only a light oil to scalp, gently massaging. Your hair has plenty of moisture from this week's treatments.",
            "Take progress photos comparing to Day 1 and Day 8. You should notice softer texture, more shine, and less breakage."
          ],
          
          // Week 3: Growth Activation (Days 15-21)
          [
            "Mix 5 drops rosemary + 5 drops peppermint essential oil with 2 tbsp carrier oil. Massage scalp vigorously for 10 mins. Both oils are clinically proven to stimulate growth.",
            "Do inversion method: hang head upside down for 4 minutes. This floods scalp with blood, delivering nutrients and oxygen to follicles.",
            "Repeat growth affirmations: 'My hair grows strong and healthy. I see new growth every day.' Affirmations activate neuroplasticity for goal achievement."
          ],
          [
            "Apply castor oil to hairline, eyebrows, and entire scalp. The ricinoleic acid in castor oil improves blood flow and awakens dormant follicles.",
            "Gently tap scalp all over with fingertips for 5 minutes. This tapping stimulates nerve endings and increases circulation dramatically.",
            "Brew and drink green tea. Green tea contains EGCG which blocks DHT (hormone that causes hair loss) and promotes growth."
          ],
          [
            "Blend 1 onion, strain juice, mix with 1 tbsp castor oil. Apply to scalp for 30 mins. Onion juice is extremely high in sulfur which boosts collagen production.",
            "Grate fresh ginger, squeeze juice, mix with coconut oil. Massage into scalp. Ginger increases scalp circulation and has antimicrobial properties.",
            "Eat an iron-rich meal: red meat, spinach, lentils with vitamin C source. Iron deficiency is the #2 cause of hair loss in women."
          ],
          [
            "Soak 2 tbsp fenugreek seeds overnight. Blend into paste with water. Apply to scalp and hair for 30 mins. Fenugreek contains hormone precursors that stimulate follicles.",
            "Wrap hot towel around head over the fenugreek mask. Heat increases absorption and effectiveness of active ingredients.",
            "Focus meals on biotin-rich foods: eggs, almonds, sweet potatoes. Aim for 30-35 mcg biotin daily from food sources."
          ],
          [
            "Mix 2 tbsp amla powder with warm water into paste. Apply to scalp. Amla is highest source of Vitamin C which is crucial for collagen synthesis.",
            "Massage brahmi oil into scalp using firm pressure. Brahmi is an adaptogen that reduces stress while nourishing hair follicles.",
            "Do 15 minutes of yoga poses that invert head: downward dog, shoulder stand, legs-up-wall. This delivers fresh blood to scalp."
          ],
          [
            "Apply black seed oil (also called black cumin) to scalp. This oil contains thymoquinone which is anti-inflammatory and growth-promoting.",
            "If you have a derma roller (0.5mm), use on scalp. Roll in 4 directions, 5 passes each. This creates micro-channels for product absorption and triggers healing response.",
            "Take zinc supplement (15-25mg). Zinc deficiency causes hair shedding. Don't exceed 40mg/day."
          ],
          [
            "Rest day - keep hair in protective style from yesterday. Over-manipulation can cancel out growth efforts.",
            "Light scalp massage with fingertips only - no products today. Let your scalp rest and absorb nutrients from this week.",
            "Measure hair length from root to tip. You should see 1-2mm of new growth minimum. Take notes on density, especially around hairline."
          ],
          
          // Week 4: Strengthen & Maintain (Days 22-28)
          [
            "Rinse hair with fermented rice water + 2 green tea bags. Leave 15 mins. Both ingredients strengthen and add shine.",
            "Apply a protein treatment (egg, gelatin, or store-bought). Hair needs protein to stay strong during growth phase.",
            "Create a celebration ritual: light candle, play favorite music, take bath. Honor your commitment to this journey. You've earned it!"
          ],
          [
            "Make DIY keratin mask: 1 tbsp gelatin in ¼ cup warm water + 1 tbsp apple cider vinegar. Apply for 20 mins. Gelatin contains keratin building blocks.",
            "If desired, blow dry straight or press hair to see length better. Use heat protectant! This is your reveal moment.",
            "Take professional-quality photos from all angles. Document your transformation. Post on social media if comfortable - inspire others!"
          ],
          [
            "Apply henna treatment following package directions. Henna strengthens protein bonds and adds beautiful shine and dimension.",
            "Optional: Add a color gloss or toner if desired. After a month of care, your hair can handle gentle color.",
            "Review your Day 1 goals. How many did you achieve? What surprised you? What will you continue doing?"
          ],
          [
            "Mix 2 tbsp apple cider vinegar with 1 cup water. Final rinse to balance pH and seal cuticles. Your hair's pH should be 4.5-5.5.",
            "Apply a pH-balanced leave-in conditioner. Maintain the balance you've created.",
            "Cook a meal rich in healthy fats: salmon, avocado, nuts. These omega-3 fats keep hair supple and strong."
          ],
          [
            "Apply mayonnaise (yes, regular mayo!) as deep conditioner for 30 mins. Mayo contains eggs and oils - perfect final moisture treatment.",
            "Apply a silicone-free shine serum to dry hair. Enjoy the gloss and movement you've created.",
            "Write affirmations about your confidence. Your hair journey has taught you discipline - apply this to other life goals."
          ],
          [
            "Apply a hibiscus flower treatment: steep flowers in hot water, blend, apply paste to hair. Hibiscus promotes elasticity and prevents premature graying.",
            "Style hair in its natural texture. Embrace your curls, waves, or straight hair. Confidence is the best hairstyle.",
            "Share your journey: post before/after photos, write a review, tell a friend. Your success can inspire others to start their journey."
          ],
          [
            "Document your final routine: which products worked best, which steps you'll keep, how often you'll repeat treatments.",
            "Create a protective style that will last several days. You've worked hard - preserve your results.",
            "Write your maintenance plan: Weekly deep condition, monthly protein treatment, daily scalp massage. Schedule these in your calendar."
          ],
          [
            "CELEBRATION DAY! No treatments today. Just enjoy your hair. Style it special, take pictures, go out and show it off!",
            "Take your final progress photos. Measure length. Compare to Day 1. Calculate your growth rate (average is 0.5 inches/month).",
            "Set your next goals: Continue current routine? Try a different challenge? Focus on length vs. thickness vs. health? You're in control now!"
          ]
        ],
        createdAt: Date.now(),
      },

      // 2. 21-DAY MOISTURE REVIVAL
      {
        title: "21-Day Hydration Intensive",
        steps: 21,
        duration: "15 mins daily",
        category: "moisture",
        gradientStart: "#6B9F7E",
        gradientEnd: "#4A7C5F",
        description: "Transform dry, brittle hair into soft, hydrated locks. This intensive moisture program uses natural humectants and emollients to restore your hair's water balance. Say goodbye to frizz and hello to touchably soft hair.",
        ingredients: [
          "Aloe Vera Gel",
          "Coconut Milk",
          "Honey",
          "Glycerin",
          "Avocado",
          "Argan Oil",
          "Hyaluronic Acid Serum"
        ],
        instructions: [
          "Week 1: Hydration foundation",
          "Week 2: Deep moisture lock",
          "Week 3: Maintenance and protection"
        ],
        dailyTasks: [
          // Week 1
          ["Aloe vera gel scalp treatment", "Water spritz (hourly)", "Humidifier setup"],
          ["Coconut milk hair soak", "Glycerin spray mix", "Drink coconut water"],
          ["Honey + olive oil mask", "Steam cap treatment", "Cucumber hydration"],
          ["Avocado deep conditioner", "Cool water rinse", "Hydrating face mask too"],
          ["Watermelon seed oil treatment", "Satin bonnet overnight", "Evening primrose supplement"],
          ["Flaxseed gel application", "Air dry method", "Omega-3 rich meal"],
          ["Weekly deep condition", "Progress check", "Moisture level test"],
          
          // Week 2
          ["Banana + milk smoothie mask", "Baggy method overnight", "Water intake boost"],
          ["Mayonnaise moisture treatment", "Warm towel wrap", "Collagen drink"],
          ["Yogurt + honey mask", "Leave-in conditioner layer", "Humidity embrace"],
          ["Marshmallow root tea rinse", "Shea butter seal", "Herbal tea hydration"],
          ["Cucumber + aloe blend", "Mist throughout day", "Face steaming"],
          ["Rose water + glycerin spray", "Protective braids", "Sleep with humidifier"],
          ["Intensive deep condition", "Hot oil treatment", "Hair spa day"],
          
          // Week 3
          ["Maintenance moisture routine", "Light oils only", "Daily misting"],
          ["Refresh with water", "Curl cream application", "Style definition"],
          ["Mid-week deep condition", "Protein-moisture balance", "Trim if needed"],
          ["Aloe + rose water spray", "Twist out style", "Maintain routine"],
          ["Light conditioning treatment", "Protective style prep", "Seal ends"],
          ["Weekly mask routine", "Progress photos", "Compare to day 1"],
          ["Final transformation", "Style celebration", "Maintenance plan"]
        ],
        dailyInstructions: [
          // Week 1: Hydration Foundation
          ["Apply fresh aloe vera gel (or 100% pure) directly to scalp and roots. Massage gently for 5 mins. Aloe contains polysaccharides that bind moisture to hair.", "Set timer to spritz hair with water every hour while awake. Dry hair can't absorb products - keep it damp throughout the day.", "Place humidifier in bedroom running at 45-55% humidity. Dry air steals moisture from hair overnight. This is a game-changer for dry climates."],
          ["Mix 1 can full-fat coconut milk (not lite!) with 1 tbsp honey. Saturate hair completely and sit for 30 mins. Coconut milk penetrates shaft better than most conditioners.", "Mix 2 tbsp vegetable glycerin with 8 oz water in spray bottle. Mist hair 3-4 times today. Glycerin is a humectant that pulls moisture from air into hair.", "Drink fresh coconut water (not from concentrate). Rich in electrolytes and minerals that hydrate from inside out. Hair is 10-13% water."],
          ["Warm 3 tbsp honey with 2 tbsp olive oil until easily stirrable. Apply to hair for 20 mins. Honey is hygroscopic - attracts and retains moisture molecules.", "Wet towel, microwave 20 seconds, wrap around hair over the mask. Heat opens cuticles allowing deeper penetration of moisture.", "Eat a cucumber with lunch (or make cucumber water). 95% water content helps systemic hydration. Well-hydrated bodies = well-hydrated hair."],
          ["Mash 1 ripe avocado until creamy smooth. Add 1 tbsp coconut oil. Apply generously for 30 mins. Avocado provides fatty acids that restore lipid layer.", "After washing out mask, do final rinse with coldest water you can stand for 30 seconds. Cold seals cuticles locking moisture inside.", "Do a hydrating face mask too while treating hair. You're dedicating today to moisture! Skin and hair have similar needs."],
          ["Apply watermelon seed oil to damp hair (not dripping wet). This lightweight oil has high linoleic acid perfect for fine/dry hair that hates heavy oils.", "Wrap hair in satin or silk bonnet before bed. Cotton absorbs up to 30% of hair's moisture overnight. This one change prevents so much dryness.", "Take evening primrose oil supplement (1300mg). Contains GLA fatty acid that improves hair moisture retention from within."],
          ["Make flaxseed gel: boil 2 tbsp flaxseeds in 2 cups water until gel forms. Strain. Apply to hair. This natural gel defines while moisturizing without harsh chemicals.", "Let hair air dry completely today. Heat evaporates moisture. Pat gently with t-shirt, don't rub. Be patient - healthy drying is slow drying.", "Cook salmon or take omega-3 supplement. These essential fats build healthy cell membranes that retain moisture better."],
          ["Do your most intensive deep conditioning treatment. Layer: leave-in + deep conditioner + oil on top to seal. Sit under warm cap for 45 mins.", "Check hair's moisture: stretch a strand. Should stretch 40-50% without breaking. If it snaps immediately, you need more moisture. If it stretches forever, add protein next week.", "Test moisture retention: wash and dry a section. Check how it feels after 4 hours vs. Day 1. You should notice it staying softer longer."],
          
          // Week 2: Deep Moisture Lock
          ["Blend 1 banana + ½ cup milk until completely smooth (no chunks!). Apply for 20 mins. Banana provides potassium and moisture. Milk has lactic acid and proteins.", "Try 'baggy method': apply leave-in, put hair in plastic bag/cap overnight. Traps moisture and body heat for deep penetration. Wake up to incredible softness!", "Increase water intake to 10 glasses today. As you increase topical moisture, internal hydration must keep up. Track it with an app if needed."],
          ["Apply regular mayonnaise (full fat) as deep conditioner for 30 mins. Mayo is eggs + oil + vinegar - perfect moisture + protein combo your hair needs.", "Warm a damp towel in microwave, wrap over mayo treatment. The heat helps oils penetrate deeper while protein strengthens from within.", "Make a collagen drink (powder in juice/smoothie). Collagen provides amino acids that build hair's structure and moisture-retaining ability."],
          ["Mix 4 tbsp plain yogurt with 2 tbsp honey. Apply for 25 mins. Lactic acid gently exfoliates scalp while proteins and moisture penetrate hair shaft.", "Apply a rich leave-in conditioner to soaking wet hair, then another layer of oil on top. Layer products while wet for maximum moisture retention.", "Don't fight the humidity today! Humid weather can actually help dry hair. Embrace it - use a light gel or cream to control frizz while keeping moisture."],
          ["Brew strong marshmallow root tea (steep 20 mins). Let cool, use as final rinse. Marshmallow root contains mucilage that coats hair providing slip and moisture.", "While hair is damp, apply shea butter to sections. Work through thoroughly. Shea butter seals moisture better than any other natural product.", "Drink herbal tea throughout day: nettle, horsetail, oatstraw. These are silica-rich herbs that strengthen hair and improve moisture retention."],
          ["Blend ½ cucumber with 3 tbsp aloe vera gel. Apply this cooling mask for 20 mins. Perfect for summer or if scalp feels hot/irritated from products.", "Keep a mini spray bottle and mist hair every 2-3 hours. Hair loses moisture constantly - regular misting maintains hydration between washes.", "Do a face steam (add herbs if you want). The steam also hydrates your hair! Multi-task your self-care."],
          ["Mix 2 oz rose water + 1 oz glycerin + 6 oz water in spray bottle. This is your maintenance spray. Mist daily from now on. Rose water soothes, glycerin holds moisture.", "Braid or twist hair for protective style. Constant manipulation dries out hair. Let it rest in a style for 3-5 days to maintain moisture.", "Run humidifier all night again. Your hair should feel noticeably different in the morning - softer, more pliable, less prone to snapping."],
          ["Today is hair spa day! Layer treatments: clarifying shampoo (just scalp), deep condition (entire hair), hot oil treatment (ends), leave-in + seal with butter.", "Get a scalp massage or use a vibrating massager. Stimulates oil glands to produce natural sebum which is your hair's best moisturizer.", "Schedule 'you time' - bath, face mask, good book. Stress dries out hair (literally - cortisol affects moisture levels). Relax for your hair's sake."],
          
          // Week 3: Maintenance & Protection
          ["Establish your maintenance routine: co-wash or gentle shampoo, leave-in conditioner, light oil. Your hair should need less now - it's retaining moisture better.", "Use only light oils today: argan, grapeseed, or jojoba. Heavy oils can cause buildup now that your hair is well-moisturized.", "Continue daily misting with your rose water/glycerin spray. This is your new normal. Dry hair between washes = moisture loss."],
          ["Refresh hairstyle with just water and a tiny amount of curl cream. Your hair should reactivate easily now because it's properly hydrated.", "Today, focus on styling. With properly moisturized hair, styles hold better and look shinier. Try that style you've been wanting to do!", "Practice your wash day routine timing. With good moisture, you can extend time between washes to 7-10 days if desired."],
          ["Mid-week moisture boost: quick deep condition for 20 mins. Not as intensive as before, just maintenance.", "Check protein-moisture balance: hair should feel soft but have strength/structure. If too soft/mushy: add protein. If breaking: add moisture.", "Trim any split ends you see. Now that hair is hydrated, the damage is more obvious. Fresh ends retain moisture better."],
          ["Mix aloe vera gel + rose water in spray bottle. This is your go-to refresher. Lighter than the glycerin spray for between washes.", "Try a twist-out or braid-out style. Your hair has the moisture to create definition now. Enjoy styling your transformed hair!", "Stick to your maintenance schedule. Moisture maintenance is about consistency, not intensity."],
          ["Light conditioning treatment today: a thin layer of regular conditioner for 10 mins. Your hair doesn't need the heavy treatments anymore.", "Prep for protective style if desired: cornrows, box braids, twists. Well-moisturized hair braids easier and looks better in styles.", "Seal your ends with a tiny bit of castor oil or shea butter. Ends lose moisture fastest - protect them daily."],
          ["Do your weekly deep conditioning mask. Same routine as always but notice how much better your hair absorbs and retains it now.", "Take before/after photos in same lighting. Your hair should look visibly shinier, feel softer, have more movement.", "Compare to Day 1: How much difference in softness? Elasticity? Shine? Frizz level? Document your success!"],
          ["Style your hair however you love it. Today is about celebrating your transformation and maintaining your new moisture levels.", "Create your permanent moisture maintenance schedule: Weekly deep condition, daily misting, monthly protein treatment, protective styling.", "Share your journey! Your success might inspire someone else who's struggling with dry hair. Post photos, write a review, tell friends about what worked."]
        ],
        createdAt: Date.now() - 1000,
      },

      // 3. 14-DAY HAIR GROWTH SPRINT
      {
        title: "14-Day Growth Accelerator",
        steps: 14,
        duration: "20 mins daily",
        category: "growth",
        gradientStart: "#2A5C4E",
        gradientEnd: "#1A3D32",
        description: "Scientifically formulated to maximize hair growth in just two weeks. Using proven growth stimulants like rosemary oil, castor oil, and scalp massage techniques, this program can help you see visible length retention and new growth.",
        ingredients: [
          "Rosemary Essential Oil",
          "Peppermint Oil",
          "Castor Oil",
          "Biotin Capsules",
          "Caffeine Solution",
          "Saw Palmetto Extract"
        ],
        instructions: [
          "Week 1: Scalp activation",
          "Week 2: Growth maintenance"
        ],
        dailyTasks: [
          // Week 1
          ["Rosemary oil scalp massage (10 mins)", "Inversion method", "Biotin supplement"],
          ["Peppermint oil stimulation", "Scalp brushing", "Protein breakfast"],
          ["Castor oil treatment", "Hot towel wrap", "Hair growth meditation"],
          ["Caffeine scalp rinse", "Tapping massage", "Green tea consumption"],
          ["Onion juice application", "Circulation exercises", "Iron supplement"],
          ["Rice water protein rinse", "Scalp acupressure", "Collagen peptides"],
          ["Growth oil blend massage", "Protective style", "Weekly measurements"],
          
          // Week 2
          ["Continue rosemary routine", "Increase massage time", "Progress photos"],
          ["Garlic oil treatment", "Vitamin E capsule", "Nutrient-dense meal"],
          ["Bhringraj oil massage", "Yoga headstand", "Meditation"],
          ["Neem oil scalp health", "Detox tea", "Stress reduction"],
          ["Amla powder treatment", "Scalp stimulation", "Biotin focus"],
          ["Growth serum application", "Protective styling", "Self-care ritual"],
          ["Final measurements", "Compare progress", "Plan next steps"]
        ],
        dailyInstructions: [
          // Week 1: Scalp Activation
          ["Mix 5 drops rosemary essential oil with 2 tbsp carrier oil (jojoba/coconut). Massage scalp using firm circular motions for 10 minutes. Rosemary oil is clinically proven as effective as 2% minoxidil for hair growth.", "Flip head upside down for 4 minutes. This inversion increases blood flow to scalp, delivering oxygen and nutrients to follicles. Do it carefully - sit down if dizzy!", "Take biotin supplement (2500-5000mcg) with breakfast. Biotin is essential for keratin production. You'll also notice stronger nails!"],
          ["Add 3 drops peppermint oil to 2 tbsp carrier oil. Massage into scalp - you'll feel tingling! This is increased blood flow. Peppermint has one of the strongest growth-promoting effects.", "Use a soft bristle brush or scalp massager. Brush from hairline back in strokes for 5 mins. This stimulates follicles mechanically and distributes natural oils.", "Eat a protein-rich breakfast: 2 eggs + turkey sausage OR Greek yogurt with nuts. Hair is 95% protein - you can't grow hair without adequate protein intake (50-70g daily)."],
          ["Apply Jamaican black castor oil (JBCO) to scalp, especially thinning areas. JBCO is thicker and more potent than regular castor oil. The ricinoleic acid penetrates deep.", "Soak towel in hot water, wring out, wrap around head for 10 minutes. Heat dilates blood vessels increasing nutrient delivery to follicles.", "Meditate for 10 minutes visualizing your hair at desired length. Visualization activates the reticular activating system in your brain, priming you to take growth-supporting actions."],
          ["Brew strong black coffee or espresso. Let cool. Pour over scalp and massage for 5 minutes. Caffeine blocks DHT (hormone that shrinks follicles) and extends growth phase of hair cycle.", "Tap all over scalp with fingertips for 5 minutes. This tapping technique from traditional Chinese medicine stimulates acupressure points and increases micro-circulation.", "Drink 2-3 cups of green tea today. Green tea contains EGCG which reduces DHT levels and promotes hair growth. Both drinking AND applying topically helps!"],
          ["Juice 1 red onion, strain through cheesecloth. Mix with 1 tbsp castor oil to mask smell. Apply to scalp 30 mins. Onion juice is extremely high in sulfur which boosts collagen for hair growth.", "Do 20 jumping jacks, 10 burpees, or 5-min run. Cardiovascular exercise increases overall circulation including to scalp. Working up a sweat delivers more nutrients to roots.", "Take iron supplement (if deficient - get labs first!) with vitamin C for absorption. Iron deficiency is a major cause of hair loss, especially in women. Don't mega-dose without blood work."],
          ["Rinse hair with fermented rice water (ferment 24-48 hours). Leave on 10 minutes. Rice water contains inositol which penetrates hair shaft and remains even after rinsing, promoting growth.", "Press these acupressure points for 30 seconds each: temples, crown point, base of skull, behind ears, points along hairline. This activates meridians associated with hair health in TCM.", "Take collagen peptides (10-20g). Collagen provides amino acids (glycine, proline) that build keratin. It also improves scalp health as skin and hair have similar structure."],
          ["Create growth oil blend: 2 tbsp castor oil + 5 drops rosemary + 5 drops peppermint + 3 drops lavender. Massage thoroughly into scalp. This is your powerhouse combo!", "Put hair in a protective low-manipulation style (braids, twists, bun). Growth happens when you leave hair alone! Constant styling breaks off the new growth.", "Measure hair length at 4 points: crown, both temples, nape. Take clear photos. Record in notebook. You need baseline to track 2-week progress!"],
          
          // Week 2: Growth Maintenance
          ["Continue rosemary oil massage routine but increase to 15 minutes. Your scalp is conditioned now and can handle longer stimulation. Focus on problem areas.", "Massage with more pressure than Week 1. Really work the scalp - it should feel energized after! Blood flow = growth.", "Take 'Week 2' progress photos. You might see baby hairs or increased density already!"],
          ["Crush 2-3 garlic cloves in 2 tbsp coconut oil. Heat gently for 2 minutes (don't burn). Cool, strain, apply to scalp 30 mins. Garlic contains selenium and sulfur for growth.", "Take vitamin E capsule (400 IU). Vitamin E is an antioxidant that reduces oxidative stress on follicles. You can also pierce capsule and apply oil to scalp.", "Cook a nutrient-dense meal with these growth foods: salmon (omega-3), spinach (iron), sweet potato (beta carotene), avocado (healthy fats). Feed your follicles from inside!"],
          ["Apply Bhringraj oil (known as 'king of herbs' for hair in Ayurveda). Massage for 15 mins. This herb has been used for 5000+ years to prevent hair loss and promote growth.", "Try a yoga headstand or legs-up-wall pose for 5 minutes. Advanced version of inversion method. Even more blood rushes to scalp. Don't force it if uncomfortable - safety first!", "Meditate focusing on gratitude for your hair journey. Stress is a major growth inhibitor. Meditation lowers cortisol (stress hormone) which in high amounts causes telogen effluvium (shedding)."],
          ["Apply neem oil to scalp. Neem is antibacterial and anti-inflammatory. A healthy, inflammation-free scalp is essential for optimal growth. Many growth issues are actually scalp health issues.", "Brew detox tea: dandelion root + burdock root + nettle. These herbs support liver function which affects hormone balance. Hormonal imbalances disrupt hair growth cycles.", "Do stress-reduction activity: walk in nature, call a friend, watch comedy. Chronic stress literally shrinks hair follicles. Protecting mental health protects hair growth."],
          ["Mix 2 tbsp amla powder (Indian gooseberry) with water into paste. Apply to scalp. Amla is the highest natural source of vitamin C which is crucial for collagen synthesis.", "Stimulate scalp by running fingers through hair and tugging gently at roots (doesn't hurt). This signals follicles to strengthen their grip and promotes growth.", "Focus on biotin-rich foods today: eggs, almonds, sweet potatoes, salmon. While supplements help, food-based nutrients are more bioavailable."],
          ["Apply growth serum (can be store-bought or your DIY blend from Day 7). Massage thoroughly. Consistency is more important than intensity for growth.", "Style in protective style for next few days. The grand finale is Day 14 - let your hair rest until then to maximize length retention.", "Self-care ritual: face mask, foot soak, meditation. Growth isn't just about stimulation - rest and recovery matter too. Your body grows hair during relaxation, not stress."],
          ["RESULTS DAY! Measure hair at all 4 points again. Compare to Day 1 measurements. Average growth is 0.35mm per day (4.9mm in 14 days). You should see 3-5mm!", "Take final photos in same lighting/position as Day 1. Compare photos side by side. Look for: baby hairs, increased density, less shedding, thicker ponytail.", "Plan next steps: Continue for another 14 days? Switch to maintenance (2-3x/week)? Try a different program? Document what worked best for you so you can repeat results!"]
        ],
        createdAt: Date.now() - 2000,
      },

      // 4. 7-DAY REPAIR RESCUE
      {
        title: "7-Day Damage Repair Intensive",
        steps: 7,
        duration: "25 mins daily",
        category: "repair",
        gradientStart: "#4A7C6F",
        gradientEnd: "#35625A",
        description: "Emergency repair for heat-damaged, chemically treated, or over-processed hair. This week-long intensive uses protein and moisture balance to rebuild hair structure and restore elasticity. See dramatic improvement in just one week.",
        ingredients: [
          "Keratin Treatment",
          "Olaplex Dupe (DIY)",
          "Egg Protein",
          "Coconut Oil",
          "Argan Oil",
          "Silk Amino Acids"
        ],
        instructions: [
          "Daily protein-moisture balance",
          "Avoid heat styling",
          "Focus on bond repair"
        ],
        dailyTasks: [
          ["Protein treatment (egg + yogurt)", "Steam treatment", "Trim dead ends"],
          ["Keratin DIY mask", "Cold water rinse", "Air dry only"],
          ["Olaplex dupe treatment", "Bond repair focus", "Silk pillowcase"],
          ["Moisture balance day", "Deep conditioning", "Protective braids"],
          ["Protein boost (gelatin mask)", "Strengthen treatment", "No manipulation"],
          ["Moisture seal (shea butter)", "Silk wrap", "Gentle handling"],
          ["Final repair treatment", "Style revelation", "New care routine"]
        ],
        dailyInstructions: [
          ["Beat 2 eggs with 3 tbsp plain yogurt until smooth. Apply to damp hair for 20 minutes. Eggs provide keratin protein to rebuild broken bonds. Yogurt adds moisture to prevent protein overload.", "Wet a towel, microwave for 30 seconds, wrap around head with the protein treatment. Steam opens cuticles allowing protein to penetrate deeply into damaged hair shaft.", "Use sharp hair scissors to cut off any white dots (split ends). Cut 1/4 inch above the split. Trimming prevents damage from traveling up the hair shaft - essential for repair."],
          ["Mix 1 tbsp gelatin with 1/4 cup warm water, stir until dissolved. Add 1 tbsp apple cider vinegar. Apply for 15 minutes. Gelatin contains keratin building blocks for damaged hair.", "After washing out mask, do final rinse with coldest water you can tolerate for 30 seconds. Cold water seals the cuticle layer, locking in the protein treatment you just applied.", "NO HEAT this week! Air dry completely. Heat damages protein bonds - the very thing we're trying to repair. Be patient. Use t-shirt to gently squeeze water, don't rub."],
          ["DIY Olaplex: Mix 1 tsp citric acid with 3 tbsp deep conditioner + 1 tbsp coconut oil. Leave on 30 mins. This creates disulfide bonds that repair heat/chemical damage at molecular level.", "Focus on bond repair today. Hair is made of protein chains connected by bonds. Damage breaks these bonds. Today's treatment specifically rebuilds these connections for strength.", "Sleep on silk or satin pillowcase starting tonight. Cotton creates friction that breaks already-fragile damaged hair. Silk reduces breakage by 43% - critical during repair week."],
          ["Moisture balance day! Mix 1 mashed avocado + 2 tbsp honey + 1 tbsp olive oil. Apply for 30 minutes. After protein days, hair needs moisture to maintain elasticity and prevent brittleness.", "Apply thick deep conditioner, cover with plastic cap, sit under warm towel for 45 minutes. Deep conditioning after protein prevents hair from becoming stiff or straw-like.", "Braid hair loosely in 2-4 sections. Keep in protective style for next 2 days. Manipulation is the enemy of damaged hair - it breaks more easily. Let it rest!"],
          ["Mix 1 tbsp unflavored gelatin in 1/2 cup warm water. Once dissolved, apply to hair for 20 minutes. Second protein treatment to continue rebuilding structure. You should notice less breakage today.", "Apply a protein-focused treatment or leave-in. Focus on damaged areas - usually ends and around face. Strengthen what's weak before final moisture seal.", "Keep hair in yesterday's protective style. No combing, brushing, or touching! Every touch risks breakage. Your hair is rebuilding itself - give it rest to do its job."],
          ["Warm shea butter until soft (microwave 10 seconds). Apply generously to hair in sections, focusing on ends. Shea butter seals moisture and creates protective coating on damaged cuticles.", "Wrap hair completely in silk scarf or bonnet. Sleep with it wrapped. This final protection step locks in all the week's treatments and prevents any new damage.", "Handle hair like fine silk today. Detangle gently with fingers first, then wide-tooth comb from ends up. Be incredibly gentle - your hair has been through trauma and is healing."],
          ["Final treatment day! Apply your best deep conditioner + oil seal. Leave on 45 minutes. This sets your hair for the week ahead with maximum repair benefits locked in.", "Style your hair to see the transformation! You can use low heat (under 300°F) with heat protectant today. You should see: less breakage, more elasticity, shine returning, smooth texture.", "Create new care routine: Weekly protein treatment, daily moisture, no heat for 2 weeks, protective styles, silk pillowcase. Your hair is repaired but needs maintenance to stay healthy!"]
        ],
        createdAt: Date.now() - 3000,
      },

      // 5. 10-DAY SCALP DETOX
      {
        title: "10-Day Scalp Reset Detox",
        steps: 10,
        duration: "15 mins daily",
        category: "detox",
        gradientStart: "#2D5A4C",
        gradientEnd: "#1F4238",
        description: "Clear product buildup, excess oil, and dandruff with this gentle but effective scalp detox. Perfect for anyone experiencing itchiness, flaking, or oily scalp. Creates the perfect foundation for healthy hair growth.",
        ingredients: [
          "Apple Cider Vinegar",
          "Tea Tree Oil",
          "Bentonite Clay",
          "Charcoal Powder",
          "Peppermint Oil",
          "Witch Hazel"
        ],
        instructions: [
          "Clear buildup and balance pH",
          "Soothe inflammation",
          "Restore scalp microbiome"
        ],
        dailyTasks: [
          ["ACV rinse (diluted)", "Clarifying shampoo", "Scalp exfoliation"],
          ["Bentonite clay mask", "Deep cleanse", "Cool water rinse"],
          ["Tea tree oil treatment", "Anti-fungal focus", "Breathable style"],
          ["Charcoal detox mask", "Absorb excess oil", "Balance scalp"],
          ["Peppermint scalp tingle", "Stimulate circulation", "Fresh clean feeling"],
          ["Witch hazel toner", "Soothe irritation", "Reduce inflammation"],
          ["Aloe vera healing", "Moisturize scalp", "Calm sensitivity"],
          ["Neem oil treatment", "Antibacterial care", "Scalp health boost"],
          ["pH balance rinse", "Restore natural oils", "Protective style"],
          ["Maintenance routine setup", "Celebrate clean scalp", "New habits"]
        ],
        dailyInstructions: [
          ["Mix 2 tbsp apple cider vinegar with 1 cup water. Pour over scalp after shampooing, massage 3 minutes, let sit 5 minutes, rinse. ACV breaks down product buildup and balances scalp pH (should be 4.5-5.5).", "Use a clarifying shampoo to remove all silicones, oils, and product residue from scalp ONLY. Don't apply to ends - they don't need this harsh cleansing. This is deep cleaning day!", "Mix 2 tbsp brown sugar with your regular shampoo. Gently massage into scalp in circular motions for 5 minutes. Rinse thoroughly. Physical exfoliation removes dead skin cells blocking follicles."],
          ["Mix 2 tbsp bentonite clay with apple cider vinegar (not water!) until smooth paste. Apply to scalp, let dry 15-20 minutes. Clay draws out toxins, oil, and impurities like a magnet.", "Focus on deep cleansing today. Your scalp should feel squeaky clean after rinsing the clay. If it feels too tight, apply a light oil just to scalp (not hair) after.", "Rinse with cool water for final rinse. Cool water closes pores on scalp, preventing new dirt/oil from entering. It might be uncomfortable but it's crucial for detox."],
          ["Add 10 drops tea tree oil to 2 tbsp carrier oil. Massage into scalp for 10 minutes. Leave on 30 minutes. Tea tree is antifungal and antibacterial - kills dandruff-causing organisms.", "Today focuses on killing any fungus, bacteria, or yeast overgrowth on scalp. Tea tree oil is one of the most potent natural antifungals available. You might feel tingling - that's good!", "Wear hair in a loose, breathable style today - bun, ponytail, or down. No tight styles that trap sweat and oil against scalp. Let it breathe!"],
          ["Mix 1 tbsp activated charcoal powder with 3 tbsp aloe vera gel. Apply to scalp (careful - it's messy!). Leave 15 minutes. Charcoal absorbs oil, toxins, and impurities from scalp surface.", "If you have oily scalp, charcoal is your best friend. It absorbs excess sebum without stripping scalp completely. You should notice less oiliness by tonight.", "After rinsing, your scalp should feel balanced - not too oily, not too dry. This is the sweet spot we're aiming for. Take note of how it feels!"],
          ["Mix 5 drops peppermint oil with 2 tbsp jojoba oil. Massage vigorously into scalp for 10 minutes. Peppermint creates tingling sensation from increased blood flow - this is deep detox happening!", "Massage stimulates lymphatic drainage, moving toxins out of scalp tissue. The tingling increases circulation bringing fresh blood and oxygen to clean follicles.", "Enjoy the fresh, clean, tingly feeling! Your scalp should feel alive and energized. This is what a healthy scalp feels like - remember this sensation."],
          ["Mix 2 tbsp witch hazel with 5 drops lavender oil. Apply to scalp with cotton ball or spray bottle. Leave on (don't rinse). Witch hazel is anti-inflammatory and soothes irritated scalp.", "If your scalp felt irritated from the deep cleansing, today brings relief. Witch hazel reduces redness, itching, and inflammation. It's gentle healing after intensive detox.", "Use gentle touch today. Your scalp has been through intensive cleansing - now it needs soothing. Be kind to it."],
          ["Apply fresh aloe vera gel (or 100% pure) directly to scalp. Massage gently. Leave on 20 minutes. Aloe soothes, heals, and moisturizes scalp without adding oil or heaviness.", "Your scalp might feel a bit sensitive after 6 days of detox. Aloe provides vitamins A, C, E, and enzymes that heal and nourish irritated skin.", "Focus on calm and healing today. No harsh treatments, no exfoliation. Just gentle, soothing care. Your scalp is clean - now we rebuild its natural barrier."],
          ["Apply neem oil (or neem powder mixed with oil) to scalp. Leave 30 minutes. Neem is antibacterial, antifungal, and healing. It creates a protective barrier on newly cleansed scalp.", "Neem ensures that your deep-cleaned scalp doesn't immediately get reinfected with bacteria or fungus. It's protective medicine for your scalp microbiome.", "Your scalp should be feeling healthier - less itchy, less flaky, less oily, more balanced. Notice the improvement from Day 1!"],
          ["Final pH balance rinse: Mix 1 tbsp ACV with 2 cups cool water. Pour over scalp and hair as final rinse. This seals everything and ensures optimal pH for hair health.", "Your scalp's natural slightly acidic pH is restored. This pH prevents fungal growth and bacteria overgrowth. Maintaining this pH keeps your scalp clean longer.", "Keep hair in protective style for next few days. Your scalp is pristine - minimize touching, products, and manipulation. Let it stay clean!"],
          ["Create your maintenance schedule: Weekly ACV rinse, monthly clarifying shampoo, weekly scalp exfoliation, daily scalp massage (stimulates oil distribution).", "Celebrate! Your scalp is clean, balanced, and ready for healthy hair growth. Everything grows better in clean soil - same for hair!", "Write down what worked: Which treatments felt best? Which products to avoid? How often will you repeat full detox? Every 3 months is recommended for maintenance."]
        ],
        createdAt: Date.now() - 4000,
      },

      // 6. 14-DAY SHINE BOOSTER
      {
        title: "14-Day Brilliant Shine Treatment",
        steps: 14,
        duration: "12 mins daily",
        category: "shine",
        gradientStart: "#8A6F4F",
        gradientEnd: "#6B5840",
        description: "Transform dull, lackluster hair into glossy, mirror-like shine. This program focuses on cuticle smoothing and light reflection for that enviable healthy hair glow. Perfect for special events or everyday confidence.",
        ingredients: [
          "Argan Oil",
          "Grapeseed Oil",
          "Vinegar Rinse",
          "Silk Protein",
          "Vitamin E",
          "Cold Water"
        ],
        instructions: [
          "Week 1: Cuticle smoothing",
          "Week 2: Shine sealing"
        ],
        dailyTasks: [
          // Week 1
          ["Argan oil treatment", "Boar bristle brushing", "Cold water rinse"],
          ["Grapeseed oil serum", "Smoothing technique", "Shine focus"],
          ["Apple cider vinegar rinse", "Cuticle lay flat", "pH balance"],
          ["Silk protein treatment", "Strengthen + shine", "Light reflection"],
          ["Vitamin E capsule oil", "Seal cuticles", "Glossy finish"],
          ["Beer rinse (optional)", "Natural shine boost", "Herbal rinse"],
          ["Weekly gloss treatment", "Compare shine", "Progress check"],
          
          // Week 2
          ["Coconut oil shine mask", "Penetrate shaft", "Mirror shine"],
          ["Green tea rinse", "Antioxidant boost", "Natural luster"],
          ["Honey gloss treatment", "Light reflection", "Smooth cuticles"],
          ["Almond oil sealing", "Lightweight shine", "No grease"],
          ["Cold water method", "Cuticle sealing", "Daily habit"],
          ["Shine spray DIY", "Final touches", "Style perfection"],
          ["Showcase shine", "Photoshoot ready", "Confidence boost"]
        ],
        dailyInstructions: [
          // Week 1: Cuticle Smoothing
          ["Apply 3-4 drops argan oil to damp hair (not soaking wet). Focus on mid-lengths to ends. Argan oil is lightweight and absorbs quickly, smoothing cuticle layer for immediate shine.", "Use a boar bristle brush on dry hair before bed. Brush from roots to ends 100 strokes. This distributes natural sebum down the hair shaft - nature's best shine serum!", "After washing, do your final rinse with the coldest water you can tolerate for 30 seconds. Cold water seals the cuticle scales flat, creating a smooth, reflective surface. This one step adds 30% more shine!"],
          ["Mix 2 drops grapeseed oil with 1 drop of your favorite essential oil. Apply to ends and mid-shaft on dry hair. Grapeseed is ultra-light and won't weigh hair down.", "Use smoothing technique: run hands down hair shaft from roots to ends with light pressure. This physically smooths cuticles flat. Do this gently 10 times.", "Focus on shine today. Really look at your hair in natural light. Notice how light reflects. We're training your eye to see improvement over the next 2 weeks."],
          ["Mix 1 tbsp apple cider vinegar with 1 cup cool water. Pour over hair as final rinse after conditioning. Don't rinse out. ACV closes cuticles and balances pH to 4.5-5.5 (optimal for shine).", "After ACV rinse, gently smooth hair with hands, encouraging cuticles to lay flat in one direction (roots to tips). This directional smoothing enhances light reflection.", "Balanced pH is the secret to shine! When pH is right, cuticles lay flat naturally. High pH (from most shampoos) raises cuticles, making hair dull. ACV corrects this."],
          ["Mix 1 tbsp liquid silk protein (or silk amino acids) with 3 tbsp leave-in conditioner. Apply to damp hair. Silk protein fills in rough spots on cuticle creating ultra-smooth surface.", "Silk protein does double duty: strengthens AND adds shine. The smooth silk molecules reflect light beautifully while reinforcing hair structure.", "Look at your hair today - you should notice it's starting to catch light better. The reflective quality is building! Take a photo to compare later."],
          ["Pierce 2 vitamin E capsules, squeeze oil onto palms, apply to ends and mid-shaft. Vitamin E is an antioxidant that protects against dullness-causing oxidative damage.", "Smooth hair shaft with hands after applying vitamin E. Really work it in, focusing on smoothing cuticles down. The oil helps them lay flat and stay there.", "Vitamin E creates a glossy finish without grease. Your hair should look polished and healthy - almost like you used a salon finishing serum!"],
          ["Pour 1/2 cup flat beer over hair after shampooing (yes, really!). Let sit 5 mins, rinse with cool water. Beer proteins coat hair creating shine and body. The smell disappears when dry!", "Or skip beer and do herbal rinse: steep chamomile + nettle tea, cool, use as final rinse. Herbs contain shine-enhancing compounds and vitamins.", "Natural rinses have been used for centuries for shine. Your grandmother's grandmother knew these secrets! Sometimes old methods work best."],
          ["Apply your most intensive shine treatment: deep conditioner + oil seal. Sit with plastic cap for 30 mins. This weekly intensive maintains the daily shine work.", "Compare your hair to Day 1. Take photos in same lighting. You should see noticeable difference in light reflection and glossiness!", "At end of Week 1, your cuticles should be significantly smoother. This is the foundation - Week 2 will seal and enhance this shine."],
          
          // Week 2: Shine Sealing
          ["Warm 2 tbsp coconut oil until liquid. Apply to hair for 20 mins. Coconut oil penetrates hair shaft (most oils just coat). This internal smoothing creates shine from within.", "Focus on penetration today. The oil doesn't just sit on surface - it enters the hair, filling microscopic gaps and cracks that dull shine.", "Coconut oil molecules are small enough to penetrate cortex. This is why it creates mirror-like shine unlike heavier oils that just coat."],
          ["Brew strong green tea (2 bags in 1 cup), cool completely. Pour over hair as final rinse. Leave in. Green tea contains catechins that add shine and protect against UV dullness.", "Green tea is packed with antioxidants that prevent oxidation - a major cause of dull hair. Think of it as anti-aging serum for your hair!", "The natural tannins in tea create a shine-enhancing coating. Plus the caffeine stimulates scalp - bonus hair growth benefits!"],
          ["Warm 2 tbsp honey with 1 tbsp water until thin. Apply to damp hair for 15 mins. Honey is a humectant that attracts moisture, plus smooths cuticles for ultimate light reflection.", "Honey creates both smooth surface AND hydrated interior - the perfect combination for shine. Well-hydrated hair reflects more light.", "Your hair should be noticeably shinier now! The honey treatment polishes like a final buff on your glossy hair surface."],
          ["Apply a few drops of almond oil to dry hair, focusing on ends. Almond oil is the lightest oil - perfect for shine without any heaviness or grease.", "Lightweight oils are key for shine, especially for fine hair. Heavy oils weigh down and actually make hair look dull. Almond oil is perfect balance.", "You should be able to run fingers through hair easily - it's smooth, shiny, not greasy. This is the goal texture!"],
          ["Make cold water rinse a permanent habit. After EVERY wash, 30-second cold blast. This daily practice maintains shine long-term.", "Cold seals cuticles shut. Warm water opens them (needed for cleansing), but cold must seal them back. This is non-negotiable for lasting shine!", "Train yourself to tolerate cold. Count to 30. Breathe deeply. Your shiny hair is worth 30 seconds of cold discomfort!"],
          ["Make DIY shine spray: Mix 1 tsp argan oil + 2 drops vitamin E oil in 4 oz spray bottle, fill with water, shake before each use. Mist over dry hair for instant glossiness.", "Keep this spray in your purse or at your desk. Quick shine refresh anytime! Mist and gently smooth with hands for instant photoshoot-ready hair.", "This finishing spray is your secret weapon. Use before important events, photo ops, or just because you want to feel amazing!"],
          ["SHOWCASE DAY! Style your hair beautifully. The shine you've built over 14 days makes every style look 10x better. Take photos - you've earned this!", "Compare Day 1 photos to today. The difference should be dramatic! You now know how to maintain this shine forever.", "Share your results! Post photos, tell friends what worked. You're a shine expert now! Maintain with: weekly cold rinses, ACV rinses 2x/week, monthly coconut oil treatment."]
        ],
        createdAt: Date.now() - 5000,
      },

      // 7. 21-DAY CURL DEFINITION
      {
        title: "21-Day Curl Revival",
        steps: 21,
        duration: "18 mins daily",
        category: "curl",
        gradientStart: "#9FA89F",
        gradientEnd: "#7A8A7A",
        description: "Bring your curls back to life! Whether you have waves, curls, or coils, this program will define, moisturize, and enhance your natural curl pattern. Say goodbye to frizz and hello to bouncy, defined curls.",
        ingredients: [
          "Flaxseed Gel",
          "Curl Cream",
          "Leave-in Conditioner",
          "Coconut Milk",
          "Shea Butter",
          "Curl Defining Cream"
        ],
        instructions: [
          "Week 1: Curl training and definition",
          "Week 2: Moisture and hold",
          "Week 3: Maintenance and styling"
        ],
        dailyTasks: [
          // Week 1
          ["Flaxseed gel application", "Praying hands method", "Scrunch technique"],
          ["Curl cream + water", "Refresh curls", "Pineapple overnight"],
          ["Deep conditioning", "Detangle gently", "Curl pattern analysis"],
          ["Leave-in layering", "Define each curl", "Microfiber dry"],
          ["Coconut milk treatment", "Curl moisture", "Diffuse low heat"],
          ["Shea butter seal", "Lock in moisture", "Protect curls"],
          ["Weekly deep condition", "Trim if needed", "Curl health check"],
          
          // Week 2
          ["Protein treatment", "Strengthen curls", "Bounce restoration"],
          ["Moisture balance", "Hydrate curls", "Define clumps"],
          ["Curl cream cocktail", "Custom blend", "Perfect hold"],
          ["Refresh technique", "Second-day curls", "Water + product"],
          ["Scalp massage", "Growth stimulation", "Curl health"],
          ["Protective style", "Rest curls", "Maintain moisture"],
          ["Deep condition + style", "Curl definition", "Frizz control"],
          
          // Week 3
          ["Perfect wash routine", "Technique mastery", "Curl definition"],
          ["Style experimentation", "Try new methods", "Find favorites"],
          ["Curl maintenance", "Daily refresh", "Moisture check"],
          ["Mid-week treatment", "Protein-moisture", "Curl bounce"],
          ["Styling practice", "Master technique", "Confident curls"],
          ["Final deep treatment", "Prepare showcase", "Curl perfection"],
          ["Curl celebration", "Rock your curls", "Share journey"]
        ],
        createdAt: Date.now() - 6000,
      },

      // 8. 3-DAY EMERGENCY REVIVAL
      {
        title: "3-Day Hair Emergency SOS",
        steps: 3,
        duration: "30 mins daily",
        category: "repair",
        gradientStart: "#8F7A6A",
        gradientEnd: "#705B4D",
        description: "Need results fast? This intensive 3-day program provides emergency care for severely damaged hair. Perfect before a big event or when you need to look your best. Dramatic transformation in just 72 hours.",
        ingredients: [
          "Intensive Repair Mask",
          "Protein Treatment",
          "Hot Oil",
          "Silk Wrap",
          "Bond Builder"
        ],
        instructions: [
          "Day 1: Deep repair and protein",
          "Day 2: Moisture and softening",
          "Day 3: Sealing and styling"
        ],
        dailyTasks: [
          ["Protein treatment + steam", "Bond builder application", "Trim dead ends immediately"],
          ["Intensive moisture mask", "Hot oil treatment", "Silk wrap overnight"],
          ["Final repair + gloss", "Style for event", "Confidence boost"]
        ],
        createdAt: Date.now() - 7000,
      },

      // 9. 14-DAY ANTI-FRIZZ PROGRAM
      {
        title: "14-Day Frizz-Free Transformation",
        steps: 14,
        duration: "15 mins daily",
        category: "smoothing",
        gradientStart: "#4A7C6F",
        gradientEnd: "#35625A",
        description: "Tame unruly frizz and flyaways for good. This program teaches you how to manage humidity, seal cuticles, and maintain smooth, sleek hair in any weather. Perfect for those battling constant frizz.",
        ingredients: [
          "Anti-frizz Serum",
          "Smoothing Cream",
          "Silk Pillowcase",
          "Humidity Blocker",
          "Keratin Treatment"
        ],
        instructions: [
          "Week 1: Cuticle sealing",
          "Week 2: Frizz prevention"
        ],
        dailyTasks: [
          // Week 1
          ["Keratin DIY treatment", "Smooth hair shaft", "Seal cuticles"],
          ["Anti-frizz serum", "Layer products", "Air dry smooth"],
          ["Cold water rinse", "Cuticle closing", "Smooth finish"],
          ["Smoothing cream application", "Technique practice", "Sleek style"],
          ["Silk treatment", "Protein boost", "Strengthen hair"],
          ["Humidity test", "Weather proof", "Hold check"],
          ["Weekly assessment", "Progress photos", "Adjust routine"],
          
          // Week 2
          ["Maintenance routine", "Daily smoothing", "Frizz control"],
          ["Anti-humidity spray", "Weather protection", "All-day hold"],
          ["Touch-up technique", "Mid-day refresh", "Stay sleek"],
          ["Deep smooth treatment", "Intensive care", "Frizz elimination"],
          ["Style practice", "Perfect technique", "Master control"],
          ["Weather challenge", "Test results", "Confidence check"],
          ["Final perfection", "Frizz-free life", "New habits"]
        ],
        createdAt: Date.now() - 8000,
      },

      // 10. 30-DAY COMPLETE WELLNESS
      {
        title: "30-Day Hair & Scalp Wellness Journey",
        steps: 30,
        duration: "20 mins daily",
        category: "wellness",
        gradientStart: "#6B9F7E",
        gradientEnd: "#4A7C5F",
        description: "The ultimate holistic hair transformation. This month-long program addresses not just your hair, but your overall wellness - nutrition, stress, sleep, and self-care. True transformation from the inside out.",
        ingredients: [
          "Multivitamin with Biotin",
          "Collagen Powder",
          "Various Natural Oils",
          "Herbal Supplements",
          "Scalp Massager",
          "Meditation App"
        ],
        instructions: [
          "Week 1: Foundation and detox",
          "Week 2: Nutrition and growth",
          "Week 3: Stress management",
          "Week 4: Integration and celebration"
        ],
        dailyTasks: [
          // Week 1: Foundation
          ["Morning meditation (5 mins)", "Biotin supplement", "Scalp massage"],
          ["Detox hair mask", "Drink green smoothie", "Evening yoga"],
          ["Scalp exfoliation", "Nutrition journal", "8 hours sleep goal"],
          ["Oil treatment", "Meal prep healthy food", "Gratitude practice"],
          ["Protein treatment", "Protein-rich breakfast", "Stress check"],
          ["Moisture mask", "Hydration focus", "Self-care ritual"],
          ["Rest and assessment", "Progress journal", "Goal review"],
          
          // Week 2: Growth
          ["Growth oil massage", "Collagen drink", "Morning affirmations"],
          ["Nutrient mask", "Iron-rich meal", "Energy check"],
          ["Scalp stimulation", "Omega-3 supplement", "Circulation exercise"],
          ["Protein shake", "Hair growth meditation", "Vision board"],
          ["Growth tracking", "Biotin focus", "Supplement routine"],
          ["Nourishing mask", "Anti-inflammatory diet", "Rest day"],
          ["Weekly measurements", "Photo documentation", "Celebrate progress"],
          
          // Week 3: Stress Management
          ["Meditation + massage", "Stress-relief tea", "Breathing exercises"],
          ["Calming mask", "Reduce cortisol", "Evening walk"],
          ["Gentle care routine", "Self-compassion", "Journal feelings"],
          ["Aromatherapy treatment", "Relaxation music", "Bath ritual"],
          ["Mindful styling", "Present moment", "Gratitude list"],
          ["Restorative mask", "Sleep optimization", "Screen-free evening"],
          ["Wellness check", "Balance assessment", "Adjust routine"],
          
          // Week 4: Integration
          ["Perfect routine", "Morning ritual", "Consistency focus"],
          ["Maintenance care", "Sustainable habits", "Energy high"],
          ["Styling practice", "Confidence building", "Mirror work"],
          ["Final treatments", "Prep for showcase", "Excitement building"],
          ["Photoshoot prep", "Document journey", "Share story"],
          ["Celebration day", "Before/after reveal", "Reflect on journey"],
          ["Future planning", "Maintenance schedule", "Goal setting"],
          ["New chapter begins", "Confident you", "Inspire others"],
          ["Routine automation", "Habit stacking", "Morning flow"],
          ["Community connection", "Share wisdom", "Help others"]
        ],
        createdAt: Date.now() - 9000,
      },
    ];

    // Insert all remedies
    for (const remedy of remedies) {
      await ctx.db.insert("remedies", remedy);
    }

    return { 
      message: `Successfully seeded ${remedies.length} comprehensive remedies`,
      count: remedies.length 
    };
  },
});

