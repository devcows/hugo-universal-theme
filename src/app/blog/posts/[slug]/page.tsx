'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/data/blog';
import type { BlogPost } from '@/data/blog';

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the post that matches the slug
  const post = posts.find((p: BlogPost) => {
    const postSlug = p.href.split('/').pop();
    return postSlug === slug;
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navigation />
        <main className="container py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
            <p className="mt-4 text-zinc-400">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog" className="mt-8 inline-block btn">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main>
        <article className="relative py-24">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
            <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
          </div>

          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back to blog link */}
              <Link 
                href="/blog"
                className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-8"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Blog
              </Link>

              {/* Article header */}
              <header className="mb-12">
                <div className="flex items-center gap-x-4 text-xs mb-6">
                  <time dateTime={post.date} className="text-zinc-500">
                    {post.date}
                  </time>
                  <span className="text-zinc-500">{post.readTime}</span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Featured image */}
              <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article content */}
              <div className="prose prose-invert prose-zinc max-w-none">
                {/* Introduction */}
                <p className="lead text-lg">{post.content?.introduction}</p>

                {/* Content Sections */}
                {post.content?.sections.map((section, index) => (
                  <div key={index} className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="whitespace-pre-line text-zinc-400">
                      {section.content}
                    </div>
                  </div>
                ))}

                {/* Conclusion */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Conclusion
                  </h2>
                  <div className="whitespace-pre-line text-zinc-400">
                    {post.content?.conclusion}
                  </div>
                </div>

                {/* Share and Tags Section */}
                <div className="mt-12 pt-6 border-t border-zinc-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                        }}
                        className="inline-flex items-center text-sm text-zinc-400 hover:text-white"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
} 