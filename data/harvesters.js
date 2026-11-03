/*
 * Raj Trading – LOVOL combine harvester data.
 *
 * This is the ONE source for the machinery pages. Every spec, label and
 * button text shown on /machinery/ comes from here, so a translation (e.g.
 * Odia) only needs a copy of this file with the strings changed.
 *
 * After editing, regenerate the static pages:
 *   node tools/build-machinery.js
 *
 * Works in the browser (window.RT_HARVESTERS) and in Node (module.exports).
 */
(function (root) {
  const DATA = {
    lang: 'en',

    // Change this one value when the site moves to its own domain.
    siteUrl: 'https://ydmpvtltd.github.io/Raj_Trading/',

    business: {
      name: 'Raj Trading',
      tagline: 'Authorised Dealer for LOVOL Agriculture Machinery',
      location: 'Niali, Cuttack, Odisha, India',
      addressLocality: 'Cuttack',
      addressRegion: 'Odisha',
      streetAddress: 'Niali',
      postalCode: '754004',
      phones: [
        { display: '+91 97783 33974', tel: '+919778333974' },
        { display: '+91 90405 66787', tel: '+919040566787' },
      ],
      whatsapp: '919778333974',
      hours: 'Open all 7 days\n8:00 AM – 9:00 PM',
    },

    ui: {
      nav: {
        home: 'Home',
        machinery: 'Machinery',
        service: 'Service',
        parts: 'Spare Parts',
        contact: 'Contact',
        requestQuote: 'Request a Quote',
        toggleMenu: 'Toggle menu',
        callNowNumber: 'Call Now (+91 97783 33974)',
        whatsappUs: 'WhatsApp Us',
      },
      footer: {
        about: 'Your trusted partner in agriculture. Providing complete solutions including machinery sales, reliable service support, and genuine spare parts.',
        quickLinks: 'Quick Links',
        contactUs: 'Contact Us',
        rights: 'All rights reserved.',
      },
      stickyBar: { call: 'CALL', whatsapp: 'WHATSAPP', enquire: 'ENQUIRE' },
      breadcrumb: { label: 'Breadcrumb', home: 'Home', machinery: 'Machinery', harvesters: 'Combine Harvesters' },

      // Product page
      dealerBadge: 'Authorised LOVOL Dealer',
      priceOnRequest: 'Price on request',
      priceNote: 'Ask us for today’s price, offers and availability.',
      buttons: {
        bestPrice: 'Get Best Price on WhatsApp',
        callNow: 'Call Now',
        bookDemo: 'Book a Demo',
        brochure: 'Download Brochure',
        viewDetails: 'View Details',
        whatsappEnquiry: 'WhatsApp Enquiry',
        officialPage: 'Official LOVOL product page',
        servicePage: 'Book a Service',
        partsPage: 'Find Spare Parts',
        compare: 'Compare all models',
      },
      opensInNewTab: '(opens in a new tab)',
      highlightsHeading: 'Key highlights',
      featuresHeading: 'Features',
      specsHeading: 'Full specifications',
      specsCaption: 'LOVOL {model} technical specifications',
      specColumn: 'Specification',
      valueColumn: 'Value',
      cropsHeading: 'Suitable crops',
      bestForHeading: 'Best for',
      compareHeading: 'Compare with other models',
      serviceHeading: 'Service & spare parts',
      serviceText: 'Genuine LOVOL spare parts and service support at Raj Trading.',
      faqHeading: 'Frequently asked questions',
      faqs: [
        {
          q: 'What is the price of the LOVOL {model}?',
          a: 'The price depends on current offers and the configuration you choose. Call or WhatsApp Raj Trading for today’s price and availability.',
        },
        {
          q: 'Can you help with finance or a government subsidy?',
          a: 'Please call or WhatsApp us to discuss the finance and subsidy options for the {model}.',
        },
        {
          q: 'Do you provide service support for the {model}?',
          a: 'Yes. Raj Trading provides service support for LOVOL machinery, including maintenance, inspection and repairs. Call or WhatsApp us to book a service.',
        },
        {
          q: 'Are spare parts available?',
          a: 'Raj Trading supplies genuine LOVOL spare parts. Send us the part number or a photo of the part on WhatsApp and we will check availability.',
        },
      ],

      // Book a demo dialog
      demo: {
        heading: 'Book a Demo',
        intro: 'Fill in your details and we will open WhatsApp with your request ready to send.',
        name: 'Name',
        mobile: 'Mobile number',
        location: 'Village / Location',
        date: 'Preferred date',
        model: 'Model',
        submit: 'Send on WhatsApp',
        close: 'Close',
        message: 'Hello Raj Trading, I would like to book a demo of the LOVOL {model} combine harvester.',
        enquiryMessage: 'Hello Raj Trading, I would like to enquire about LOVOL combine harvesters.',
        noModel: 'Not sure yet',
      },

      // WhatsApp message templates
      whatsapp: {
        price: 'Hello Raj Trading, I want the price and availability of the LOVOL {model} combine harvester.',
        tractor: 'Hello Raj Trading, I would like to know when LOVOL tractors will be available.',
      },

      // Listing page
      listing: {
        title: 'LOVOL Combine Harvesters – Models, Specs & Comparison | Raj Trading, Cuttack, Odisha',
        description: 'Compare LOVOL RG102 EVO, RG108 PLUS and RG130 EVO combine harvesters: specs, features and price on request from Raj Trading, Niali, Cuttack.',
        heading: 'LOVOL Agricultural Machinery',
        intro: 'Explore LOVOL combine harvesters available through Raj Trading, compare the models and ask us for the best price.',
        filterLabel: 'Filter machinery',
        filters: { all: 'All', harvesters: 'Combine Harvesters', tractors: 'Tractors' },
        harvestersHeading: 'Combine Harvesters',
        tractorsHeading: 'Tractors',
        comingSoon: 'Coming soon',
        tractorsText: 'LOVOL tractors will be listed here soon. Message us on WhatsApp to know about availability.',
        compareHeading: 'Compare models',
        compareIntro: 'Side-by-side specifications. The highest value in each row is highlighted.',
        compareCaption: 'Comparison of LOVOL RG102 EVO, RG108 PLUS and RG130 EVO combine harvesters',
        bestLabel: 'Best',
        otherEquipmentHeading: 'Other farm equipment',
        otherEquipmentText: 'Looking for a rotavator, paddy transplanter or other equipment?',
        otherEquipmentLink: 'See all equipment',
      },

      // Page title template for product pages
      productTitle: 'LOVOL {model} Combine Harvester – Price, Specs | Raj Trading, Cuttack, Odisha',
      productDescription: 'LOVOL {model} {type}: full specs, features and price on request from Raj Trading, authorised LOVOL dealer in Niali, Cuttack, Odisha.',
    },

    // Spec labels shared by every model. `compare: 'max'` means a higher number is better
    // and is highlighted in the comparison table.
    specs: [
      { key: 'enginePower', label: 'Engine Power', icon: 'gauge', compare: 'max', highlight: true },
      { key: 'feedingRate', label: 'Feeding Rate', icon: 'wheat', compare: 'max', highlight: true },
      { key: 'headerWidth', label: 'Header Width', icon: 'move-horizontal', compare: 'max', highlight: true },
      { key: 'grainTank', label: 'Grain Tank', icon: 'package', compare: 'max', highlight: true },
      { key: 'gearbox', label: 'Gearbox' },
      { key: 'hst', label: 'HST' },
      { key: 'track', label: 'Track Specification', compare: 'max' },
      { key: 'unloadingRate', label: 'Unloading Rate', compare: 'max' },
      { key: 'fuelTank', label: 'Fuel Tank', compare: 'max' },
    ],

    // Specs shown on the listing cards
    cardSpecs: ['enginePower', 'feedingRate', 'grainTank'],

    crops: ['Rice (Paddy)', 'Wheat', 'Soybean', 'Corn (grain)', 'Sunflower', 'Sorghum', 'Millet'],

    models: [
      {
        id: 'rg102-evo',
        name: 'RG102 EVO',
        type: 'Multi-Crop Crawler Combine',
        summary: 'A high-performance, comfortable harvester for efficient work in small to medium-sized fields.',
        // value: shown text; num: used to find the best value in the comparison table
        specs: {
          enginePower: { value: '102 ps', num: 102 },
          feedingRate: { value: '6 kg/s', num: 6 },
          headerWidth: { value: '2300 mm', num: 2300 },
          grainTank: { value: '1.8 m³', num: 1.8 },
          gearbox: { value: '100S' },
          hst: { value: '52/56 CC' },
          track: { value: '550×90×56', num: 550 },
          unloadingRate: { value: '20 L/s', num: 20 },
          fuelTank: { value: '240 L', num: 240 },
        },
        features: [
          'Multi-crop: rice, wheat, soybean, corn grain, sunflower, sorghum, millet',
          'Crawler chassis with strong traction and low ground pressure for wet or uneven fields',
          'Comfortable cab with easy controls for long working days',
          'Tuned threshing and cleaning for high output with low grain loss',
        ],
        bestFor: 'Small to medium farms that need one multi-crop machine with low soil compaction.',
        brochure: 'https://drive.google.com/file/d/1lGPoNq1FXUAoxdsLICvHrK-JZ3ZsUXyc/view?usp=sharing',
        officialPage: 'https://lovol.co.in/shop/harvester-rg102evo',
        image: 'images/machinery/rg102-evo.webp',
        imageAlt: 'LOVOL RG102 EVO multi-crop crawler combine harvester',
      },
      {
        id: 'rg108-plus',
        name: 'RG108 PLUS',
        type: 'Multi-Crop Crawler Combine',
        summary: 'An efficient, easy-to-operate harvester for small to medium fields with wide crop adaptability.',
        specs: {
          // LOVOL's page shows 5 kg/s in its spec table but 4.5 kg/s in its feature text.
          feedingRate: { value: '5 kg/s', num: 5, todo: 'TODO: confirm feeding rate (4.5 vs 5 kg/s) with LOVOL' },
          enginePower: { value: '100 ps', num: 100 },
          headerWidth: { value: '2300 mm', num: 2300 },
          grainTank: { value: '1.8 m³', num: 1.8 },
          gearbox: { value: '90/100s' },
          hst: { value: '52/56 CC' },
          track: { value: '550×90×56', num: 550 },
          unloadingRate: { value: '20 L/s', num: 20 },
          fuelTank: { value: '160 L', num: 160 },
        },
        features: [
          'Built mainly for paddy; also harvests wheat, soybean, corn grain, sunflower, sorghum, millet',
          'Low-ground-pressure crawlers for wet fields with less soil compaction',
          'Air-suspension seat and quiet cab (≤72 dB)',
          'Grain loss rate below 1.2%',
        ],
        bestFor: 'Farms that want one machine for both paddy and dryland crops.',
        brochure: 'https://drive.google.com/file/d/1JxyqCkl3GcbHZNkGO5bChElmWIiRHLKW/view?usp=sharing',
        officialPage: 'https://lovol.co.in/shop/harvester-rg108plus',
        image: 'images/machinery/rg108-plus.webp',
        imageAlt: 'LOVOL RG108 PLUS multi-crop crawler combine harvester',
      },
      {
        id: 'rg130-evo',
        name: 'RG130 EVO',
        type: 'Professional Crawler Combine',
        summary: 'A high-capacity, multi-crop harvester for medium to large and commercial-scale farming.',
        specs: {
          enginePower: { value: '130 ps', num: 130 },
          feedingRate: { value: '7 kg/s', num: 7 },
          headerWidth: { value: '2800 mm', num: 2800 },
          grainTank: { value: '2.2 m³', num: 2.2 },
          gearbox: { value: '100S' },
          hst: { value: '56/60 CC' },
          track: { value: '600×90×59', num: 600 },
          unloadingRate: { value: '25 L/s', num: 25 },
          fuelTank: { value: '240 L', num: 240 },
        },
        features: [
          '130 hp engine with strong performance and efficient fuel use',
          'Multi-crop: rice, wheat, soybean, corn grain, sunflower, sorghum, millet',
          'Wide 600 mm tracks for stability in wet and soft fields',
          'Spacious, low-vibration cab with clear all-round visibility',
        ],
        bestFor: 'Commercial farms and custom-hiring contractors who need high output across many crops.',
        brochure: 'https://drive.google.com/file/d/1iYuaefmqzMMj8OnoUrK0rkNF7J0cdDgs/view?usp=sharing',
        officialPage: 'https://lovol.co.in/shop/harvester-rg130evo',
        image: 'images/machinery/rg130-evo.webp',
        imageAlt: 'LOVOL RG130 EVO professional crawler combine harvester',
      },
    ],
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
  } else {
    root.RT_HARVESTERS = DATA;
  }
})(typeof window !== 'undefined' ? window : globalThis);
