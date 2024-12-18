export const SidebarSkeleton = () => {
    return (
      <div className="w-64 bg-white shadow-md animate-pulse">
        <div className="p-4">
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <nav className="space-y-2">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </nav>
          <div className="w-full h-12 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  };