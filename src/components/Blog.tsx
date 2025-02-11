'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/data/blog';

interface BlogProps {
  showAll?: boolean;
}

export default function Blog({ showAll = false }: BlogProps) {
  const displayPosts = showAll ? posts : posts.slice(0, 3);

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>
      
      <div className="container relative">
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="text-white">Latest</span>{' '}
              <span className="gradient-text">Insights</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Stay updated with our latest articles on QA testing, automation, and industry best practices.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${showAll ? 'mt-0' : 'mt-16'} space-y-8`}
        >
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="relative group"
            >
              <div className="card overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="relative w-full lg:w-72 h-48 lg:h-auto overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.date} className="text-zinc-500">
                        {post.date}
                      </time>
                      <span className="text-zinc-500">{post.readTime}</span>
                    </div>
                    
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-xl font-semibold leading-6 text-white group-hover:text-zinc-300 transition-colors">
                        <Link href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-zinc-400">
                        {post.description}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link 
              href="/blog" 
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>View All Posts</span>
              <svg 
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M6.75 3.25L10.25 8L6.75 12.75" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
} 