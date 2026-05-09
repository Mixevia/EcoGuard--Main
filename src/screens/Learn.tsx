import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trees, BookOpen, Lightbulb, Shield, 
  ChevronRight, ArrowLeft, Share2, Bookmark,
  Clock, User, PlayCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Wetland Protection in Wakiso',
    category: 'Conservation',
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=500&q=80',
    excerpt: 'How local communities in Entebbe are saving the lungs of Lake Victoria...',
    content: 'Wetlands in the Wakiso district are crucial ecosystems that provide water purification and flood control for the greater Kampala area. However, they face threats from urban encroachment. Community-led initiatives are now focusing on sustainable mapping and protection strategies under the NEMA guidelines...',
    readTime: '6 min',
    author: 'Dr. Jane Namatovu'
  },
  {
    id: '2',
    title: 'Spotting Illegal Logging',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80',
    excerpt: 'A guide to protected forest reserves in the Albertine Rift...',
    content: 'Recognizing illegal logging in protected areas like Budongo or Mabira involves observing specific signs such as unmarked machinery and lack of official District Forest Officer badges. This guide explains the verification process and how to use EcoGuard to report such incidents securely...',
    readTime: '4 min',
    author: 'Peter Okello'
  },
  {
    id: '3',
    title: 'Nakawa Recycling Hub',
    category: 'Urban',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80',
    excerpt: 'Turning garbage into gold: The future of Nakawa waste management...',
    content: 'In the heart of Nakawa, a new movement is transforming how Kampala views waste. From organic farming initiatives to plastic-to-paving stone processing, learn how you can participate in the circular economy of your district...',
    readTime: '5 min',
    author: 'Emmanuel Musoke'
  }
];

const MotionSection = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.4, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export const Learn: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Conservation', 'Guides', 'Urban', 'Policies'];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="flex flex-col min-h-full">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-on-surface tracking-tight">Eco Library</h1>
              <p className="text-sm text-outline font-medium">Knowledge to protect our heritage</p>
            </div>

            {/* Featured Course Banner */}
            <section className="bg-primary rounded-[28px] p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20">
              <div className="absolute -right-8 -bottom-8 opacity-20 rotate-12">
                <BookOpen size={160} />
              </div>
              <div className="relative z-10 space-y-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-wider">New Course</span>
                <h2 className="text-xl font-black leading-tight max-w-[180px]">Citizen Science: Beginner Forest Mapping</h2>
                <button className="flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-xl text-xs font-black shadow-sm active:scale-95 transition-all">
                  Start Learning <PlayCircle size={16} />
                </button>
              </div>
            </section>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-tight transition-all",
                    activeCategory === cat ? "bg-on-surface text-surface" : "bg-surface-container text-outline border border-outline-variant"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <div className="flex flex-col gap-6">
              {filteredArticles.map((article, idx) => (
                <MotionSection 
                  key={article.id}
                  delay={idx * 0.1}
                  onClick={() => setSelectedArticle(article)}
                  className="flex gap-4 group cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <div className="flex flex-col justify-center gap-1 min-w-0">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">{article.category}</span>
                    <h3 className="text-sm font-black text-on-surface leading-tight line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-outline font-bold">
                      <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                      <span className="flex items-center gap-1"><User size={10} /> {article.author}</span>
                    </div>
                  </div>
                </MotionSection>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-xl z-20 py-2 -mx-4 px-4 overflow-hidden">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-3 bg-surface-container rounded-2xl text-on-surface active:scale-90 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex gap-2">
                <button className="p-3 bg-surface-container rounded-2xl text-on-surface"><Bookmark size={20} /></button>
                <button className="p-3 bg-surface-container rounded-2xl text-on-surface"><Share2 size={20} /></button>
              </div>
            </div>

            <div className="w-full h-64 rounded-[32px] overflow-hidden shadow-xl border border-outline-variant">
              <img src={selectedArticle.image} className="w-full h-full object-cover" alt="" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">{selectedArticle.category}</span>
                <h1 className="text-3xl font-black text-on-surface leading-[1.1] tracking-tighter">{selectedArticle.title}</h1>
                <div className="flex items-center gap-4 py-2 border-y border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white font-black text-xs">
                      {selectedArticle.author[0]}
                    </div>
                    <span className="text-xs font-black text-on-surface">{selectedArticle.author}</span>
                  </div>
                  <span className="text-xs font-bold text-outline">• {selectedArticle.readTime} read</span>
                </div>
              </div>

              <div className="text-sm font-medium text-on-surface-variant leading-relaxed space-y-4">
                <p>{selectedArticle.content}</p>
                <p>Environment conservation starts with awareness. By understanding the intricate balance of our local ecosystems, we can make informed decisions that benefit both nature and the community. EcoGuard UG provides the data, but it's your action that drives change.</p>
              </div>
            </div>

            <footer className="mt-8 pt-8 border-t border-outline-variant flex flex-col items-center text-center gap-4 pb-12">
              <div className="p-4 bg-surface-container-low rounded-2xl w-full">
                <h4 className="text-xs font-black text-on-surface uppercase mb-1">Knowledge is Power</h4>
                <p className="text-[11px] text-outline font-medium">Share this article with your community to spread awareness.</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
