/**
 * Landing Page Data Configuration
 * 
 * This file contains all the static content and structure for the Infinity Shoes Bangladesh landing page.
 * It includes header, hero carousel, categories, products, brands, and footer information.
 * 
 * Updated: October 21, 2025
 */

export const landingPageData = {
  meta: {
    title: "Infinity Shoes Bangladesh — Shoes & Footwear",
    description: "Shop premium sneakers, formal shoes, sandals, and lifestyle footwear in Bangladesh at Infinity Shoes.",
    lang: "en-US"
  },
  
  header: {
    topbar: {
      welcomeText: "Welcome to Infinity Shoes Bangladesh",
      links: [
        { label: "Infinity Shoes Bangladesh Warranty Policy", href: "#" },
        { label: "Authorized Dealer List", href: "#" },
        { label: "My account", href: "/account" }
      ],
      support: {
        icon: "headset",
        phone: "+88-01789-881111",
        email: "info@infinityshoes.com"
      }
    },
    
    navbar: {
      logo: {
        src: "/images/gearx-logo.png",
        alt: "Infinity Shoes Bangladesh"
      },
      menu: [
        { label: "HOME", href: "/" },
        {
          label: "ABOUT US", dropdown: [
            { label: "Our Story", href: "/about" },
            { label: "Our Team", href: "/team" }
          ]
        },
        { label: "TIPS & TRICKS", href: "/tips" },
        { label: "NEWS & UPDATES", href: "/news" },
        { label: "BECOME A DEALER", href: "/dealer" },
        { label: "CONTACT US", href: "/contact" }
      ],
      actions: {
        productDropdown: "OUR PRODUCTS",
        searchPlaceholder: "Search for Products",
        categoryFilter: "All Categories",
        icons: ["search", "refresh", "wishlist", "cart"]
      }
    }
  },

  heroCarousel: {
    id: "heroCarousel",
    type: "carousel",
    autoplay: true,
    intervalMs: 5000,
    slides: [
      {
        image: "/images/banner1.jpg",
        alt: "Model wearing Infinity Shoes sneakers",
        headline: "Step Bold, Walk Confident",
        subtext: "Premium sneakers and daily footwear built for comfort and style",
        cta: { label: "Shop Now", href: "/products" }
      },
      {
        image: "/images/banner2.jpg",
        alt: "Latest footwear collection display",
        headline: "Footwear for Every Occasion",
        subtext: "From sporty sneakers to everyday essentials - explore our latest collection",
        cta: { label: "Explore", href: "/products" }
      }
    ]
  },

  categories: {
    id: "categories",
    title: "Shop by Category",
    layout: "grid",
    gridSettings: { columns: { desktop: 4, mobile: 2 } },
    items: [
      { label: "Sneakers", image: "/images/categories/helmets.jpg", href: "/c/sneakers" },
      { label: "Running Shoes", image: "/images/categories/riding-gears.jpg", href: "/c/running-shoes" },
      { label: "Formal Shoes", image: "/images/categories/rain-gear.jpg", href: "/c/formal-shoes" },
      { label: "Sandals", image: "/images/categories/accessories.jpg", href: "/c/sandals" }
    ]
  },

  featuredProducts: {
    id: "featuredProducts",
    title: "Featured Products",
    gridSettings: { columns: { desktop: 4, tablet: 2, mobile: 1 } },
    products: [
      {
        id: "shoe-001",
        title: "Infinity Runner Pro",
        price: 12500.0,
        currency: "BDT",
        image: "/images/products/helmet1.jpg",
        rating: 4.8
      },
      {
        id: "shoe-101",
        title: "Urban Street Sneaker",
        price: 4500.0,
        currency: "BDT",
        image: "/images/products/glove1.jpg",
        rating: 4.6
      },
      {
        id: "shoe-202",
        title: "Classic Leather Oxford",
        price: 6500.0,
        currency: "BDT",
        image: "/images/products/lock1.jpg",
        rating: 4.4
      },
      {
        id: "shoe-303",
        title: "Comfort Slide Sandal",
        price: 18900.0,
        currency: "BDT",
        image: "/images/products/jacket1.jpg",
        rating: 4.9
      }
    ]
  },

  newProducts: {
    id: "newProducts",
    title: "New Arrivals",
    subtitle: "Fresh footwear for your next step",
    products: [
      {
        id: "shoe-010",
        title: "CloudWalk Knit Sneaker",
        price: 9900.0,
        currency: "BDT",
        image: "/images/products/helmet2.jpg"
      },
      {
        id: "shoe-110",
        title: "TrailGrip Outdoor Shoe",
        price: 12000.0,
        currency: "BDT",
        image: "/images/products/boot1.jpg"
      },
      {
        id: "shoe-210",
        title: "Minimal Court Sneaker",
        price: 3500.0,
        currency: "BDT",
        image: "/images/products/visor1.jpg"
      },
      {
        id: "shoe-310",
        title: "FlexFit Daily Loafer",
        price: 2500.0,
        currency: "BDT",
        image: "/images/products/light1.jpg"
      }
    ]
  },

  brands: {
    id: "brands",
    title: "Our Brands",
    layout: "carousel",
    autoplay: true,
    items: [
      { name: "Nike", logo: "/images/brands/ls2.png" },
      { name: "Adidas", logo: "/images/brands/agv.png" },
      { name: "Puma", logo: "/images/brands/mt.png" },
      { name: "Skechers", logo: "/images/brands/shoei.png" },
      { name: "Bata", logo: "/images/brands/hjc.png" }
    ]
  },

  footer: {
    id: "footer",
    logo: "/images/gearx-logo.png",
    support: {
      headline: "Got Questions? Call us 24/7!",
      phone: "+88-01789-881111",
      address: "House – 183/8, Pirerbag (60 feet Road), Mirpur, Dhaka, Bangladesh",
      socials: [
        { icon: "facebook", href: "https://facebook.com/infinityshoes" },
        { icon: "instagram", href: "https://instagram.com/infinityshoes" },
        { icon: "youtube", href: "https://youtube.com/infinityshoes" }
      ]
    },
    columns: [
      {
        title: "Find It Fast",
        links: [
          { label: "Sneakers", href: "/c/sneakers" },
          { label: "Running Shoes", href: "/c/running-shoes" },
          { label: "Formal Shoes", href: "/c/formal-shoes" }
        ]
      },
      {
        title: "Quick Links",
        links: [
          { label: "About Us", href: "/about" },
          { label: "My Account", href: "/account" },
          { label: "Terms and Conditions", href: "/terms" },
          { label: "Contact Us", href: "/contact" },
          { label: "Warranty Policy", href: "/warranty-policy" }
        ]
      }
    ],
    copyright: "© Infinity Shoes Bangladesh - All Rights Reserved"
  }
};

export default landingPageData;
