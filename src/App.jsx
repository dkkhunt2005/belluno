import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, X, MapPin, Clock, Phone, Sparkles, Music, Coffee, 
  Utensils, Users, Heart, ParkingCircle, Star, Compass, 
  Info, ChevronLeft, ChevronRight
} from 'lucide-react';

// Import local optimized assets
import facadeImg from './assets/belluno-facade.png';
import interiorImg from './assets/belluno-interior.png';
import courtyardTopImg from './assets/belluno-courtyard-top.png';
import musicPastaImg from './assets/belluno-music-pasta.png';
import officialLogo from './assets/belluno-logo-official.png';

// Official transparent brand logo component with a subtle drop shadow only (no heavy neon outer glow)
const LogoImage = ({ className, scrolled }) => {
  // Default sizes: default 240px width, scrolled 180px width
  const sizeClass = scrolled ? "w-[180px]" : "w-[240px]";
  const combinedClasses = className ? `${className} ${className.includes('w-') ? '' : sizeClass}` : sizeClass;
  return (
    <img 
      src={officialLogo} 
      alt="Belluno Cafe Official Logo" 
      className={`${combinedClasses} h-auto object-contain transition-all duration-350 ease-in-out filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] hover:drop-shadow-[0_4px_12px_rgba(200,169,106,0.3)] hover:scale-[1.03]`} 
    />
  );
};

// 3D Animated Logo Container Component
const PremiumAnimatedLogo = ({ scrolled }) => {
  const containerRef = useRef(null);
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create smooth springs for rotation angles
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });
  
  // Create smooth springs for parallax translation
  const transX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });
  const transY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };
  
  const handleMouseLeave = () => {
    // Reset to center on leave
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 cursor-pointer py-1"
      style={{ perspective: '800px' }}
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          x: transX, 
          y: transY,
          transformStyle: 'preserve-3d' 
        }}
        animate={{
          // Soft floating cycle in background (2-3px movement limit)
          y: [0, -2.5, 0]
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }
        }}
        className="relative group p-1 transition-all duration-350 ease-in-out"
      >
        <LogoImage scrolled={scrolled} className="transform-gpu" />
      </motion.div>
    </div>
  );
};

const galleryImages = [
  { id: 0, src: facadeImg, title: "The Grand Facade", subtitle: "Curved white architecture and rooftop warm lights at night" },
  { id: 1, src: interiorImg, title: "Courtyard Dining", subtitle: "Woven lamps, wooden craftsmanship, and open skylights" },
  { id: 2, src: courtyardTopImg, title: "Rooftop Nook", subtitle: "Lush vegetation, organic curved seating, and scenic Vesu views" },
  { id: 3, src: musicPastaImg, title: "Artisanal Cuisine & Music", subtitle: "Roman-style pasta accompanied by evening live acoustic sessions" }
];

