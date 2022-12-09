const plants = [
  {
    name: "Money Tree Plant",
    price: 84,
    image:
      "hhttps://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant-cream.jpg?v=1655956902",
    details:
      "Said to bring good luck and fortune, the Money Tree is the perfect plant to add to any room of your home to create good Feng Shui. It is known for its resilience, ease of growth, and fun braided trunk. ",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Snake Plant Laurentii",
    price: 68,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_variant_small_grant_blush.jpg?v=1665090268",
    details:
      "The Snake Plant Laurentii, or Sansevieria trifasciata 'Laurentii', is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature (it can tolerate low light and drought) and its air-purifying capabilities. The easiest way to kill this plant is to overcare for it. ",
    stock: 10,
    planter: "Grant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Snake Plant Laurentii",
    price: 100,
    image:
      "https://www.thesill.com/products/snake-plant-laurentii?variant=30412141953129",
    details:
      "The Snake Plant Laurentii, or Sansevieria trifasciata 'Laurentii', is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature (it can tolerate low light and drought) and its air-purifying capabilities. The easiest way to kill this plant is to overcare for it. ",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Snake Plant Laurentii",
    price: 154,
    image:
      "https://www.thesill.com/products/snake-plant-laurentii?variant=40340487798889",
    details:
      "The Snake Plant Laurentii, or Sansevieria trifasciata 'Laurentii', is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature (it can tolerate low light and drought) and its air-purifying capabilities. The easiest way to kill this plant is to overcare for it. ",
    stock: 10,
    planter: "Grant",
    size: "large",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "ZZ Plant",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_zz-plant_bryant_mint_variant.jpg?v=1665087876",
    details:
      "The ZZ Plant is characterized by its waxy green leaves above the surface of its potting mix, and its large potato-like rhizomes underneath. These rhizomes store water, making the ZZ a hardy, drought-tolerant houseplant that only needs water every few weeks. ",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "ZZ Plant",
    price: 128,
    image: "https://www.thesill.com/products/zz-plant?variant=40067559653481",
    details:
      "The ZZ Plant is characterized by its waxy green leaves above the surface of its potting mix, and its large potato-like rhizomes underneath. These rhizomes store water, making the ZZ a hardy, drought-tolerant houseplant that only needs water every few weeks. ",
    stock: 10,
    planter: "Bryant",
    size: "large",
    categories: ["easy care", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Philodendron Imperial Red",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_philodendron-imperial-red_small_bryant_cream.jpg?v=1663279727%20320w",
    details:
      "The striking foliage of the Philodendron Imperial Red starts out bright red before maturing to a beautiful burgundy then dark green. This unique tropical plant loves to climb as it grows and would benefit from a coco coir pole, trellis, or similar for support.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "tabletop"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Parlor Palm",
    price: 68,
    image:
      "https://www.thesill.com/products/parlor-palm?variant=39890283757673",
    details:
      "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities. ",
    stock: 10,
    planter: "Grant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Parlor Palm",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_parlor-palm_variant_small_grant_cream.jpg?v=1665090715",
    details:
      "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities. ",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Parlor Palm",
    price: 105,
    image:
      "https://www.thesill.com/products/parlor-palm?variant=40313541034089",
    details:
      "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities. ",
    stock: 10,
    planter: "Grant",
    size: "large",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Calathea Rattlesnake",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_calathea-rattlesnake_small_bryant_black.jpg?v=1663279341",
    details:
      "The Calathea Rattlesnake is known for its long, wavy green leaves with a brushstroke pattern resembling reptile skin. It raises and lowers these leaves from day to night, a phenomenon called nyctinasty and the source behind its nickname prayer plant. ",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Peperomia Obtusifolia",
    price: 68,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_peperomia-obtusfolia-green_variant_small_grant_cream.jpg?v=1661867801",
    details:
      "The Peperomia obtusifolia, also known as the baby rubber plant, is an easy-going houseplant characterized by its thick, succulent-like green leaves. A popular variety of Peperomia, it does not need much to thrive and might even reward you with white flower spikes once a year.",
    stock: 10,
    planter: "Grant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Hoya Heart",
    price: 48,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_hoya-heart_variant_mini_hyde_blush.jpg?v=1650982114",
    details:
      "The Hoya kerrii is commonly called the Hoya Heart because of its green heart-shaped leaves. This single leaf cutting is a fun, whimsical way to show your plant love. It is partially rooted but does not have a node. It will stay as an adorable heart-shaped leaf for years to come. ",
    stock: 10,
    planter: "Hyde",
    size: "mini",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Pink Anthurium",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_anthurium-pink_variant_small_bryant_mint.jpg?v=1658331431",
    details:
      "This bright pink Anthurium lives up to its nickname, the flamingo flower. Rarely without their showy blooms, Anthuriums are known as the world’s longest blooming houseplant. Each bloom can last up to eight weeks, and new ones will pop up often. These aren’t actual flowers, but modified waxy leaves. Anthuriums flourish and bloom best in bright indirect light.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Succulent Assortment with Planters",
    price: 98,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_succulent-trio_variant_mini_hyde_mint_373331a0-f9bd-4fd0-9097-4eea4b23f127.jpg?v=1657084995",
    details:
      "This exclusive set is perfect for a small windowsill or sunny space, and hard to kill. You’ll get a variety of miniature succulents with matching planters to display them in.",
    stock: 10,
    planter: "Hyde",
    size: "mini",
    categories: ["easy care", "tabletop"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Preserved Fern Kokedama",
    price: 75,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_kokedama-plant_variant_all_01.jpg?v=1645354252",
    details:
      "A traditional Japanese art form, the word Kokedama translates to ’moss ball’. There is no upkeep necessary with this preserved fern kokedama simply hang and enjoy, or sit on a flat surface. This is a real kokedama that has been naturally preserved. It is non-toxic and environmentally friendly. Each kokedama is handcrafted and unique natural variations will occur. There might be a slight odor upon unpacking your kokedama, but it will subside in about 3 weeks. Keep it out of direct light and never water.",
    stock: 10,
    planter: "Grant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Dracaena Marginata",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_dracaena-marginata_medium_hyde_cream.jpg?v=1655959304",
    details:
      "The Dracaena marginata, or Dragon Tree, is a popular low-maintenance plant native to Madagascar. Its unique silhouette and height make it our go-to pick for upgrading any corner!",
    stock: 10,
    planter: "Hyde",
    size: "medium",
    categories: ["easy care", "tabletop"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Echeveria Lola",
    price: 48,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_echeveria-lola_variant_mini_hyde_blush.jpg?v=1662564995",
    details:
      "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities. ",
    stock: 10,
    planter: "Hyde",
    size: "mini",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Philodendron Green",
    price: 68,
    image:
      "https://www.thesill.com/products/philodendron-green?variant=32563617726569",
    details:
      "Why is the Philodendron our most popular plant year after year? It could be its heart-shaped green leaves, easy-going nature, or quick-growing trailing vines. Snag this low-maintenance houseplant now to bring the outdoors in.",
    stock: 10,
    planter: "Grant",
    size: "small",
    categories: ["easy care", "tabletop"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Philodendron Green",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_philodendron_medium_grant_cream.jpg?v=1655958730",
    details:
      "Why is the Philodendron our most popular plant year after year? It could be its heart-shaped green leaves, easy-going nature, or quick-growing trailing vines. Snag this low-maintenance houseplant now to bring the outdoors in.",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["easy care", "tabletop"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Arrowhead White Butterfly",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_arrowhead-white-butterfly_medium_hyde_cream.jpg?v=1663359562",
    details:
      "Take a closer look at the Arrowhead White Butterfly, and you’ll find that its leaves actually feature marbling in a variety of vibrant green shades. You can showcase this unique variegation by training your Syngonium podophyllum to climb trellises and ladder stands in the same way it climbs trees in its native rainforests!",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Autumn Fern",
    price: 74,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_autumn-fern_medium_grant_blush.jpg?v=1665127827",
    details:
      "The lacey fronds of the Autumn Fern add color, dimension, and texture to your space. Newly unfurled fronds start off copper or bronze, then mature to deep green. It is relatively easy-going for a fern but is happiest in high humidity and indirect light, mimicking the environment of Asia’s cool and shady forests it is native to.",
    stock: 10,
    planter: "Hyde",
    size: "medium",
    categories: ["tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Monstera Deliciosa",
    price: 80,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_hyde_mint_f0e6d601-426c-40fe-abc6-b0a1f4dce17b.jpg?v=1665091216",
    details:
      "Nicknamed the swiss cheese plant, the Monstera deliciosa is famous for its quirky natural leaf holes. These holes are theorized to maximize sun fleck capture on the forest floor. Depending on the season and maturity of the plant, your Monstera could arrive with no holes just yet, and be sized to grow alongside you.",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Monstera Deliciosa",
    price: 98,
    image:
      "https://www.thesill.com/products/monstera-deliciosa?variant=40340478197865",
    details:
      "Nicknamed the swiss cheese plant, the Monstera deliciosa is famous for its quirky natural leaf holes. These holes are theorized to maximize sun fleck capture on the forest floor. Depending on the season and maturity of the plant, your Monstera could arrive with no holes just yet, and be sized to grow alongside you.",
    stock: 10,
    planter: "Grant",
    size: "large",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Fiddle Leaf Fig",
    price: 68,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_fiddle-leaf-fig_variant_small_grant_cream.jpg?v=1665066979",
    details:
      "The Fiddle Leaf Fig is famous for its broad, vibrant green leaves with prominent veining. It prefers a stable environment and can be fickle when temps fluctuate. Keep it in bright light, and water about once every 1-2 weeks.",
    stock: 10,
    planter: "Grant",
    size: "small",
    categories: ["tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Fiddle Leaf Fig",
    price: 78,
    image:
      "https://www.thesill.com/products/fiddle-leaf-fig?variant=40340511850601",
    details:
      "The Fiddle Leaf Fig is famous for its broad, vibrant green leaves with prominent veining. It prefers a stable environment and can be fickle when temps fluctuate. Keep it in bright light, and water about once every 1-2 weeks.",
    stock: 10,
    planter: "Grant",
    size: "large",
    categories: ["tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "String of Hearts",
    price: 72,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_string-of-hearts_small_hyde_blush_d9a8a389-3585-4a65-9d1f-8f1b75c2748b.jpg?v=1665087688",
    details:
      "Our String of Hearts is a lovely trailing succulent known for its heart-shaped leaves and tolerant nature. It can propagate quickly due to its shallow roots and ability to easily grow new roots and vines. We recommend putting it on an elevated surface like a bookshelf to give it space to cascade.",
    stock: 10,
    planter: "Hyde",
    size: "small",
    categories: ["tabletop"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Desert Rose",
    price: 60,
    image:
      "https://www.thesill.com/products/desert-rose?variant=40231698727017",
    details:
      "Our String of Hearts is a lovely trailing succulent known for its heart-shaped leaves and tolerant nature. It can propagate quickly due to its shallow roots and ability to easily grow new roots and vines. We recommend putting it on an elevated surface like a bookshelf to give it space to cascade.",
    stock: 10,
    planter: "Hyde",
    size: "small",
    categories: ["pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Desert Rose",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_desert-rose_medium_hyde_blush.jpg?v=1660570847",
    details:
      "Our String of Hearts is a lovely trailing succulent known for its heart-shaped leaves and tolerant nature. It can propagate quickly due to its shallow roots and ability to easily grow new roots and vines. We recommend putting it on an elevated surface like a bookshelf to give it space to cascade.",
    stock: 10,
    planter: "Hyde",
    size: "medium",
    categories: ["pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Ficus Burgundy",
    price: 68,
    image:
      "https://www.thesill.com/products/ficus-burgundy?variant=40240461185129",
    details:
      "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
    stock: 10,
    planter: "Hyde",
    size: "small",
    categories: ["pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Ficus Burgundy",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-burgundy_medium_hyde_olive.jpg?v=1660942048",
    details:
      "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
    stock: 10,
    planter: "Hyde",
    size: "medium",
    categories: ["pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Alocasia Black Velvet",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_alocasia-black-velvet_small_bryant_cream.jpg?v=1663279869",
    details:
      "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
    stock: 10,
    planter: "Hyde",
    size: "small",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Petite White Orchid",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_petite-white-orchid_bryant_mint_variant.jpg?v=1658946493",
    details:
      "Affectionately nicknamed the beginner orchid, the popular Phalaenopsis orchid is one of the easiest varieties of orchids to grow as a houseplant. This orchid will typically bloom once a year for up to three months. Upon delivery, you may notice a small number of blooms on your orchid—these blooms will open quicker in a warm, indoor setting. After a blooming cycle, the flowers will wilt and fall off and the orchid will store up energy to re-bloom again next season.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["tabletop"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Petite Sunset Orchid",
    price: 78,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_petite-sunset-orchid_bryant_cream_variant_580ffda5-510b-4c86-9e71-4be8debe3282.jpg?v=1658848308",
    details:
      "Add a pop of serenity to your tablescape with this popular Phalaenopsis orchid. One of the easiest varieties to grow as a houseplant—it is affectionately called the beginner orchid. You may notice a small number of blooms on your orchid upon delivery. These blooms will open quicker in a warm indoor setting. It will typically bloom about once a year, for up to three months. After a blooming cycle, the flowers will wilt and fall off. This is the orchid’s way to store up energy to re-bloom again next season.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["tabletop"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Coffee Plant",
    price: 82,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_small_upccyled-planter-saucer_cream.jpg?v=1653602047",
    details:
      "You might be surprised to know the same plant that grows your morning coffee beans is a popular, low-maintenance houseplant! Although it’s unlikely this plant will produce berries inside, its attractive shiny green foliage will liven up any interior space.",
    stock: 10,
    planter: "Upcycled",
    size: "small",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Monstera Adansoni",
    price: 80,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera-ginny_medium_hyde_olive.jpg?v=1662048565",
    details:
      "Though the Monstera Ginny, or Rhaphidophora tetrasperma, resembles its distant cousin the Monstera Deliciosa, it has its own unique personality and is most often seen climbing moss poles, trellises, and stakes.",
    stock: 10,
    planter: "Hyde",
    size: "medium",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Bromeliad Vriesea Intenso Orange",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-vriesea-intenso-orange_small_bryant_cream_variant.jpg?v=1655215164",
    details:
      "The Vriesea Intenso Orange, or flaming sword houseplant, is one of the showiest bromeliads known for its bright orange spike, lasting as long as 3-6 months. It is a colorful, easy indoor plant that will brighten up any space. Ad",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Button Fern",
    price: 74,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_button-fern_medium_grant_cream.jpg?v=1653067276",
    details:
      "Despite the Button Fern's appearance, with adorable button-like leaflets attached to delicate stems, it is a tough little fern: On the cliffs of its native New Zealand, it can withstand a variety of temperatures and humidity. This plant is pet-friendly!",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["easy care", "tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Bromeliad Vriesea Vogue",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-vriesea-vogue_small_bryant_black.jpg?v=1658331260",
    details:
      "The Bromeliad Vriesea Vogue is one of the most beautiful and distinctive pet-friendly plants, with a cone-like red and yellow spike that sometimes produces flowers. The colorful bract has earned this bromeliad the nickname Flaming Sword Plant.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Bromeliad Antonio Pink",
    price: 88,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-pink-antonio_small_bryant_mint.jpg?v=1658331221",
    details:
      "The “pink” in Bromeliad Antonio Pink describes the fuchsia bracts found in this cultivar, which sometimes produce short-blooming purple flowers. Its vibrant bract also gives it its nickname, the Pink Quill Plant. This plant is pet-friendly!",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["tabletop", "pet friendly"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Purple Orchid",
    price: 98,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_purple-orchid_bryant_white_variant.jpg?v=1659650894",
    details:
      "Meet the Purple Orchid—a beginner-friendly Phalaenopsis orchid with vivid purple blooms edged in white. Phalaenopsis orchids typically bloom about once a year for up to three months. Upon delivery, you may notice a few buds on your orchid; these blooms will open quicker in a warm indoor setting. After a blooming cycle, the flowers will wilt and fall off, allowing the orchid to store energy to re-bloom again next season. Add bonus: Phalaenopsis orchids are non-toxic, making them a great gift plant and pet lovers.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "tabletop"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Autumn Orchid",
    price: 98,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_summer-orchid_bryant_cream.jpg?v=1658772070",
    details:
      "Our Autumn Orchid features long-lasting, pinkish-orange flowers. As a Phalaenopsis orchid, it is easy to care for and non-toxic (AKA pet-friendly), making it our go-to gift for summer celebrations. Phalaenopsis orchids typically bloom about once a year for up to three months. You may notice a small number of blooms on your orchid upon delivery; these blooms will open quicker in a warm indoor setting. After a blooming cycle, the flowers will wilt and fall off, allowing the orchid to store energy to re-bloom again next season.",
    stock: 10,
    planter: "Bryant",
    size: "small",
    categories: ["easy care", "tabletop"],
    place: "outdoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Fiddle Leaf Fig Tree",
    price: 300,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-fiddle-leaf-fig_variant_large_pallas_ginger.jpg?v=1645210384",
    details:
      "Get the look without the fuss with our striking 6 ft tall artificial Fiddle Leaf Fig Tree. No bright light required. Pair it with our Pallas floor planter for a more polished look.",
    stock: 10,
    planter: "Grant",
    size: "large",
    categories: ["easy care", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Hanging Ric Rac Cactus",
    price: 74,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Hanging-Ric-Rac_variant.jpg?v=1661446470",
    details:
      "Our life-like Faux Ric Rac Cactus arrives ready to display in a weathered-looking terracotta pot with a metal and twine hanger. Artificial, it requires almost zero care, making it the perfect plant to hang in windowless bathrooms or hard-to-reach corners of your home.",
    stock: 10,
    planter: "Bryant",
    size: "medium",
    categories: ["easy care", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Maranta",
    price: 72,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-maranta_medium_grant_black.jpg?v=1661882705",
    details:
      "Marantas can be finicky, but there is no need to fuss with our faux take on the prayer plant. It even comes nestled in your choice of ceramic planter for a look so convincing that eagle-eyed plant parents will mistake your artificial Maranta for the real thing.",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["easy care", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Spider Plant",
    price: 62,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-spider-plant_medium_grant_cream.jpg?v=1661444123",
    details:
      "Spider Plants bring character and color to indoor spaces, and thanks to our faux take on Chlorophytum comosum, you can keep yours looking fresh without having plant-care experience. Pair it with the ceramic planter of your choice.",
    stock: 10,
    planter: "Grant",
    size: "medium",
    categories: ["easy care", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Variegated Monstera Tree",
    price: 325,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Monstera-Tree_burbank_white.jpg?v=1661446656",
    details:
      "The trendy Variegated Monstera Deliciosa can be hard to find and hard to keep alive without plenty of natural light. Opt for our faux version instead. Pair this artificial showstopper with one of our signature planters for a finished look.",
    stock: 10,
    planter: "Burbank",
    size: "large",
    categories: ["pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Cactus",
    price: 325,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Cactus_upcycled_avocado.jpg?v=1661446097",
    details:
      "Bring the desert’s calming, earthy energy into your space with our Faux Cactus. Pair it with one of our signature planters for a realistic look and place it in any room of your home—no window required to keep this (artificial) plant happy.",
    stock: 10,
    planter: "Upcycled",
    size: "medium",
    categories: ["pet friendly", "tabletop"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Rubber Tree",
    price: 325,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Rubber-Tree_burbank_white.jpg?v=1661880857",
    details:
      "If you’ve admired the Ficus elastica’s moody foliage from afar due to its irritating milky sap—meet our Faux Rubber Tree. With this artificial version, you can still get the look without worrying about curious pets or small children getting too close.",
    stock: 10,
    planter: "Burbank",
    size: "large",
    categories: ["pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Braided Money Tree",
    price: 375,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Braided-Money-Tree_burbank_almond.jpg?v=1665085617",
    details:
      "Our Faux Money Tree floor plant will bring luck and fortune to even the darkest spaces, no window necessary. Features an artificial braided trunk. Pair it with a planter or basket for a realistic look.",
    stock: 10,
    planter: "Burbank",
    size: "large",
    categories: ["pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Phalaenopsis Orchid",
    price: 50,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-orchid_variant_small_grow-pot_none.jpg?v=1661787701",
    details:
      "Our Faux Orchid will provide your space with lovely, bright white blooms all year-round. Pair this artificial Phalaenopsis with one of our ceramic planters for a realistic look.",
    stock: 10,
    planter: "Base",
    size: "small",
    categories: ["tabletop", "pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
  {
    name: "Faux Floor Cactus",
    price: 325,
    image:
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Floor-Cactus_growpot.jpg?v=1661782657",
    details:
      "Our Faux Floor Cactus will bring the desert’s warm and calming energy into your home. No need to worry about providing direct light or arid conditions—this artificial beauty can be a showstopper in any room. Pair with a planter for a finished look.",
    stock: 10,
    planter: "Base",
    size: "large",
    categories: ["pet friendly"],
    place: "indoor",
    logicalDeletion: false,
  },
];

module.exports = plants;
