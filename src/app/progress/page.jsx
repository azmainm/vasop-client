"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { onboardingAPI } from "@/lib/api";
import { CheckCircle2, Circle, Clock, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STEPS = [
  { number: 1, title: "Business Profile", description: "Basic business information" },
  { number: 2, title: "Voice Agent", description: "Configure your AI assistant" },
  { number: 3, title: "Collection Fields", description: "Information to collect from callers" },
  { number: 4, title: "Emergency Handling", description: "Emergency call forwarding" },
  { number: 5, title: "Email Configuration", description: "Call summary settings" },
  { number: 6, title: "Review & Submit", description: "Final review" },
];

export default function ProgressPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const loadProgress = async () => {
      try {
        const result = await onboardingAPI.getMySubmission();
        
        if (!result || !result.submission || Object.keys(result.submission).length === 0) {
          // No draft found, redirect to onboarding
          router.push("/onboarding");
          return;
        }

        const sub = result.submission;
        
        // If already submitted, go to status page
        if (sub.isSubmitted) {
          router.push("/status");
          return;
        }

        setSubmission(sub);
      } catch (error) {
        console.error("Failed to load progress:", error);
        router.push("/onboarding");
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user, router]);

  const handleContinue = () => {
    router.push("/onboarding");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading || !submission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const currentStep = submission.currentStep || 1;
  const lastSaved = new Date(submission.lastSavedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const completedSteps = currentStep - 1;
  const progressPercentage = Math.round((completedSteps / STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-100 animate-fade-in">
      {/* Header */}
      <header className="bg-white border-b border-zinc-300">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-zinc-900">
              4Trades Voice Agent Onboarding
            </h1>
            <p className="text-sm text-zinc-600">Welcome back, {user.name}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-zinc-600 hover:text-zinc-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <Card className="p-8 mb-6 animate-slide-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Your Progress</h2>
              <p className="text-zinc-600">
                Last saved: {lastSaved}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-zinc-900">
                {completedSteps} of {STEPS.length} steps completed
              </span>
              <span className="text-sm font-medium text-zinc-900">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-3">
              <div
                className="bg-zinc-900 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleContinue}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 py-6 text-lg"
            >
              Continue Where You Left Off
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Steps Overview */}
        <Card className="p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-xl font-semibold text-zinc-900 mb-6">
            Onboarding Steps
          </h3>
          <div className="space-y-4">
            {STEPS.map((step) => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;

              return (
                <div
                  key={step.number}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                    isCurrent
                      ? "border-zinc-900 bg-zinc-50"
                      : isCompleted
                      ? "border-green-200 bg-green-50"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-white flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
                      </div>
                    ) : (
                      <Circle className="h-6 w-6 text-zinc-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        isCurrent ? "text-zinc-900" : isCompleted ? "text-green-900" : "text-zinc-600"
                      }`}
                    >
                      Step {step.number}: {step.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        isCurrent ? "text-zinc-700" : isCompleted ? "text-green-700" : "text-zinc-500"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-900 text-zinc-100 rounded-full">
                        Current
                      </span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                        Completed
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Your progress is automatically saved. You can return anytime to continue from where you left off.
            </p>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-300 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-sm text-center text-zinc-600">
            © 2024 4Trades Voice Agent Onboarding. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

