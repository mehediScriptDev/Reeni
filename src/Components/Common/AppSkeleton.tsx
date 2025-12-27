import React from 'react';

const AppSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto mt-6 lg:mt-12">
        <div className="bg-white rounded-lg relative pt-6">
          <div className="p-6">
            <div className="space-y-3 p-4">
              <div className="hidden md:grid grid-cols-6 gap-4 bg-gray-100 rounded-lg p-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-300 rounded h-4 animate-pulse"></div>
                ))}
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                  <div className="hidden md:grid grid-cols-6 gap-4">
                    <div className="bg-gray-200 rounded h-5"></div>
                    <div className="bg-gray-200 rounded h-5"></div>
                    <div className="bg-gray-200 rounded h-5"></div>
                    <div className="bg-gray-200 rounded h-5"></div>
                    <div className="bg-gray-200 rounded h-5 w-20"></div>
                    <div className="flex gap-2">
                      <div className="bg-gray-200 rounded h-8 w-8"></div>
                      <div className="bg-gray-200 rounded h-8 w-8"></div>
                    </div>
                  </div>
                  <div className="md:hidden space-y-2">
                    <div className="flex justify-between">
                      <div className="bg-gray-200 rounded h-6 w-24"></div>
                      <div className="bg-gray-200 rounded h-5 w-16"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-200 rounded h-4"></div>
                      <div className="bg-gray-200 rounded h-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSkeleton;
