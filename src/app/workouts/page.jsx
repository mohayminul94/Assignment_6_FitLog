
"use client";

import { useEffect, useMemo, useState } from "react";
import { useFitlog } from "@/context/fitlogContext";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutPage() {
  const { plan, setPlan, ready } = useFitlog();

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

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
          throw new Error("Failed to load workouts.");
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

  // Get unique muscle groups from API data
  const filters = useMemo(() => {
    const groups = workouts.flatMap(
      (workout) => workout.muscleGroups || []
    );

    return ["All", ...new Set(groups)];
  }, [workouts]);

  // Search and filter workouts
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        workout.name?.toLowerCase().includes(query) ||
        workout.equipment?.toLowerCase().includes(query) ||
        (workout.muscleGroups || []).some((muscle) =>
          muscle.toLowerCase().includes(query)
        );

      const matchesFilter =
        activeFilter === "All" ||
        (workout.muscleGroups || []).some(
          (muscle) =>
            muscle.toLowerCase() === activeFilter.toLowerCase()
        );

      return matchesSearch && matchesFilter;
    });
  }, [workouts, search, activeFilter]);

  // Add workout to plan
  const addToPlan = (workout) => {
    if (!ready) return;

    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) return;

    setPlan((current) => [...current, workout]);
  };

  const isInPlan = (id) =>
    plan.some((item) => item.id === id);

  return (
    <main className="min-h-screen bg-[#0c0c10] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#b7ff00]">
              Train with intent
            </p>

            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Workout Library
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Find your next workout. Build your plan. Stay consistent.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#292930] bg-[#16161c] px-4 py-2 text-xs text-zinc-400">
              {loading ? "Loading..." : `${workouts.length} Workouts`}
            </span>

            <span className="rounded-full bg-[#b7ff00] px-4 py-2 text-xs font-bold text-black">
              Plan: {ready ? plan.length : 0}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-md">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search workouts, equipment, muscles..."
              className="w-full rounded-lg border border-[#292930] bg-[#16161c] py-3 pl-12 pr-4 text-sm text-white outline-none transition focus:border-[#b7ff00] placeholder:text-zinc-500"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveFilter("All");
            }}
            className="self-start rounded-lg border border-[#292930] px-4 py-3 text-xs font-semibold text-zinc-400 transition hover:border-[#b7ff00] hover:text-[#b7ff00] md:ml-auto"
          >
            Clear filters
          </button>
        </div>

        {/* Muscle Filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                activeFilter === filter
                  ? "bg-[#b7ff00] text-black"
                  : "border border-[#292930] bg-[#16161c] text-zinc-400 hover:border-[#b7ff00] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-[#25252d] bg-[#16161c]"
              >
                <div className="h-48 bg-[#22222b]" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 rounded bg-[#292930]" />
                  <div className="h-5 w-3/4 rounded bg-[#292930]" />
                  <div className="h-3 w-1/2 rounded bg-[#292930]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-900/50 bg-[#16161c] p-10 text-center">
            <p className="text-sm text-red-400">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-md bg-[#b7ff00] px-5 py-3 text-sm font-bold text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Results */}
        {!loading && !error && filteredWorkouts.length === 0 && (
          <div className="rounded-xl border border-[#25252d] bg-[#16161c] px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-white">
              No workouts found
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Try another search or choose a different muscle group.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-5 rounded-md bg-[#b7ff00] px-5 py-3 text-sm font-bold text-black"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Workout Grid */}
        {!loading && !error && filteredWorkouts.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase text-white">
                {activeFilter === "All" ? "All Workouts" : activeFilter}
              </h2>

              <p className="text-xs text-zinc-500">
                {filteredWorkouts.length} results
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  added={isInPlan(workout.id)}
                  onAdd={() => addToPlan(workout)}
                  disabled={!ready}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

/* Workout Card */
function WorkoutCard({ workout, added, onAdd, disabled }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#25252d] bg-[#16161c] transition-all duration-300 hover:-translate-y-1 hover:border-[#b7ff00]/40">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#202027]">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {added && (
          <span className="absolute right-3 top-3 rounded-full bg-[#b7ff00] px-3 py-1 text-[10px] font-bold uppercase text-black">
            In Your Plan
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {(workout.muscleGroups || []).map((muscle, index) => (
            <span
              key={`${muscle}-${index}`}
              className="rounded-full bg-[#b7ff00] px-3 py-1 text-[10px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-xs text-zinc-400">
          {workout.equipment}
        </p>

        <div className="my-4 border-t border-[#25252d]" />

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
          <span>◷ {workout.duration} min</span>
          <span>♨ {workout.caloriesBurned} kcal</span>
          <span>☆ {workout.rating}</span>
        </div>

        {/* Add to Plan */}
        <button
          type="button"
          onClick={onAdd}
          disabled={added || disabled}
          className={`mt-5 w-full rounded-md px-4 py-3 text-xs font-bold uppercase transition ${
            added
              ? "cursor-default border border-[#292930] bg-[#202027] text-[#b7ff00]"
              : "bg-[#b7ff00] text-black hover:bg-[#a4e600] disabled:cursor-not-allowed disabled:opacity-50"
          }`}
        >
          {added ? "Added to Plan ✓" : "Add to My Plan +"}
        </button>
      </div>
    </article>
  );
}