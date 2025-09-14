"use client";
import { useState, useRef, useEffect } from "react";
type OnSearch = (filters: {
  jobTitle: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
}) => void;
export const FilterBar = ({ onSearch }: { onSearch: OnSearch }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const isInitialMount = useRef(true);
  // Salary state is now managed as an ANNUAL figure
  const [salaryRange, setSalaryRange] = useState({ min: 600000, max: 1500000 }); // e.g., 6 LPA to 15 LPA

  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingHandleRef = useRef< "min" | "max" | null>(null);
  // const isInitialMount = useRef(true);

  // Constants for the slider range are also ANNUAL
  const MIN_SALARY = 0; // 0 LPA
  const MAX_SALARY = 5000000; // 50 LPA

  useEffect(() => {
    // On the first render, we set the ref to false and skip the search.
    // This prevents an empty search from running when the component loads.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Set up a timer to delay the API call.
    const timer = setTimeout(() => {
      onSearch({
        jobTitle,
        location,
        jobType,
        salaryMin: salaryRange.min,
        salaryMax: salaryRange.max,
      });
    }, 500); // 500ms debounce delay

    // Cleanup function: If a filter changes again before 500ms,
    // the previous timer is cleared and a new one is set.
    return () => clearTimeout(timer);
  }, [jobTitle, location, jobType, salaryRange]);

  // Effect to handle mouse dragging logic for the slider
  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
      if (!draggingHandleRef.current || !sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      let percentage = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage)); // Clamp between 0-100

      let value = Math.round(
        MIN_SALARY + (percentage / 100) * (MAX_SALARY - MIN_SALARY)
      );

      setSalaryRange((prev) => {
        if (draggingHandleRef.current === "min") {
          const newMin = Math.min(value, prev.max);
          return { ...prev, min: newMin };
        } else {
          const newMax = Math.max(value, prev.min);
          return { ...prev, max: newMax };
        }
      });
    };

    const handleMouseUp = () => {
      draggingHandleRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (handle: 'min' | 'max') => {
    draggingHandleRef.current = handle;
  };

  const minPercentage =
    ((salaryRange.min - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;
  const maxPercentage =
    ((salaryRange.max - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;
  return (
    <div className="w-full bg-white rounded-lg mt">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        {/* Search Input */}
        <div className="flex items-center space-x-3 p-2 border-r border-gray-200">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 13L19 19M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15Z"
              stroke="#686868"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Search By Job Title, Role"
            className="w-full bg-transparent focus:outline-none text-gray-700"
          />
        </div>

        {/* Location Select */}
        <div className="flex items-center space-x-3 p-2 border-r border-gray-200">
          <svg
            width="18"
            height="23"
            viewBox="0 0 18 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7808 19.7005L11.1906 19.2377L11.7808 19.7005ZM6.21921 19.7005L5.62903 20.1633L6.21921 19.7005ZM9 22.0055V21.2555V22.0055ZM16.25 9.6087C16.25 10.8352 15.6104 12.4764 14.6037 14.256C13.6137 16.0063 12.3342 17.7794 11.1906 19.2377L12.371 20.1633C13.5371 18.6762 14.8672 16.837 15.9094 14.9945C16.9349 13.1814 17.75 11.2494 17.75 9.6087H16.25ZM6.80938 19.2377C5.66578 17.7794 4.38628 16.0063 3.39625 14.256C2.38962 12.4764 1.75 10.8352 1.75 9.6087H0.25C0.25 11.2494 1.06511 13.1814 2.09064 14.9945C3.13277 16.837 4.46288 18.6762 5.62903 20.1633L6.80938 19.2377ZM1.75 9.6087C1.75 5.21571 5.04678 1.75 9 1.75V0.25C4.11666 0.25 0.25 4.49277 0.25 9.6087H1.75ZM9 1.75C12.9532 1.75 16.25 5.21571 16.25 9.6087H17.75C17.75 4.49277 13.8833 0.25 9 0.25V1.75ZM11.1906 19.2377C10.5717 20.027 10.1641 20.5426 9.79918 20.8741C9.46635 21.1764 9.24418 21.2555 9 21.2555V22.7555C9.72906 22.7555 10.2948 22.4504 10.8078 21.9844C11.2886 21.5476 11.7849 20.9107 12.371 20.1633L11.1906 19.2377ZM5.62903 20.1633C6.21511 20.9107 6.71136 21.5476 7.19224 21.9844C7.70524 22.4504 8.27094 22.7555 9 22.7555V21.2555C8.75582 21.2555 8.53365 21.1764 8.20082 20.8741C7.83587 20.5426 7.42834 20.027 6.80938 19.2377L5.62903 20.1633ZM5.25 10C5.25 12.0711 6.92893 13.75 9 13.75V12.25C7.75736 12.25 6.75 11.2426 6.75 10H5.25ZM9 13.75C11.0711 13.75 12.75 12.0711 12.75 10H11.25C11.25 11.2426 10.2426 12.25 9 12.25V13.75ZM12.75 10C12.75 7.92893 11.0711 6.25 9 6.25V7.75C10.2426 7.75 11.25 8.75736 11.25 10H12.75ZM9 6.25C6.92893 6.25 5.25 7.92893 5.25 10H6.75C6.75 8.75736 7.75736 7.75 9 7.75V6.25Z"
              fill="#686868"
            />
          </svg>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none"
          >
            <option value=""> Preferred Location</option>
            <option value="Remote">Remote</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Job Type Select */}
        <div className="flex items-center space-x-3 p-2 border-r border-gray-200">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 17C13 14.7909 10.3137 13 7 13C3.68629 13 1 14.7909 1 17M14.8281 3.17188C15.1996 3.54331 15.4942 3.98427 15.6952 4.46957C15.8962 4.95487 15.9999 5.47533 15.9999 6.00062C15.9999 6.52591 15.8963 7.04497 15.6953 7.53027C15.4943 8.01558 15.1996 8.45705 14.8281 8.82848M17 1C17.6566 1.65661 18.1775 2.43612 18.5328 3.29402C18.8882 4.15192 19.0718 5.07127 19.0718 5.99985C19.0718 6.92844 18.8886 7.84815 18.5332 8.70605C18.1778 9.56396 17.6566 10.3435 17 11.0001M7 10C4.79086 10 3 8.20914 3 6C3 3.79086 4.79086 2 7 2C9.20914 2 11 3.79086 11 6C11 8.20914 9.20914 10 7 10Z"
              stroke="#686868"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none"
          >
            <option value="">Choose Job Type</option>
            <option value="Internship">Internship</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Salary Range Slider */}
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-black">
              Salary Per Month
            </span>
            {/* Display is converted to MONTHLY */}
            <span className="text-sm font-bold text-black">
              {formatCurrency(salaryRange.min / 12)} -{" "}
              {formatCurrency(salaryRange.max / 12)}
            </span>
          </div>
          <div className="relative pt-1" ref={sliderRef}>
            <div className="relative w-full h-0.5 bg-gray-300 rounded-full">
              <div
                className="absolute h-0.5 bg-black rounded-full"
                style={{
                  left: `${minPercentage}%`,
                  width: `${maxPercentage - minPercentage}%`,
                }}
              ></div>
              <div
                onMouseDown={() => handleMouseDown("min")}
                className="absolute w-4 h-4 bg-black border-2 border-black rounded-full -top-1.5 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
                style={{ left: `${minPercentage}%` }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div
                onMouseDown={() => handleMouseDown("max")}
                className="absolute w-4 h-4 bg-black border-2 border-black rounded-full -top-1.5 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
                style={{ left: `${maxPercentage}%` }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const formatCurrency = (value: number) => {
  // Converts a number into a formatted string like "₹50k"
  return `₹${Math.round(value / 1000)}k`;
};
