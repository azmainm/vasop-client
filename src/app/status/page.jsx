"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { onboardingAPI } from "@/lib/api";
import { Clock, Copy, CheckCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function StatusPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [submission, setSubmission] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Load submission from server
    const loadSubmission = async () => {
      try {
        const result = await onboardingAPI.getMySubmission();
        if (!result || !result.submission || !result.submission.isSubmitted) {
          // No submitted application found, redirect to onboarding
          router.push("/onboarding");
          return;
        }
        setSubmission(result.submission);
      } catch (error) {
        console.error("Failed to load submission:", error);
        router.push("/onboarding");
      }
    };

    loadSubmission();
  }, [user, router]);

  const handleCopyId = () => {
    if (submission?.submissionId) {
      navigator.clipboard.writeText(submission.submissionId);
      setCopied(true);
      toast.success("Submission ID copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user || !submission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  const submittedDate = new Date(submission.submittedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-100 animate-fade-in">
      {/* Header */}
      <header className="bg-white border-b border-zinc-300">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-zinc-900">
              4Trades Voice Agent Onboarding
            </h1>
            <p className="text-sm text-zinc-600">Welcome, {user.name}</p>
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
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="p-8 text-center animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-amber-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 mb-3">
              Under Review
            </h2>

            <p className="text-lg text-zinc-600 mb-6">
              Your application is being reviewed by our team
            </p>

            <div className="bg-zinc-50 border border-zinc-300 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-600 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Submitted: {submittedDate}
              </div>
            </div>

            <div className="text-center space-y-2 mb-8">
              <p className="text-zinc-700 font-medium">
                We'll contact you within <span className="text-zinc-900 font-semibold">2-3 business days</span>
              </p>
              <p className="text-sm text-zinc-600">
                Our team will reach out with your phone number and next steps
              </p>
            </div>

            {/* Submission ID */}
            <div className="border-t border-zinc-300 pt-6">
              <p className="text-sm text-zinc-600 mb-2">Your Submission ID:</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-lg font-mono font-semibold text-zinc-900 bg-zinc-100 px-4 py-2 rounded border border-zinc-300">
                  {submission.submissionId}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyId}
                  className="text-zinc-600 hover:text-zinc-900"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Save this ID for reference
              </p>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-6 bg-blue-50 border-blue-200 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">1</span>
                </div>
                <p>Our team will review your business information and requirements</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">2</span>
                </div>
                <p>We'll set up your custom voice agent with your specifications</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">3</span>
                </div>
                <p>We will notify you when your voice agent is ready</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold">4</span>
                </div>
                <p>Start receiving calls through your AI voice agent!</p>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-zinc-600 mb-2">
              Have questions? Need to make changes?
            </p>
            <p className="text-zinc-900 font-medium">
              Contact us at{" "}
              <a
                href="mailto:support@4trades.com"
                className="text-zinc-900 underline hover:text-zinc-700"
              >
                support@4trades.com
              </a>
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-300 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-sm text-center text-zinc-600">
            © 2024 4Trades Voice Agent Onboarding. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

