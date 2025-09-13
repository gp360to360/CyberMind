

import React from "react";
import { FilterBar } from "../components/ui/FilterBar";
import { JobCard } from "../components/cards/JobCard";
import { Header } from "../components/ui/Header";
import axios from "axios";
// --- MOCK DATA ---
// Replace this with data fetched from your NestJS API
const jobs = [
  {
    id: 1,
    logoUrl:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/3_Amazon_logo_logos-512.png",
    company: "Amazon",
    title: "Full Stack Developer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 2,
    logoUrl:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/159_Tesla_logo_logos-512.png",
    company: "Tesla",
    title: "Node Js Developer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 3,
    logoUrl:
      "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
    company: "Google",
    title: "UX/UI Designer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 4,
    logoUrl:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/3_Amazon_logo_logos-512.png",
    company: "Amazon",
    title: "Full Stack Developer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 5,
    logoUrl:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/159_Tesla_logo_logos-512.png",
    company: "Tesla",
    title: "Node Js Developer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 6,
    logoUrl:
      "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
    company: "Google",
    title: "UX/UI Designer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 7,
    logoUrl:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/3_Amazon_logo_logos-512.png",
    company: "Amazon",
    title: "Full Stack Developer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
  {
    id: 8,
    logoUrl:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/159_Tesla_logo_logos-512.png",
    company: "Tesla",
    title: "Node Js Developer",
    experience: "1-3 yr Exp",
    type: "Onsite",
    salary: "12LPA",
    postedAgo: "24h Ago",
    description: [
      "A user-friendly interface lets you browse stunning photos and videos.",
      "Filter destinations based on interests and travel style, and create personalized.",
    ],
  },
];

// --- MAIN COMPONENTS ---
// These can be defined outside your component

export default async function JobSearchPage() {
   let jobs = [];
  let error = null;

  try {
    // STEP 2: Use axios.get to fetch the data
    const response = await axios.get("http://localhost:3000/jobs");
    
    // STEP 3: Access the data directly from the `data` property
    jobs = response.data;

  } catch (err) {
    // axios provides more detailed error information
    error = err.message;
    console.error("Error fetching jobs:", err);
  }
  console.log("Fetched jobs:", jobs);
  return (
    <div className="font-Satoshi-Variable bg-white">
      {/* This top section remains as is */}
      <div className="px-17 pb-8 flex flex-col gap-y-8  shadow-[0_0_14px_0_#C6BFBF40] border border-[#C6BFBF40]  justify-items-center mx-auto">
        <Header />
        <FilterBar />
      </div>

      {/* STEP 1: The 'container' and 'mx-auto' classes are REMOVED from <main>.
        I've also added some vertical padding (py-12) for spacing.
      */}
      <main className="w-full bg-[#FBFBFF] py-12">
        {/*
          STEP 2: A new div is added here WITH the 'container' and 'mx-auto'
          classes to keep your job cards centered.
        */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
