export const JobCardSkeleton = () => (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="mt-auto h-10 bg-gray-200 rounded w-full"></div>
    </div>
);
