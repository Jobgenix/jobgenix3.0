import React from 'react';

const JobCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Visual designer</h2>
        <p className="text-gray-600">Deloitte ● On-site</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Experience</p>
          <p className="text-gray-700">2+</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Job Type</p>
          <p className="text-gray-700">Full time</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Salary</p>
          <p className="text-gray-700">15k-25k</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;