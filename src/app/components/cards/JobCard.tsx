"use client";

import React from "react";

// The component is defined as a constant
export const JobCard = ({ job }) => {
  // Add a guard clause to prevent errors if the job prop is missing
  if (!job) {
    return null; // Or render a placeholder/skeleton card
  }

    const formatTimeAgo = (dateString) => {
    if (!dateString) return ""; // Handle case where date is missing
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 24) {
      return `${diffInHours}h Ago`;
    } else {
      return `${diffInDays}d Ago`;
    }
  };

  const logoUrl = `https://logo.clearbit.com/${job.companyName
    .toLowerCase()
    .replace(/\s/g, "")}.com?size=80&format=png`;
  const defaultLogo =
    "https://placehold.co/80x80/EBF4FF/3B82F6?text=Logo&font=inter";

  // The API provides jobDescription as a single string. We split it by newlines to create a list.
  const descriptionPoints = job.jobDescription
    ? job.jobDescription.split(/\s*(?=\d+\.)/).filter((point) => point.trim() !== "")
    : [];

  return (
    <div className="w-full max-w-[316px] h-[360px] bg-white rounded-lg shadow-md shadow-[#D3D3D326] p-6 flex flex-col transition-transform hover:scale-105">
      <div className="flex justify-between items-start mb-4 ">
        <div className="w-14 h-14 bg-gradient-to-r from-[#FEFEFD] to-[#F1F1F1] shadow-md shadow-[#94949440] rounded-lg flex items-center justify-center">
          <img
            src={logoUrl}
            alt={`${job.companyName} logo`}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.currentTarget.src = defaultLogo;
            }}
          />
        </div>
        <span className="bg-[#B0D9FF] text-[#000000] text-xs font-semibold px-2 py-2 rounded-lg">
          {formatTimeAgo(job.datePosted)}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 ">
        {job.jobTitle}
      </h3>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 my-3">
        <div className="flex items-center gap-x-1.5">
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7 14.75C11.7 12.7618 9.28233 11.15 6.29999 11.15C3.31766 11.15 0.899994 12.7618 0.899994 14.75M15.3 12.05V9.35M15.3 9.35V6.65M15.3 9.35H12.6M15.3 9.35H18M6.29999 8.45C4.31177 8.45 2.69999 6.83822 2.69999 4.85C2.69999 2.86177 4.31177 1.25 6.29999 1.25C8.28822 1.25 9.89999 2.86177 9.89999 4.85C9.89999 6.83822 8.28822 8.45 6.29999 8.45Z"
              stroke="#5A5A5A"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>{job.requirements||"1-3"} yr Exp</span>
        </div>
        {/* Group 2: Job Type */}
        <div className="flex items-center gap-x-1.5">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.76364 16.3408H3.49091M3.49091 16.3408H12.1273M3.49091 16.3408V4.42274C3.49091 3.45538 3.49091 2.97133 3.67918 2.60185C3.84478 2.27684 4.10882 2.0128 4.43383 1.8472C4.80331 1.65894 5.28736 1.65894 6.25472 1.65894H9.36381C10.3312 1.65894 10.8142 1.65894 11.1837 1.8472C11.5087 2.0128 11.7736 2.27684 11.9392 2.60185C12.1273 2.97097 12.1273 3.45443 12.1273 4.4199V9.43166M12.1273 16.3408H17.3091M12.1273 16.3408V9.43166M17.3091 16.3408H19.0364M17.3091 16.3408V9.43166C17.3091 8.62686 17.309 8.22465 17.1775 7.90723C17.0022 7.484 16.6663 7.14754 16.243 6.97223C15.9256 6.84075 15.5228 6.84075 14.718 6.84075C13.9132 6.84075 13.5108 6.84075 13.1933 6.97223C12.7701 7.14754 12.4341 7.484 12.2588 7.90723C12.1273 8.22465 12.1273 8.62685 12.1273 9.43166M6.08182 7.70439H9.53637M6.08182 5.11348H9.53637"
              stroke="#5A5A5A"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{job.jobType}</span>
        </div>

        {/* Group 3: Salary */}
        <div className="flex items-center gap-x-1.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1728 10.0001L9.99096 15.4546L1.80914 10.0001M18.1728 13.6365L9.99096 19.091L1.80914 13.6365M18.1728 6.36373L9.99096 11.8183L1.80914 6.36373L9.99096 0.90918L18.1728 6.36373Z"
              stroke="#5A5A5A"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>
            {(() => {
              const salary = Number(job.salaryMax);
              if (isNaN(salary)) return "N/A";
              const lakhs = salary / 100000;
              return lakhs % 1 === 0 ? `${lakhs} LPA` : `${lakhs.toFixed(1)} LPA`;
            })()}
          </span>
        </div>
      </div>

      <ul className="list-disc list-outside text-sm text-[#555555] space-y-1 pl-4 flex-grow overflow-y-auto scroll-bar-hide">
        {descriptionPoints.length > 0 ? (
          descriptionPoints
            .slice(0, 2) // Show first 2 points
            .map((item, index) => (
              // Remove the leading number (e.g., "1. ") from the display
              <li key={index}>{item.replace(/^\d+\.\s*/, "")}</li>
            ))
        ) : (
          <li>No description available.</li>
        )}
      </ul>

      <button className="mt-6 w-full bg-[#00AAFF] text-white font-semibold py-2.5 rounded-lg ">
        Apply Now
      </button>
    </div>
  );
};

// Use a default export to match the import statement in the parent component
