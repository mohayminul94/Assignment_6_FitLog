
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFitlog } from "@/context/fitlogContext";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const { plan, setPlan, saved, setSaved, ready } = useFitlog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkout() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load workout details.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid workout data received.");
        }

        const found = data.find(
          (item) =>
            String(item.id) === String(id) ||
            slugify(item.name) === String(id).toLowerCase()
        );

        if (!found) {
          throw new Error("Workout not found.");
        }

        setWorkout(found);
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

    if (id) fetchWorkout();

    return () => controller.abort();
  }, [id]);

  const isInPlan = workout
    ? plan.some((item) => String(item.id) === String(workout.id))
    : false;

  const isSaved = workout
    ? saved.some((item) => String(item.id) === String(workout.id))
    : false;

  function addToPlan() {
    if (!ready || !workout || isInPlan) return;
    setPlan((current) => [...current, workout]);
  }

  function toggleSaved() {
    if (!ready || !workout) return;

    if (isSaved) {
      setSaved((current) =>
        current.filter((item) => String(item.id) !== String(workout.id))
      );
    } else {
      setSaved((current) => [...current, workout]);
    }
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#0c0c10] px-4 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="h-[420px] animate-pulse rounded-xl bg-[#1b1b23]" />
          <div className="space-y-5">
            <div className="h-10 w-3/4 animate-pulse rounded bg-[#1b1b23]" />
            <div className="h-24 animate-pulse rounded bg-[#1b1b23]" />
            <div className="h-64 animate-pulse rounded bg-[#1b1b23]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0c0c10] px-4 text-center text-white">
        <h1 className="text-3xl font-black uppercase">
          Workout Not Found
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          {error || "This workout could not be found."}
        </p>
        <Link
          href="/workout"
          className="mt-6 rounded-md bg-[#b7ff00] px-6 py-3 text-sm font-bold text-black"
        >
          Back to Workouts
        </Link>
      </main>
    );
  }

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : typeof workout.instructions === "string"
      ? workout.instructions.split("\n").filter(Boolean)
      : [];

  const details = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", workout.duration ? `${workout.duration} min` : null],
    [
      "Calories",
      workout.caloriesBurned != null
        ? `${workout.caloriesBurned} kcal`
        : null,
    ],
    ["Rating", workout.rating],
  ];

  return (
    <main className="min-h-screen bg-[#0c0c10] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <Link
          href="/workout"
          className="mb-7 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-[#b7ff00]"
        >
          <span aria-hidden="true">←</span>
          Back to Workouts
        </Link>

        {/* Main Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Workout Image */}
          <div className="overflow-hidden rounded-xl border border-[#25252d] bg-[#16161c]">
            {workout.image ? (
              <img
                src={workout.image}
                alt={workout.name}
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-zinc-500">
                No image available
              </div>
            )}
          </div>

          {/* Workout Information */}
          <div className="min-w-0">
            <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-zinc-400">
              {workout.description || "Build strength and improve your fitness with this exercise."}
            </p>

            {/* Muscle Tags */}
            <div className="mt-5 flex flex-wrap gap-3">
              {(workout.muscleGroups || []).map((muscle, index) => (
                <span
                  key={`${muscle}-${index}`}
                  className="rounded-full bg-[#b7ff00] px-4 py-2 text-xs font-medium text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Details Table */}
            <div className="mt-7 overflow-hidden rounded-xl border border-[#25252d] bg-[#161922]">
              {details.map(([label, value], index) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    index !== details.length - 1
                      ? "border-b border-[#25252d]"
                      : ""
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {label}
                  </span>
                  <span className="text-right text-sm text-zinc-200">
                    {value ?? "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <section className="mt-8">
              <h2 className="text-base font-bold uppercase tracking-wide">
                Instructions
              </h2>

              {instructions.length > 0 ? (
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-300 marker:text-zinc-500">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="pl-1">
                      {instruction}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-sm text-zinc-400">
                  No instructions available for this workout.
                </p>
              )}
            </section>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={addToPlan}
                disabled={!ready || isInPlan}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#b7ff00] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#a5e600] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span aria-hidden="true">▣</span>
                {isInPlan ? "Added to Today's Plan ✓" : "Add to Today's Plan"}
              </button>

              <button
                type="button"
                onClick={toggleSaved}
                disabled={!ready}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm transition disabled:opacity-50 ${
                  isSaved
                    ? "border-[#b7ff00] text-[#b7ff00]"
                    : "border-[#333440] text-zinc-300 hover:border-[#b7ff00] hover:text-[#b7ff00]"
                }`}
              >
                <span aria-hidden="true">{isSaved ? "★" : "♧"}</span>
                {isSaved ? "Saved — Remove" : "Save for Later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}