const menuCategories = [
  {
    id: "coffee",
    name: "Artisan Coffee",
    desc: "Single-origin beans roasted and brewed to perfection",
    items: [
      { name: "Espresso", desc: "Concentrated and bold, extracted under precise pressure from premium Arabica beans." },
      { name: "Americano", desc: "Rich espresso shots layered over hot water for a classic, smooth cup." },
      { name: "Cappuccino", desc: "Perfectly balanced double-shot espresso under a thick pillow of velvet microfoam." },
      { name: "Latte", desc: "Creamy steamed milk poured gently over our signature espresso blend." },
      { name: "Mocha", desc: "Indulgent fusion of espresso, steamed milk, and rich Belgian dark chocolate." },
      { name: "Cold Brew", desc: "Slow-dripped for 24 hours, offering a naturally sweet, low-acid iced coffee experience." },
      { name: "Iced Coffee", desc: "Our signature espresso blend chilled over ice and served with premium milk options." }
    ]
  },
  {
    id: "matcha",
    name: "Matcha & Specialty Beverages",
    desc: "Ceremonial stone-ground Japanese matcha and hand-whisked wellness teas",
    items: [
      { name: "Classic Matcha", desc: "Pure ceremonial-grade Uji matcha whisked traditionally with hot water." },
      { name: "Strawberry Matcha", desc: "Ceremonial matcha layered over sweet organic strawberry puree and chilled milk." },
      { name: "Mango Matcha", desc: "Vibrant matcha paired with fresh Alphonso mango pulp and cold milk." },
      { name: "Iced Matcha Latte", desc: "Smooth ceremonial matcha layered with sweetened milk and served over ice." },
      { name: "Signature Green Fusion", desc: "Exclusive botanical blend of green tea, fresh mint, cucumber, and key lime." }
    ]
  },
  {
    id: "breakfast",
    name: "Breakfast & Small Plates",
    desc: "Freshly baked pastries and light morning bites",
    items: [
      { name: "Garlic Bread", desc: "Artisanal toasted sourdough brushed with garlic butter, fresh parsley, and extra virgin olive oil." },
      { name: "Bruschetta", desc: "Toasted crostini topped with diced heirloom tomatoes, fresh basil, garlic, and balsamic glaze." },
      { name: "Cheese Croissant", desc: "Flaky, buttery laminated pastry filled with a rich blend of melted Gruyère and white cheddar." },
      { name: "Mediterranean Toast", desc: "Toasted country bread topped with creamy hummus, sliced cucumbers, cherry tomatoes, and crumbled feta." },
      { name: "Veg Sandwich", desc: "Grilled multigrain bread layered with fresh garden vegetables, avocado mash, and house pesto." }
    ]
  },
  {
    id: "pasta",
    name: "Signature Pasta",
    desc: "Handcrafted house pastas tossed in rich, traditional sauces",
    items: [
      { name: "Pink Sauce Pasta", desc: "Penne tossed in a harmonious blend of creamy Parmigiano sauce and San Marzano tomato marinara." },
      { name: "Alfredo Pasta", desc: "Fettuccine coated in a rich, buttery emulsion of heavy cream and aged Parmigiano-Reggiano." },
      { name: "Arrabbiata Pasta", desc: "Rigatoni cooked in a fiery tomato sauce infused with garlic, red chili flakes, and fresh basil." },
      { name: "Aglio Olio", desc: "Spaghetti tossed in extra virgin olive oil, thinly sliced garlic, red pepper flakes, and fresh parsley." },
      { name: "Creamy Mushroom Pasta", desc: "Tagliatelle cooked in a decadent white wine, wild forest mushroom, and truffle oil cream sauce." }
    ]
  },
  {
    id: "pizza",
    name: "Artisan Pizza",
    desc: "Thin-crust Roman style pizzas cooked in a high-temp stone deck oven",
    items: [
      { name: "Margherita Pizza", desc: "San Marzano tomato base, fresh buffalo mozzarella, aromatic basil, and a drizzle of olive oil." },
      { name: "Farmhouse Pizza", desc: "Loaded with colorful bell peppers, sweet corn, mushrooms, red onions, and fresh mozzarella." },
      { name: "Four Cheese Pizza", desc: "A decadent blend of Mozzarella, Gorgonzola, Parmigiano-Reggiano, and creamy Fontina cheeses." },
      { name: "Mediterranean Veg Pizza", desc: "Topped with sun-dried tomatoes, kalamata olives, marinated artichokes, spinach, and crumbled feta." },
      { name: "Exotic Garden Pizza", desc: "Featuring baby zucchini, cherry tomatoes, wild mushrooms, baby spinach, and a drizzle of herb oil." }
    ]
  },
  {
    id: "sizzlers",
    name: "Sizzlers & Mains",
    desc: "Sizzling platters and substantial signature main courses",
    items: [
      { name: "Paneer Sizzler", desc: "Marinated cottage cheese steaks served over a bed of grilled veggies, herb rice, and hot garlic sauce." },
      { name: "Mexican Sizzler", desc: "Spiced beans and veggie patty served with Mexican rice, fries, and a smokey chipotle sauce." },
      { name: "Veg Steak Sizzler", desc: "Minced vegetable and herb cutlets served with buttered broccoli, potato wedges, and pepper sauce." },
      { name: "Mediterranean Rice Bowl", desc: "Fragrant saffron rice topped with grilled veggies, falafel, pickled turnip, and classic tahini drizzle." },
      { name: "Grilled Cottage Cheese", desc: "Herb-marinated paneer served with warm quinoa salad, charred asparagus, and lemon herb emulsion." }
    ]
  },
  {
    id: "salads",
    name: "Salads & Healthy Bowls",
    desc: "Fresh, crisp garden greens and nutrient-rich bowls",
    items: [
      { name: "Caesar Salad", desc: "Crisp romaine lettuce tossed in house Caesar dressing with sourdough croutons and shaved parmesan." },
      { name: "Greek Salad", desc: "Ripe tomatoes, crisp cucumbers, red onions, bell peppers, Kalamata olives, and a block of premium Greek feta." },
      { name: "Mediterranean Bowl", desc: "A colorful assembly of chickpeas, avocado, baby spinach, cucumbers, cherry tomatoes, and mint tzatziki." },
      { name: "Quinoa Veg Bowl", desc: "Fluffy tri-color quinoa paired with roasted sweet potatoes, kale, edamame, and tahini dressing." }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    desc: "Sweet artisanal creations crafted by our master pastry chefs",
    items: [
      { name: "Tiramisu", desc: "Classic Italian dessert made of espresso-dipped ladyfingers layered with whipped mascarpone cream." },
      { name: "Brownie with Ice Cream", desc: "Warm, fudgy chocolate brownie topped with a scoop of premium Madagascan vanilla bean gelato." },
      { name: "Cheesecake", desc: "Rich and creamy New York style baked cheesecake served with a tangy berry compote." },
      { name: "Chocolate Lava Cake", desc: "Decadent chocolate cake with a warm, molten liquid chocolate center served with vanilla gelato." },
      { name: "Belgian Waffle", desc: "Fresh, warm waffle dusted with powdered sugar, served with fresh berries and maple syrup." }
    ]
  },
  {
    id: "mocktails",
    name: "Mocktails & Coolers",
    desc: "Refreshing, ice-cold botanical elixirs and custom blends",
    items: [
      { name: "Mojito", desc: "Muddled fresh mint leaves, lime wedges, simple syrup, and sparkling soda over crushed ice." },
      { name: "Blue Lagoon", desc: "A vibrant blend of blue curaçao syrup, fresh lemon juice, mint, and carbonated lemonade." },
      { name: "Watermelon Cooler", desc: "Freshly pressed watermelon juice infused with mint sprigs, lime, and a touch of sea salt." },
      { name: "Citrus Sparkler", desc: "Zesty mixture of orange, grapefruit, and lime juices topped with sparkling tonic water." },
      { name: "Tropical Sunset", desc: "Layered mocktail of sweet mango nectar, passionfruit pulp, orange juice, and a splash of grenadine." }
    ]
  }
];

const reviewsData = [
  {
    name: "Aarav Mehta",
    theme: "Exceptional Ambience",
    rating: 5,
    comment: "The architecture is absolutely breathtaking. Feels exactly like the high-end open courtyards in Dubai. A perfect destination for Surat."
  },
  {
    name: "Riya Sharma",
    theme: "Rooftop Experience",
    rating: 5,
    comment: "Sitting on the curved bench under the warm lanterns with a cold brew is magical. Best rooftop vibe in Surat by far."
  },
  {
    name: "Ishaan Jhaveri",
    theme: "Live Music",
    rating: 5,
    comment: "The acoustic session on Saturday was incredibly curated. The combination of beautiful architecture, live performance, and great coffee is unmatched."
  },
  {
    name: "Meera Patel",
    theme: "Great Hospitality",
    rating: 5,
    comment: "Attentive, courteous staff who understand luxury hospitality. The Pistachio Tiramisu is a masterpiece."
  },
  {
    name: "Kabir Desai",
    theme: "Premium Dining",
    rating: 5,
    comment: "Top-tier ingredients. The Roman Cacio e Pepe was perfectly executed. The price range (₹400-₹1600 per person) is excellent value for this luxury standard."
  },
  {
    name: "Sneha Goenka",
    theme: "Family Friendly",
    rating: 5,
    comment: "Extremely family-friendly but still maintains its exclusive, premium feel. Highly accessible layout and parking."
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeMenuTab, setActiveMenuTab] = useState('coffee');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulating luxury loading screen delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleLightboxNav = (direction) => {
    if (lightboxIndex === null) return;
    if (direction === 'prev') {
      setLightboxIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    } else {
      setLightboxIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      {/* 0. PREMIUM INITIAL LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1F4A42]"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          >
            <div className="relative flex flex-col items-center text-center">
              {/* Fade-in and elegant glow pulse animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: ["drop-shadow(0 0 4px rgba(200,169,106,0.15))", "drop-shadow(0 0 16px rgba(200,169,106,0.6))", "drop-shadow(0 0 4px rgba(200,169,106,0.15))"]
                }}
                transition={{ 
                  opacity: { duration: 1.2, ease: "easeOut" },
                  scale: { duration: 1.2, ease: "easeOut" },
                  filter: { 
                    repeat: Infinity, 
                    duration: 3.5, 
                    ease: "easeInOut" 
                  }
                }}
              >
                <LogoImage className="w-[180px] md:w-[260px] h-auto object-contain" />
              </motion.div>
              
              {/* Three dots loader directly below logo */}
              <motion.div 
                className="mt-4 flex items-center justify-center space-x-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
              
              {/* Vesu Surat close label */}
              <motion.p 
                className="mt-2.5 text-[10px] font-medium tracking-[0.3em] text-warm-beige/70 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Vesu, Surat
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#F5F1EA] text-[#234034] selection:bg-gold-accent selection:text-forest-green">
        
        {/* 1. GLASSMORPHISM NAVIGATION BAR */}
        <header 
          style={{ 
            height: scrolled ? '75px' : '110px',
            transition: 'all 0.35s ease'
          }}
          className={`fixed top-0 left-0 right-0 z-40 flex items-center ${
            scrolled 
              ? 'bg-white/92 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]' 
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <a href="#hero" className="flex items-center">
              {/* Premium 3D animated vector logo (2x-3x larger for luxury presence) */}
              <PremiumAnimatedLogo scrolled={scrolled} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-10">
              {[
                { href: "#about", label: "Story" },
                { href: "#experiences", label: "Experiences" },
                { href: "#gallery", label: "Gallery" },
                { href: "#menu", label: "Menu" },
                { href: "#reviews", label: "Reviews" }
              ].map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  style={{ 
                    textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.4)',
                    color: scrolled ? '#234034' : '#F5F1EA',
                    transition: 'all 300ms ease'
                  }}
                  className="text-sm font-semibold tracking-widest uppercase hover:!text-[#C8A96A]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Navigation Trigger */}
            <button 
              className={`lg:hidden flex items-center justify-center p-2 transition-colors duration-300 min-h-[44px] min-w-[44px] ${
                scrolled ? 'text-[#234034]' : 'text-[#F5F1EA]'
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              style={{ filter: scrolled ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
            >
              <Menu size={26} />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 z-50 bg-forest-green/95 backdrop-blur-lg flex flex-col justify-between p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between">
                <LogoImage className="h-[48px]" />
                <button 
                  className="flex items-center justify-center p-2 text-warm-beige hover:text-gold-accent min-h-[44px] min-w-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-center my-auto">
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-2xl font-serif tracking-wider text-cream hover:text-gold-accent transition-colors"
                >
                  About Belluno
                </a>
                <a 
                  href="#experiences" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-2xl font-serif tracking-wider text-cream hover:text-gold-accent transition-colors"
                >
                  Experiences
                </a>
                <a 
                  href="#gallery" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-2xl font-serif tracking-wider text-cream hover:text-gold-accent transition-colors"
                >
                  Gallery
                </a>
                <a 
                  href="#menu" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-2xl font-serif tracking-wider text-cream hover:text-gold-accent transition-colors"
                >
                  Culinary Collection
                </a>
                <a 
                  href="#reviews" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-2xl font-serif tracking-wider text-cream hover:text-gold-accent transition-colors"
                >
                  Reviews
                </a>
              </nav>

              <div className="text-center text-xs text-warm-beige/60 space-y-2">
                <p>VIP Road, Opp. Marina Grand Hospital, Vesu, Surat</p>
                <p>Open Daily until 11:30 PM</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* 2. HERO SECTION */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background image configured for mobile and desktop alignment */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source media="(max-width: 767px)" srcSet={facadeImg} />
              <img 
                src={facadeImg} 
                alt="Belluno Courtyard Seating Area" 
                className="w-full h-full object-cover object-center md:object-top scale-100 transform transition-transform duration-[4000ms] ease-out filter brightness-95" 
              />
            </picture>
            <div className="absolute inset-0 overlay-gradient z-10" />
            
            {/* Large brand watermark logo behind the headline (6% opacity) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden">
              <img 
                src={officialLogo} 
                className="w-[85%] max-w-[720px] opacity-[0.06] transform scale-110 object-contain" 
                alt="Belluno Watermark" 
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-cream pt-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <span className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.3em] text-gold-accent uppercase mb-4">
                <Sparkles size={12} />
                <span>Mediterranean Sanctuary</span>
                <Sparkles size={12} />
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-cream mb-6 leading-tight"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              Where Coffee <br className="sm:hidden" /> Meets Luxury
            </motion.h1>

            <motion.p 
              className="text-base sm:text-lg md:text-xl font-light tracking-wide text-warm-beige/95 max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            >
              An elevated cafe experience in the heart of Vesu, Surat. Surrounded by organic plaster walls, rich wooden detailing, and a gorgeous rooftop skyline.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            >
              <a 
                href="#menu" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-gold-accent hover:bg-cream text-forest-green hover:text-forest-green font-semibold tracking-widest text-xs uppercase rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg min-h-[44px]"
              >
                Explore Menu
              </a>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center text-warm-beige/40 animate-pulse">
            <span className="text-[10px] tracking-[0.25em] uppercase mb-2">Scroll to discover</span>
            <div className="w-[1px] h-10 bg-warm-beige/40" />
          </div>
        </section>


        {/* 3. ABOUT BELLUNO */}
        <section id="about" className="py-20 md:py-28 px-6 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Image Collage Group */}
              <div className="lg:col-span-6 relative flex flex-col space-y-6">
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3] transform transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src={courtyardTopImg} 
                    alt="Rooftop Courtyard Seating" 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-4 left-4 bg-forest-green/80 backdrop-blur-md px-4 py-2 rounded-full text-xs text-cream tracking-wide">
                    Mediterranean Villa Vibe
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-square transform transition-transform duration-700 hover:scale-[1.02]">
                    <img 
                      src={interiorImg} 
                      alt="Woven light fixtures interior" 
                      loading="lazy" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-square transform transition-transform duration-700 hover:scale-[1.02]">
                    <img 
                      src={musicPastaImg} 
                      alt="Artisanal pasta bowl" 
                      loading="lazy" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>

              {/* Storytelling Text */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase">Our Narrative</span>
                  <h2 className="text-3xl sm:text-5xl font-serif tracking-wide text-forest-green leading-tight">
                    An Oasis of Architectural Splendor & Taste
                  </h2>
                </div>

                <p className="text-[#4A3728]/95 font-light leading-relaxed text-base sm:text-lg">
                  Inspired by the timeless romance of Mediterranean courtyard estates and coastal villas, Belluno Cafe represents Surat's premier luxury destination. Our space features hand-finished organic plaster arches, signature wooden ceiling columns, and beautiful custom woven pendant lights that cast a golden, dreamy glow as twilight settles over Vesu.
                </p>

                <p className="text-[#4A3728]/95 font-light leading-relaxed text-base sm:text-lg">
                  Whether you are seeking a serene sanctuary for morning meetings, a relaxed rooftop lounge for family celebrations, or a rhythmic evening filled with curated live acoustic music, Belluno blends premium dining with uncompromising hospitality.
                </p>

                {/* Specific features and pricing information */}
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-warm-beige/50">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-gold-accent uppercase mb-1">Average Cost</h4>
                    <p className="text-2xl font-serif text-forest-green">₹400 – ₹1600</p>
                    <p className="text-xs text-[#4A3728]/60">per person estimate</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-gold-accent uppercase mb-1">Experience Focus</h4>
                    <p className="text-2xl font-serif text-forest-green">Artisan & Global</p>
                    <p className="text-xs text-[#4A3728]/60">Gourmet hospitality</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 4. SIGNATURE EXPERIENCES */}
        <section id="experiences" className="py-20 bg-[#DCCBB8]/20 border-y border-warm-beige/30 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase">Exclusive Offerings</span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-forest-green">The Elements of Luxury</h2>
              <p className="text-sm text-[#4A3728]/80 font-light leading-relaxed">
                Carefully designed features tailored to elevate your dining journey, creating unforgettable moments with every visit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Compass className="w-5 h-5 text-gold-accent" />, title: "Rooftop Seating", desc: "Enjoy open skyline views beneath our custom arched pergolas and curated warm lantern arrays." },
                { icon: <Music className="w-5 h-5 text-gold-accent" />, title: "Live Music & Performances", desc: "Soothing acoustic artists and classical guitarists setting an premium weekend backdrop." },
                { icon: <Coffee className="w-5 h-5 text-gold-accent" />, title: "Artisan Coffee", desc: "Meticulously roasted single-origin beans prepared by certified specialty baristas." },
                { icon: <Utensils className="w-5 h-5 text-gold-accent" />, title: "Premium Dining", desc: "Authentic Roman thin-crust flatbreads, homemade pasta, and gourmet continental sizzlers." },
                { icon: <Users className="w-5 h-5 text-gold-accent" />, title: "Family & Kids Friendly", desc: "A welcoming, peaceful, and accessible layout that respects privacy for gatherings." },
                { icon: <ParkingCircle className="w-5 h-5 text-gold-accent" />, title: "Valet & Wheelchair Access", desc: "Hassle-free parking solutions and smooth architectural pathways for all valued guests." }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel p-8 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gold-accent/40 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center mb-6 group-hover:bg-forest-green group-hover:text-cream transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-serif text-forest-green mb-3">{item.title}</h3>
                    <p className="text-sm font-light text-[#4A3728]/85 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center text-xs font-semibold tracking-widest uppercase text-gold-accent group-hover:text-forest-green transition-colors">
                    <span>Learn More</span>
                    <ChevronRight size={14} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 5. INTERACTIVE GALLERY */}
        <section id="gallery" className="py-20 md:py-28 px-6 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
              <div className="space-y-3 mb-6 md:mb-0">
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase">Captured Splendor</span>
                <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-forest-green">Architectural Visuals</h2>
              </div>
              <p className="text-sm text-[#4A3728]/80 font-light max-w-md leading-relaxed">
                Click any image to view details of our Mediterranean-styled layout and culinary masterpieces in fullscreen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div 
                  key={image.id}
                  className="group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-md aspect-[3/4] transition-all duration-500 hover:shadow-xl"
                  onClick={() => setLightboxIndex(image.id)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-green/90 via-forest-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                  <div className="absolute bottom-6 left-6 right-6 text-cream translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h4 className="text-lg font-serif text-gold-accent mb-1">{image.title}</h4>
                    <p className="text-xs text-warm-beige/80 font-light leading-relaxed">{image.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM LIGHTBOX OVERLAY */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div 
              className="fixed inset-0 z-50 bg-forest-green/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                className="absolute top-6 right-6 text-cream hover:text-gold-accent p-2 min-h-[44px] min-w-[44px]"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
              >
                <X size={28} />
              </button>

              <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-between">
                <button 
                  className="text-cream hover:text-gold-accent p-2 transition-colors min-h-[44px] min-w-[44px]"
                  onClick={() => handleLightboxNav('prev')}
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={36} />
                </button>

                <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <motion.img 
                    key={lightboxIndex}
                    src={galleryImages[lightboxIndex].src} 
                    alt={galleryImages[lightboxIndex].title} 
                    className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing touch-pan-y"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 100) {
                        handleLightboxNav('prev');
                      } else if (info.offset.x < -100) {
                        handleLightboxNav('next');
                      }
                    }}
                  />
                  <div className="text-center mt-6 text-cream max-w-xl">
                    <h3 className="text-xl font-serif text-gold-accent">{galleryImages[lightboxIndex].title}</h3>
                    <p className="text-sm font-light text-warm-beige/85 mt-2">{galleryImages[lightboxIndex].subtitle}</p>
                  </div>
                </div>

                <button 
                  className="text-cream hover:text-gold-accent p-2 transition-colors min-h-[44px] min-w-[44px]"
                  onClick={() => handleLightboxNav('next')}
                  aria-label="Next Image"
                >
                  <ChevronRight size={36} />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex space-x-2 mt-4">
                {galleryImages.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${idx === lightboxIndex ? 'bg-gold-accent w-6' : 'bg-warm-beige/30'}`}
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* 6. CULINARY COLLECTION */}
        <section id="menu" className="py-20 md:py-28 bg-[#DCCBB8]/10 border-t border-warm-beige/20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16 space-y-4">
              <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase">Artisanal Curation</span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-forest-green">Culinary Collection</h2>
              <p className="text-sm text-[#4A3728]/80 font-light leading-relaxed">
                Crafted with passion, inspired by Mediterranean hospitality.
              </p>
            </div>

            {/* Menu Tabs Wrapper */}
            <div className="flex items-center justify-start lg:justify-center gap-3 mb-8 pb-4 overflow-x-auto scrollbar-none whitespace-nowrap px-4 -mx-6 lg:mx-0 lg:px-0">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 min-h-[44px] ${
                    activeMenuTab === cat.id 
                      ? 'bg-[#234034] text-[#F5F1EA] shadow-md shadow-[#234034]/20' 
                      : 'text-[#4A3728]/70 hover:text-gold-accent hover:bg-[#DCCBB8]/20 bg-white/40 border border-warm-beige/20'
                  }`}
                  onClick={() => setActiveMenuTab(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Active Category Description */}
            <div className="text-center max-w-xl mx-auto mb-12">
              <p className="text-sm font-serif italic text-gold-accent">
                {menuCategories.find((cat) => cat.id === activeMenuTab)?.desc}
              </p>
            </div>

            {/* Active Tab Menu Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {menuCategories
                  .find((cat) => cat.id === activeMenuTab)
                  ?.items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="bg-white/60 backdrop-blur-sm border border-warm-beige/30 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(35,64,52,0.02)] hover:shadow-[0_10px_30px_rgba(200,169,106,0.08)] hover:border-[#C8A96A]/40 transition-all duration-300 group"
                    >
                      <div className="space-y-3">
                        <div className="h-[2px] w-8 bg-[#C8A96A]/30 group-hover:w-16 transition-all duration-300" />
                        <h4 className="text-lg font-serif font-semibold text-forest-green group-hover:text-gold-accent transition-colors duration-300">{item.name}</h4>
                        <p className="text-xs font-light text-[#4A3728]/80 leading-relaxed font-sans">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            <div className="text-center mt-16">
              <p className="text-xs text-[#4A3728]/60 italic">
                * Please inform our hospitality agents regarding any nut, dairy, or gluten allergies before placing your order.
              </p>
            </div>
          </div>
        </section>


        {/* 7. TESTIMONIAL / REVIEWS SECTION */}
        <section id="reviews" className="py-20 md:py-28 px-6 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Rating Summary Block */}
              <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase">Guest Sentiments</span>
                <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-forest-green leading-tight">Trusted & Highly Rated</h2>
                
                <div className="bg-[#DCCBB8]/20 p-8 rounded-3xl border border-warm-beige/30 space-y-4">
                  <div className="flex items-center justify-center lg:justify-start space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={20} className="fill-gold-accent text-gold-accent" />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-4xl font-serif text-forest-green">4.7 / 5</h3>
                    <p className="text-xs tracking-wider uppercase text-gold-accent font-semibold mt-1">
                      Trusted by 275+ Guests
                    </p>
                  </div>
                  <p className="text-xs font-light text-[#4A3728]/70 leading-relaxed">
                    Extracted authentic customer feedback indicating outstanding ambience, live entertainment, and artisan beverage quality.
                  </p>
                </div>
              </div>

              {/* Reviews Card Marquee/Navigator */}
              <div className="lg:col-span-8 space-y-6">
                <div className="relative glass-panel p-8 md:p-10 rounded-[2rem] border border-warm-beige/30 min-h-[220px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeReviewIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold tracking-wider text-gold-accent uppercase bg-forest-green/10 px-3 py-1 rounded-full">
                          {reviewsData[activeReviewIndex].theme}
                        </span>
                        <div className="flex space-x-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className="fill-gold-accent text-gold-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-serif italic text-forest-green leading-relaxed mb-6">
                        “{reviewsData[activeReviewIndex].comment}”
                      </p>
                      <h4 className="text-xs font-semibold tracking-widest text-[#4A3728] uppercase">
                        — {reviewsData[activeReviewIndex].name}
                      </h4>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <div className="flex justify-end space-x-2 mt-6 border-t border-warm-beige/20 pt-4">
                    <button 
                      className="w-10 h-10 rounded-full border border-warm-beige/50 flex items-center justify-center text-forest-green hover:bg-forest-green hover:text-cream transition-colors min-h-[44px]"
                      onClick={() => setActiveReviewIndex(prev => (prev === 0 ? reviewsData.length - 1 : prev - 1))}
                      aria-label="Previous Review"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-full border border-warm-beige/50 flex items-center justify-center text-forest-green hover:bg-forest-green hover:text-cream transition-colors min-h-[44px]"
                      onClick={() => setActiveReviewIndex(prev => (prev === reviewsData.length - 1 ? 0 : prev + 1))}
                      aria-label="Next Review"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 8. VISIT & CONTACT SECTION */}
        <section id="contact" className="py-20 md:py-28 px-6 bg-[#DCCBB8]/20 border-t border-warm-beige/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Visit Details / Map Info */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-[0.25em] text-gold-accent uppercase">Experience Belluno</span>
                  <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-forest-green">Visit Our Courtyard</h2>
                  <p className="text-sm text-[#4A3728]/85 font-light leading-relaxed">
                    Walk in anytime to experience our Mediterranean-inspired architectural destination, premium artisan brews, and curated global cuisine.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-gold-accent" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wider text-forest-green uppercase mb-1">Our Location</h4>
                      <p className="text-sm font-light text-[#4A3728] leading-relaxed">
                        VIP Road, Opp. Marina Grand Hospital,<br />
                        Gail Colony, Vesu,<br />
                        Surat, Gujarat 395007
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <Clock className="text-gold-accent" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wider text-forest-green uppercase mb-1">Hours of Hospitality</h4>
                      <p className="text-sm font-light text-[#4A3728]">Open Daily: 11:00 AM – 11:30 PM</p>
                      <p className="text-xs text-[#4A3728]/60 mt-0.5">Live acoustic sets: Friday – Sunday 8 PM onwards</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0">
                      <Phone className="text-gold-accent" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wider text-forest-green uppercase mb-1">Contact Details</h4>
                      <p className="text-sm font-light text-[#4A3728]">0261 456 7890 / +91 98765 43210</p>
                      <p className="text-xs text-[#4A3728]/60 mt-0.5">Direct inquiries, events, and corporate bookings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Statement / Amenities Card */}
              <div className="space-y-6 bg-forest-green text-cream p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-warm-beige/35 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                {/* Subtle watermark background logo */}
                <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none">
                  <img src={officialLogo} className="w-[200px] object-contain" alt="" />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-serif text-gold-accent">A Sanctuary of Comfort</h3>
                  <p className="text-sm font-light text-warm-beige/90 leading-relaxed">
                    Designed to inspire relaxation, Belluno blends high-end architecture with handcrafted amenities to ensure every guest experiences refined luxury.
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-[2rem] space-y-3 relative z-10">
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-gold-accent uppercase flex items-center gap-1.5">
                    <Info size={12} />
                    <span>Premium Amenities</span>
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs font-light text-warm-beige">
                    <li>• Valet Parking Available</li>
                    <li>• Wheelchair Accessible</li>
                    <li>• Children & Family Friendly</li>
                    <li>• High-Speed Guest Wi-Fi</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 9. PREMIUM FOOTER */}
        <footer className="bg-forest-green text-cream pt-16 pb-8 border-t border-gold-accent/20 px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gold-accent/15">
              
              {/* Left Column Brand */}
              <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                <LogoImage className="h-[85px]" scrolled={scrolled} />
                <p className="text-sm font-light text-warm-beige/80 leading-relaxed max-w-sm">
                  Experience a Mediterranean-inspired architectural destination where specialty artisan coffee meets world-class hospitality in the heart of Vesu, Surat.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-8 h-8 rounded-full border border-warm-beige/25 flex items-center justify-center text-warm-beige hover:text-gold-accent hover:border-gold-accent transition-colors" aria-label="Instagram">
                    <span className="text-xs font-semibold">IG</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-warm-beige/25 flex items-center justify-center text-warm-beige hover:text-gold-accent hover:border-gold-accent transition-colors" aria-label="Facebook">
                    <span className="text-xs font-semibold">FB</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-warm-beige/25 flex items-center justify-center text-warm-beige hover:text-gold-accent hover:border-gold-accent transition-colors" aria-label="Twitter">
                    <span className="text-xs font-semibold">X</span>
                  </a>
                </div>
              </div>

              {/* Middle Navigation Links */}
              <div className="lg:col-span-3 space-y-4 text-center lg:text-left">
                <h4 className="text-xs font-semibold tracking-widest text-gold-accent uppercase">Explore Navigation</h4>
                <ul className="space-y-2 text-sm font-light text-warm-beige/70">
                  <li><a href="#about" className="hover:text-gold-accent transition-colors">Our Story</a></li>
                  <li><a href="#experiences" className="hover:text-gold-accent transition-colors">Experiences</a></li>
                  <li><a href="#menu" className="hover:text-gold-accent transition-colors">Culinary Collection</a></li>
                  <li><a href="#gallery" className="hover:text-gold-accent transition-colors">Gallery</a></li>
                  <li><a href="#contact" className="hover:text-gold-accent transition-colors">Visit & Contact</a></li>
                </ul>
              </div>

              {/* Right Operating Hours / Info */}
              <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
                <h4 className="text-xs font-semibold tracking-widest text-gold-accent uppercase">Address & Operating Hours</h4>
                <p className="text-sm font-light text-warm-beige/85 leading-relaxed">
                  VIP Road, Opp. Marina Grand Hospital,<br />
                  Gail Colony, Vesu, Surat, Gujarat 395007
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-warm-beige/75">
                    <span className="font-semibold text-gold-accent">Open Daily:</span> 11:00 AM – 11:30 PM
                  </p>
                  <p className="text-xs text-warm-beige/50 italic">
                    Parking facilities are available on-premise
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-light text-warm-beige/50 space-y-4 md:space-y-0">
              <p>© {new Date().getFullYear()} Belluno Cafe. All Rights Reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-gold-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gold-accent transition-colors">Terms of Service</a>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}
