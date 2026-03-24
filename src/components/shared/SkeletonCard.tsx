export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded-full w-2/3" />
          <div className="h-4 bg-gray-200 rounded-lg w-10" />
        </div>
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="flex justify-between mt-2">
          <div className="h-3 bg-gray-100 rounded-full w-24" />
          <div className="h-3 bg-gray-100 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}

export function MenuItemSkeleton() {
  return (
    <div className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
      <div className="flex-1 space-y-2.5">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
        <div className="h-4 bg-gray-200 rounded-full w-20 mt-2" />
      </div>
      <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0" />
    </div>
  );
}

export function MenuCategorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <MenuItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-pulse">
      {/* Hero placeholder */}
      <div className="h-64 md:h-80 bg-gray-200 rounded-3xl w-full" />

      {/* Category pills */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-gray-200 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Restaurant cards row */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded-full w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
