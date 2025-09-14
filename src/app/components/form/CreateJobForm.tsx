import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// The API endpoint to post job data
// http://localhost:3000/jobs
// --- Reusable SVG Icon Components (No changes here) ---
const ArrowDownIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const CalendarIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const DoubleArrowIcon = () => (
  <svg
    className="w-4 h-4 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    />
  </svg>
);

// --- Reusable Input Component ---
const InputField = ({ label, name, placeholder, register, error }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={name}
      type="text"
      placeholder={placeholder}
      {...register}
      // MODIFIED: Added a CSS selector to change border color when the field is filled
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md shadow-sm focus:outline-none focus:ring-1   [&:not(:placeholder-shown)]:border-black`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

export default function CreateJobForm({ onClose }) {
  // MODIFIED: Added 'watch' to monitor form field values
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: JSON.parse(localStorage.getItem('jobDraft')) || {
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: "",
      salaryMin: "",
      salaryMax: "",
      deadline: "",
      description: "",
    },
  });

  // MODIFIED: Watching specific fields to conditionally apply styles
  const locationValue = watch("location");
  const jobTypeValue = watch("jobType");
  const deadlineValue = watch("applicationDeadline");

  const onSubmit = async (data) => {
    const payload = { ...data, jobDescription: data.description,status:"published" };
    delete payload.description;
    if (!payload.requirements) delete payload.requirements;
    if (!payload.responsibilities) delete payload.responsibilities;

    console.log("Sending data to backend:", payload);

    try {
      // STEP 2: Replace fetch with axios.post
      const response = await axios.post("https://cybermind-backend-pj5g.onrender.com/jobs", payload);

      console.log("Successfully posted job:", response.data);
      toast.success("Job opening successfully published.", {
        position: "bottom-right",
        autoClose: 4000,
      });
      onClose();
    } catch (error) {
      // STEP 3: Improved error handling with axios
      console.error("Failed to post job:", error);

      // Axios puts server error details in error.response.data
      const errorMessage =
        (error as any).response?.data?.message || (error as any).message;
      toast.error(`Failed to publish job opening: ${errorMessage}`);
    }
  };

  const handleSaveDraft = () => {
    const draftData = getValues();
    try {
    localStorage.setItem('jobDraft', JSON.stringify(draftData));
      console.log("Saving draft data to localStorage:", draftData);
      toast.success("Draft saved successfully.");
      onClose();
    } catch (error) {
      console.error("Failed to save draft to localStorage:", error);
      toast.error("Could not save draft.");
    }
  };

  return (
    <>
      <div className="fixed z-10 inset-0 backdrop-brightness-50 bg-opacity-75 font-Satoshi Variable flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-[850px]  p-8 transform transition-all">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Create Job Opening
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Job Title */}
              <InputField
                label="Job Title"
                name="jobTitle"
                placeholder="Job Title"
                register={register("jobTitle", {
                  required: "Job title is required.",
                })}
                error={errors.jobTitle}
              />

              {/* Company Name */}
              <InputField
                label="Company Name"
                name="companyName"
                placeholder="Amazon, Microsoft, Swiggy"
                register={register("companyName", {
                  required: "Company name is required.",
                })}
                error={errors.companyName}
              />

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location"
                    {...register("location", {
                      required: "Please select a location.",
                    })}
                    // MODIFIED: Conditionally apply border-black if a value is selected
                    className={`w-full appearance-none bg-white px-3 py-2 border ${
                      errors.location
                        ? "border-red-500"
                        : locationValue
                        ? "border-black"
                        : "border-gray-300"
                    } ${
                      locationValue ? "text-black" : "text-gray-500"
                    } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Choose Preferred Location</option>
                    <option value="Remote">Remote</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <ArrowDownIcon />
                  </div>
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Job Type */}
              <div>
                <label
                  htmlFor="jobType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Job Type
                </label>
                <div className="relative">
                  <select
                    id="jobType"
                    {...register("jobType", {
                      required: "Please select a job type.",
                    })}
                    // MODIFIED: Conditionally apply border-black if a value is selected
                    className={`w-full appearance-none bg-white px-3 py-2 border ${
                      errors.jobType
                        ? "border-red-500"
                        : jobTypeValue
                        ? "border-black"
                        : "border-gray-300"
                    } ${
                      jobTypeValue ? "text-black" : "text-gray-500"
                    } rounded-md shadow-sm focus:outline-none focus:ring-1 `}
                  >
                    <option value="">Choose Job Type</option>
                    <option value="Internship">Internship</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <ArrowDownIcon />
                  </div>
                </div>
                {errors.jobType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.jobType.message}
                  </p>
                )}
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range (per annum)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="₹0"
                      {...register("salaryMin", {
                        required: "Min salary is required.",
                        pattern: {
                          value: /^[0-9,]+$/,
                          message: "Please enter only numbers.",
                        },
                      })}
                      // MODIFIED: Added CSS selector to change border color
                      className={`w-full pl-4 pr-3 py-2 border ${
                        errors.salaryMin ? "border-red-500" : "border-gray-300"
                      } ${
                        deadlineValue ? "text-black" : "text-gray-500"
                      } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 [&:not(:placeholder-shown)]:border-black`}
                    />
                  </div>
                  <div className="relative w-1/2">
                    <input
                      type="text"
                      placeholder="₹12,00,000"
                      {...register("salaryMax", {
                        required: "Max salary is required.",
                        pattern: {
                          value: /^[0-9,]+$/,
                          message: "Please enter only numbers.",
                        },
                      })}
                      // MODIFIED: Added CSS selector to change border color
                      className={`w-full pl-4 pr-3 py-2 border ${
                        errors.salaryMax ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-1  [&:not(:placeholder-shown)]:border-black`}
                    />
                  </div>
                </div>
                {errors.salaryMin && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.salaryMin.message}
                  </p>
                )}
                {errors.salaryMax && !errors.salaryMin && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.salaryMax.message}
                  </p>
                )}
              </div>

              {/* Application Deadline */}
              <div>
                <label
                  htmlFor="applicationDeadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Application Deadline
                </label>
                <div className="relative">
                  <input
                    id="applicationDeadline"
                    type="date"
                    {...register("applicationDeadline", {
                      required: "Deadline is required.",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          selectedDate >= today || "Date cannot be in the past."
                        );
                      },
                    })}
                    // MODIFIED: Conditionally apply border-black if a value is selected
                    className={`w-full px-3 py-2 border ${
                      errors.applicationDeadline
                        ? "border-red-500"
                        : deadlineValue
                        ? "border-black"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-1`}
                  />
                </div>
                {errors.applicationDeadline && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.applicationDeadline.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Description
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Please share a description to let the candidate know more about the job role. Write description in this formate 1. point one 
              2. point two 
              3. point three"
                {...register("description", {
                  required: "Job description is required.",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long.",
                  },
                })}
                // MODIFIED: Added CSS selector to change border color
                className={`w-full px-3 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none [&:not(:placeholder-shown)]:border-black`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Action Buttons (No changes here) */}
            <div className="flex justify-end items-center gap-122 pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-black rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Save Draft
                <svg
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 7.5L5 11.5L1 7.5M9 1.5L5 5.5L1 1.5"
                    stroke="#222222"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-2.5 bg-[#00AAFF] text-white font-semibold rounded-lg shadow-md  transition-all duration-300"
              >
                Publish
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1.5L11 5.5L7 9.5M1 1.5L5 5.5L1 9.5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
