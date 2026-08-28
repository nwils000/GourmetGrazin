// City-level service areas. Each entry powers a dedicated landing page at
// /{slug} plus its Service + FAQPage schema, and feeds the `areaServed`
// list in the site-wide business schema in index.html.
//
// Copy here is intentionally unique per city, not templated: near-duplicate
// city pages read as doorway pages to search engines and get filtered out.

export const SERVICE_AREAS = [
  {
    slug: 'charcuterie-catering-lexington-ky',
    city: 'Lexington',
    county: 'Fayette County',
    geo: { lat: 38.0406, lng: -84.5037 },
    seoTitle: 'Grazing Tables & Charcuterie in Lexington, KY',
    seoDescription:
      "Grazing tables & charcuterie catering in Lexington, KY. Tablescapes for 20-200+ guests, luxury mobile carts & handcrafted boards. 5.0 stars, 45 Google reviews.",
    eyebrow: 'Lexington, Kentucky',
    headlineLead: 'Grazing tables & charcuterie,',
    headlineEm: 'delivered across Lexington.',
    intro:
      "Gourmet Grazin' brings grazing tables, luxury mobile charcuterie carts, and handcrafted boards to events all over Lexington. We deliver, style, and serve anywhere in Fayette County, then break everything down when the last guest leaves, so you get to enjoy your own party.",
    areas: [
      'Downtown & Gratz Park',
      'Chevy Chase',
      'Ashland Park',
      'Kenwick',
      'Hamburg',
      'Beaumont',
      'Andover',
      'Palomar',
      'Masterson Station',
      'The Distillery District',
    ],
    localNote: {
      title: 'Built for a Lexington calendar.',
      body:
        "Lexington entertains on its own schedule: Keeneland meets in April and October, UK game days all fall, wedding season stretching from spring through the first hard frost, and a downtown full of offices that host clients year-round. We build menus and cart packages around that rhythm, and we are used to loading in at horse farms along Old Frankfort Pike and Paris Pike as easily as at a third-floor office on Main Street.",
    },
    popular: [
      {
        title: 'Wedding receptions',
        description:
          'Grazing tables and cocktail-hour carts for ceremonies downtown, in Ashland Park, and out on the horse farms ringing the city.',
      },
      {
        title: 'Corporate & client events',
        description:
          'Office lunches, open houses, and client appreciation events for teams downtown, in Hamburg, and along the Nicholasville Road corridor.',
      },
      {
        title: 'Baby & bridal showers',
        description:
          'The mocktail bar and sweet-and-savory cart are Lexington shower favorites, with menus built around any dietary restriction.',
      },
      {
        title: 'Holiday & private parties',
        description:
          'Cocoa and cider carts in winter, full grazing tables for milestone birthdays, anniversaries, and neighborhood gatherings.',
      },
    ],
    faq: [
      {
        q: 'Do you deliver charcuterie anywhere in Lexington?',
        a: "Yes. Lexington and the rest of Fayette County are part of our regular service area, including downtown, Chevy Chase, Hamburg, Beaumont, Andover, and the surrounding horse farms. We will confirm any travel fee when we send your quote.",
      },
      {
        q: 'How far in advance should I book a Lexington event?',
        a: 'One to two months is comfortable for most events. For weddings, Keeneland meet weekends, and the holiday stretch, book as early as you can, those dates fill first.',
      },
      {
        q: 'Can you set up at a Lexington venue rather than a home?',
        a: 'Absolutely. We regularly load in at venues, offices, and private homes. Tell us the space and the guest count and we will scale the cart or table to fit.',
      },
    ],
  },

  {
    slug: 'charcuterie-catering-georgetown-ky',
    city: 'Georgetown',
    county: 'Scott County',
    geo: { lat: 38.2098, lng: -84.5588 },
    seoTitle: 'Grazing Tables & Charcuterie in Georgetown, KY',
    seoDescription:
      "Grazing tables & charcuterie catering in Georgetown, KY. Tablescapes, mobile carts & boards for weddings and corporate events across Scott County. 5.0 stars.",
    eyebrow: 'Georgetown, Kentucky',
    headlineLead: 'Grazing tables & carts for',
    headlineEm: 'Georgetown gatherings.',
    intro:
      "From historic Main Street to the neighborhoods spreading out toward Great Crossing, Gourmet Grazin' brings grazing tables, mobile charcuterie carts, and handcrafted boards to Georgetown events of every size. Setup, styling, and breakdown are always included.",
    areas: [
      'Historic Downtown & Main Street',
      'Great Crossing',
      'Cardome',
      'Royal Spring',
      'Georgetown College area',
      'Elkhorn Creek',
      'Stamping Ground',
      'Sadieville',
    ],
    localNote: {
      title: 'A town that hosts more than its size suggests.',
      body:
        "Georgetown punches above its weight for events: a walkable historic downtown, a college calendar, one of the largest manufacturing employers in the state just off the interstate, and a steady run of weddings at the farms and event barns along Elkhorn Creek. That mix means we are just as often setting a corporate breakfast cart as a 6-foot grazing table for a rehearsal dinner.",
    },
    popular: [
      {
        title: 'Corporate & plant events',
        description:
          'Breakfast carts, appreciation lunches, and open houses for the manufacturing, logistics, and supplier teams based around Georgetown.',
      },
      {
        title: 'Weddings & rehearsal dinners',
        description:
          'Grazing tables sized for barn and farm venues, plus cocktail-hour carts for smaller ceremonies downtown.',
      },
      {
        title: 'Showers & birthdays',
        description:
          'Baby showers, bridal showers, and milestone birthdays with fully customizable sweet-and-savory menus.',
      },
      {
        title: 'Church & community events',
        description:
          'Boards, cups, and boxes portioned for larger crowds where a grab-and-go format works better than a served cart.',
      },
    ],
    faq: [
      {
        q: 'Do you serve all of Scott County?',
        a: 'Yes. Georgetown, Stamping Ground, Sadieville, and the surrounding Scott County countryside are all in our regular service area. Any travel fee is confirmed with your quote.',
      },
      {
        q: 'Can you cater a corporate event in Georgetown?',
        a: 'We do it often. Breakfast carts, lunch grazing tables, and individually portioned cups and boxes all work well for workplace events, and we can scale from a small team meeting to a few hundred guests.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'One to two months for most events, and earlier for weddings or anything in the spring and fall peak.',
      },
    ],
  },

  {
    slug: 'charcuterie-catering-frankfort-ky',
    city: 'Frankfort',
    county: 'Franklin County',
    geo: { lat: 38.2009, lng: -84.8733 },
    seoTitle: 'Grazing Tables & Charcuterie in Frankfort, KY',
    seoDescription:
      "Grazing tables & charcuterie catering in Frankfort, KY. Tablescapes, luxury carts & boards for receptions and corporate events in Franklin County. 5.0 stars.",
    eyebrow: 'Frankfort, Kentucky',
    headlineLead: 'Charcuterie worth',
    headlineEm: 'a capital occasion.',
    intro:
      "Gourmet Grazin' caters receptions, office events, and celebrations throughout Frankfort and Franklin County with mobile charcuterie carts, grazing tables, and handcrafted boards. We arrive early, style everything on site, and clear it all away afterward.",
    areas: [
      'Downtown & Broadway',
      'Capitol district',
      'Bellepoint',
      'Thorn Hill',
      'South Frankfort',
      'Bald Knob',
      'Peaks Mill',
      'Switzer',
    ],
    localNote: {
      title: 'A calendar shaped by the Capitol and the river.',
      body:
        "Frankfort's event season runs on two clocks: the legislative and agency calendar downtown, and the distillery-and-river tourism that fills weekends from spring through fall. We are comfortable with both, whether that means a professional reception near the Capitol that has to start exactly on time, or a relaxed grazing table for a family celebration overlooking the Kentucky River.",
    },
    popular: [
      {
        title: 'Receptions & professional events',
        description:
          'Cocktail-hour carts and grazing displays for association receptions, agency events, and retirement parties downtown.',
      },
      {
        title: 'Weddings & anniversaries',
        description:
          'Grazing tables and dessert carts for ceremonies at Franklin County venues, historic homes, and private residences.',
      },
      {
        title: 'Distillery & tourism events',
        description:
          'Boards and cups built to pair with bourbon tastings, private tours, and visitor group gatherings.',
      },
      {
        title: 'Showers & private parties',
        description:
          'Baby showers, bridal showers, and milestone birthdays, with the mocktail bar as a consistent favorite.',
      },
    ],
    faq: [
      {
        q: 'Do you travel to Frankfort?',
        a: 'Yes, Frankfort and Franklin County are part of our regular service area, including Bellepoint, Peaks Mill, and Switzer. We confirm any travel fee with your quote.',
      },
      {
        q: 'Can you pair a board with a bourbon tasting?',
        a: 'That is one of our favorite requests. We build the cheese, meat, and accompaniment selection specifically to sit alongside what is being poured.',
      },
      {
        q: 'What is your lead time?',
        a: 'One to two months covers most events. Weddings and peak-season weekends should be booked earlier.',
      },
    ],
  },

  {
    slug: 'charcuterie-catering-versailles-ky',
    city: 'Versailles',
    county: 'Woodford County',
    geo: { lat: 38.0528, lng: -84.73 },
    seoTitle: 'Grazing Tables & Charcuterie in Versailles, KY',
    seoDescription:
      "Grazing tables & charcuterie catering in Versailles, KY. Tablescapes for 20-200+ guests, luxury carts & boards for Woodford County weddings. 5.0 stars.",
    eyebrow: 'Versailles, Kentucky',
    headlineLead: 'Grazing tables made for',
    headlineEm: 'Woodford County weddings.',
    intro:
      "Versailles and the surrounding Woodford County countryside host some of the most photographed weddings in Kentucky. Gourmet Grazin' brings the grazing table, the mobile cart, and the styling to match, delivered and set up wherever you are celebrating.",
    areas: [
      'Historic Downtown & Main Street',
      'Big Spring',
      'Pisgah',
      'Nonesuch',
      'Troy',
      'Midway',
      'Old Frankfort Pike corridor',
      'Woodford County horse farms',
    ],
    localNote: {
      title: 'Designed to hold its own against the setting.',
      body:
        "Woodford County venues set a high bar visually, stone fences, black-plank paddocks, and restored estates that photograph beautifully on their own. A grazing table here has to earn its place in the frame. We build ours with height, texture, floral and greenery accents, and a color palette matched to your event, so it reads as part of the design rather than a catering table pushed against a wall.",
    },
    popular: [
      {
        title: 'Weddings & receptions',
        description:
          'Full grazing tables for 20 to 200+ guests, plus cocktail-hour carts that keep guests occupied between ceremony and dinner.',
      },
      {
        title: 'Rehearsal dinners',
        description:
          'Smaller, more intimate spreads for the night before, scaled for a private home or a reserved room downtown.',
      },
      {
        title: 'Distillery & farm events',
        description:
          'Boards and carts built to pair with tastings, tours, and hospitality events across the county.',
      },
      {
        title: 'Showers & celebrations',
        description:
          'Bridal showers, baby showers, and anniversary parties with custom menus and dietary accommodations.',
      },
    ],
    faq: [
      {
        q: 'Do you set up at Woodford County wedding venues?',
        a: 'Yes. We regularly load in at farm, estate, and barn venues around Versailles and Midway. Send us the venue and timeline and we will plan the load-in around your ceremony.',
      },
      {
        q: 'How large can a grazing table be?',
        a: 'We build for 20 to 200+ guests. Length, height, and the number of stations all scale with the count, and full setup and breakdown is included.',
      },
      {
        q: 'How early do wedding dates book?',
        a: 'Peak spring and fall Saturdays go first, often many months out. If you have a date in mind, reach out early even if the details are not final.',
      },
    ],
  },

  {
    slug: 'charcuterie-catering-nicholasville-ky',
    city: 'Nicholasville',
    county: 'Jessamine County',
    geo: { lat: 37.8806, lng: -84.573 },
    seoTitle: 'Grazing Tables & Charcuterie in Nicholasville, KY',
    seoDescription:
      "Grazing tables & charcuterie catering in Nicholasville, KY. Tablescapes, mobile carts & boards for showers, weddings and parties in Jessamine County.",
    eyebrow: 'Nicholasville, Kentucky',
    headlineLead: 'Grazing tables & boards across',
    headlineEm: 'Jessamine County.',
    intro:
      "Gourmet Grazin' serves Nicholasville, Wilmore, and the rest of Jessamine County with grazing tables, luxury mobile charcuterie carts, and handcrafted boards. Everything arrives styled and ready, and we handle the cleanup.",
    areas: [
      'Downtown Nicholasville',
      'Brannon Crossing',
      'Wilmore',
      'Keene',
      'High Bridge',
      'Camp Nelson',
      'Jessamine Creek',
      'Catnip Hill',
    ],
    localNote: {
      title: 'Close to town, but its own kind of event.',
      body:
        "Jessamine County sits close enough to Lexington that plenty of guests drive in, and far enough out that the venues feel genuinely rural, river bluffs near High Bridge, farmland toward Keene, and a compact downtown that anchors the community. Most of what we cater here is personal rather than corporate: showers, graduations, church gatherings, and backyard weddings.",
    },
    popular: [
      {
        title: 'Baby & bridal showers',
        description:
          'Our most requested Jessamine County booking, usually paired with the mocktail bar and a fully customized menu.',
      },
      {
        title: 'Graduations & family milestones',
        description:
          'Boards, cups, and boxes portioned for open-house style parties where guests come and go all afternoon.',
      },
      {
        title: 'Backyard & farm weddings',
        description:
          'Grazing tables and cocktail carts sized for outdoor ceremonies and receptions at private property.',
      },
      {
        title: 'Church & community gatherings',
        description:
          'Grab-and-go formats that serve a large group without needing a staffed serving line.',
      },
    ],
    faq: [
      {
        q: 'Do you serve Wilmore and the rest of Jessamine County?',
        a: 'Yes, Nicholasville, Wilmore, Keene, High Bridge, and the surrounding county are all within our regular service area.',
      },
      {
        q: 'What works best for an open-house style party?',
        a: 'Individual cups and boxes, or a board refreshed partway through. Guests arriving over several hours all get the same presentation as the first person through the door.',
      },
      {
        q: 'Can you accommodate dietary restrictions?',
        a: 'Yes. Vegetarian, gluten-free, nut-free, and dairy-free options are all available, just tell us what you need when you inquire.',
      },
    ],
  },

  {
    slug: 'charcuterie-catering-richmond-ky',
    city: 'Richmond',
    county: 'Madison County',
    geo: { lat: 37.7479, lng: -84.2947 },
    seoTitle: 'Grazing Tables & Charcuterie in Richmond, KY',
    seoDescription:
      "Grazing tables & charcuterie catering in Richmond, KY. Tablescapes, luxury carts & boards for weddings and campus events in Madison County. 5.0 stars.",
    eyebrow: 'Richmond, Kentucky',
    headlineLead: 'Grazing tables & charcuterie in',
    headlineEm: 'Madison County.',
    intro:
      "Gourmet Grazin' travels to Richmond, Berea, and the rest of Madison County with grazing tables, mobile charcuterie carts, and handcrafted boards for weddings, campus events, and celebrations of every size.",
    areas: [
      'Downtown Richmond',
      'EKU campus area',
      'Berea',
      'Waco',
      'Kirksville',
      'Whitehall',
      'Boonesborough',
      'Silver Creek',
    ],
    localNote: {
      title: 'A university town with a wide catchment.',
      body:
        "Richmond draws from a large area, a university calendar, a historic downtown that has been steadily filling with independent businesses, and Berea's arts community just down the interstate. Events here range from department receptions and donor gatherings to weddings at the vineyards and historic properties scattered across the county.",
    },
    popular: [
      {
        title: 'Campus & department events',
        description:
          'Receptions, donor events, and faculty gatherings with grazing displays that work in a lobby or a conference room.',
      },
      {
        title: 'Weddings & receptions',
        description:
          'Grazing tables and cocktail-hour carts for vineyard, barn, and historic-property venues around the county.',
      },
      {
        title: 'Graduations & family parties',
        description:
          'Boards, cups, and boxes for spring graduation season, when guests arrive in waves across an afternoon.',
      },
      {
        title: 'Showers & private events',
        description:
          'Baby and bridal showers with customizable sweet-and-savory menus and full dietary accommodation.',
      },
    ],
    faq: [
      {
        q: 'Do you travel to Richmond and Berea?',
        a: 'Yes. Richmond, Berea, and the surrounding Madison County communities are part of our service area. Any travel fee is confirmed with your quote.',
      },
      {
        q: 'Can you cater a campus or department event?',
        a: 'We can. Tell us the room, the guest count, and whether you want a staffed cart or a self-serve grazing display, and we will build to that.',
      },
      {
        q: 'How far in advance should I book?',
        a: 'One to two months for most events. Graduation weekends and peak wedding Saturdays should be booked well ahead.',
      },
    ],
  },
]

export const SERVICE_AREA_SLUGS = SERVICE_AREAS.map((a) => a.slug)

export function getServiceArea(slug) {
  return SERVICE_AREAS.find((a) => a.slug === slug)
}
