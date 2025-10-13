export default function CommonLayout() {
  return (
    <main className="h-auto p-4 pt-20 md:ml-64">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
      </div>
    </main>
  );
}