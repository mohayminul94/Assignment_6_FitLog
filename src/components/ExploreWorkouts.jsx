
"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function ExploreWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workouts.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid workout data received.");
        }

        setWorkouts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchWorkouts();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="explore"
      className="bg-[#0c0c10] px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Heading */}
        <div className="mb-7">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-xl border border-[#25252d] bg-[#16161c]"
              >
                <div className="h-44 bg-[#22222b] sm:h-48" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 rounded bg-[#292930]" />
                  <div className="h-5 w-3/4 rounded bg-[#292930]" />
                  <div className="h-3 w-1/2 rounded bg-[#292930]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-red-900/50 bg-[#16161c] p-8 text-center">
            <p className="text-sm text-red-400">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-[#b7ff00] px-5 py-2 text-sm font-bold text-black"
            >
              Reload Page
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && workouts.length === 0 && (
          <div className="rounded-xl border border-[#25252d] bg-[#16161c] p-10 text-center">
            <p className="text-zinc-400">No workouts found.</p>
          </div>
        )}

        {/* Workout Grid */}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Workout Card */
function WorkoutCard({ workout }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#25252d] bg-[#16161c] transition-all duration-300 hover:-translate-y-1 hover:border-[#b7ff00]/40 hover:shadow-lg hover:shadow-black/20">
      {/* Workout Image */}
      <div className="relative h-44 overflow-hidden bg-[#202027] sm:h-48">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        {/* Muscle Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {(workout.muscleGroups || []).map((muscle, index) => (
            <span
              key={`${muscle}-${index}`}
              className="rounded-full bg-[#b7ff00] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-xs text-zinc-400">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-4 border-t border-[#25252d]" />

        {/* Workout Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12 2C9 7 5 9 5 14a7 7 0 0 0 14 0c0-3-2-6-5-9 0 4-1 5-2 6 0-3-1-6 0-9Z" />
            </svg>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
            </svg>
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}