export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container py-24">
        {/* Header Skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="h-12 w-2/3 bg-zinc-800 rounded-lg mx-auto animate-pulse" />
          <div className="h-6 w-3/4 bg-zinc-800 rounded-lg mx-auto mt-6 animate-pulse" />
        </div>

        {/* Blog Posts Skeleton */}
        <div className="space-y-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="relative isolate flex flex-col gap-8 lg:flex-row animate-pulse">
              {/* Image Skeleton */}
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-zinc-800" />
              </div>

              {/* Content Skeleton */}
              <div className="flex-1">
                <div className="flex items-center gap-x-4">
                  <div className="h-4 w-24 bg-zinc-800 rounded" />
                  <div className="h-4 w-16 bg-zinc-800 rounded" />
                </div>
                <div className="mt-3 space-y-3">
                  <div className="h-6 w-3/4 bg-zinc-800 rounded" />
                  <div className="h-4 w-full bg-zinc-800 rounded" />
                  <div className="h-4 w-2/3 bg-zinc-800 rounded" />
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-zinc-800 rounded-full" />
                    <div className="h-6 w-20 bg-zinc-800 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 