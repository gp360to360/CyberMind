"use client";
import { useState,useEffect,useCallback } from "react";
import { FilterBar } from "./components/ui/FilterBar";
import { JobCard } from "./components/cards/JobCard";
import { Header } from "./components/ui/Header";
import axios from "axios";
import { JobCardSkeleton } from "./components/ui/JobCardSkeleton";
// --- MOCK DATA ---
// Replace this with data fetched from your NestJS API


// --- MAIN COMPONENTS ---
// These can be defined outside your component

export default  function JobSearchPage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch jobs from the API
  const fetchJobs = useCallback(async (filters = {}) => {
    if (jobs.length === 0) setIsLoading(true);
    setError(null);

    // Create a clean set of active filters, ignoring empty values
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value != null && value !== ''&& value !== 0)
    );
    
    const hasActiveFilters = Object.keys(activeFilters).length > 0;
    let url;

    // *** THE CORE LOGIC IS HERE ***
    if (hasActiveFilters) {
      // If there are filters, build the search URL
      const queryParams = new URLSearchParams(activeFilters).toString();
      url = `https://cybermind-backend-pj5g.onrender.com/jobs/search?${queryParams}`;
    } else {
      // If there are no filters, use the "get all" URL
      url = 'https://cybermind-backend-pj5g.onrender.com/jobs';
    }

    console.log("Fetching from URL:", url); // For debugging

    try {
      const response = await axios.get(url);
      setJobs(response.data);
      
    } catch (err) {
      setError(err.message || "An unknown error occurred");
      console.error("Error fetching jobs:", err);
      setIsLoading(false);
    } 
    finally {
      setIsLoading(false);
    }
  }, [jobs.length]);

  // Fetch all jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // This function is passed to FilterBar to trigger a new search
  const handleSearch = useCallback((filters) => {
     // Remove empty properties from the filters object so we don't send empty params
    const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
    );
    fetchJobs(activeFilters);
  }, []);
  return (
    <div className="font-Satoshi-Variable bg-white">
      {/* This top section remains as is */}
      <div className="px-17 pb-8 flex flex-col gap-y-8  shadow-[0_0_14px_0_#C6BFBF40] border border-[#C6BFBF40]  justify-items-center mx-auto">
        <Header />
        <FilterBar onSearch={handleSearch} />
      </div>
      <main className="w-full bg-[#FBFBFF] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // If loading, show a grid of skeleton placeholders
              Array.from({ length: 8 }).map((_, index) => <JobCardSkeleton key={index} />)
            ) : error ? (
              <p className="col-span-full text-center text-red-500">Error: {error}</p>
            ) : jobs.length > 0 ? (
              // If not loading and no error, show the job cards
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              // If not loading, no error, and no jobs, show the message
              <p className="col-span-full text-center text-gray-500">No jobs found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
