"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("API response is not a workout list.");
        }

        if (!cancelled) {
          setWorkouts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load workouts.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWorkouts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0c10] px-4 py-8 text-white">
        <p className="text-center text-gray-400">Loading workouts...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0c10] px-4 py-8 text-white">
        <p className="text-center text-red-400">
          Workouts load kora jayni: {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0c10] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="group block overflow-hidden rounded-[22px] border border-[#292b35] bg-[#15161d] text-white transition-colors hover:border-[#424550] focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              {/* Workout Image */}
              <div className="h-[270px] w-full overflow-hidden bg-[#20232d]">
                {workout.image ? (
                  <img
                    src={workout.image}
                    alt={workout.name || "Workout"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    No image available
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Muscle Group Pills */}
                <div className="mb-5 flex flex-wrap gap-3">
                  {(Array.isArray(workout.muscleGroups)
                    ? workout.muscleGroups
                    : []
                  ).map((muscle, index) => (
                    <span
                      key={`${muscle}-${index}`}
                      className="rounded-full bg-[#b7ff00] px-4 py-1 text-sm font-semibold uppercase tracking-wide text-[#15161d]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Workout Name */}
                <h2 className="mb-2 text-[25px] font-extrabold uppercase leading-tight tracking-wide text-[#f5f5f7]">
                  {workout.name}
                </h2>

                {/* Equipment */}
                <p className="text-base text-[#9ca3af]">
                  {workout.equipment || "No equipment"}
                </p>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-[#292b35]" />

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-[#9ca3af]">
                  {/* Duration */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{workout.duration} min</span>
                  </div>

                  {/* Calories */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2c1.5 4.2-2 5.5-2 9 0 1.5 1 2.5 2.3 2.5 1.8 0 2.7-1.6 2.5-3.7C18 12 20 15 20 18a8 8 0 0 1-16 0c0-4.5 3.3-7.6 5.5-10.2C9.5 11 10 12 10 12c-.2-3.5 3-6.1 2-10Z" />
                    </svg>
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 3 15 9.5 22 10.3 17 15.1 18.2 22 12 18.5 5.8 22 7 15.1 2 10.3 9 9.5 12 3" />
                    </svg>
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}