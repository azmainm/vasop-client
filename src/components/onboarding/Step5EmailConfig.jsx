"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const emailConfigSchema = z.object({
  recipientEmail: z.string().email("Please enter a valid email address"),
});

export function Step5EmailConfig({ data, onNext, onBack, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailConfigSchema),
    defaultValues: data || {},
  });

  const onSubmit = (formData) => {
    onNext(formData);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
          Email Configuration
        </h2>
        <p className="text-zinc-600">
          Where should we send call summaries?
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Address */}
        <Card className="p-6 space-y-4">
          <p className="text-sm text-zinc-600">
            After each call, you'll receive an email with the customer's information 
            and conversation details.
          </p>

          <div className="space-y-2">
            <Label htmlFor="recipientEmail">
              Send Call Summaries To <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="recipientEmail"
                type="email"
                placeholder="contact@4trades.ai"
                className="pl-10 placeholder:text-zinc-400"
                {...register("recipientEmail")}
              />
            </div>
            {errors.recipientEmail && (
              <p className="text-sm text-red-500">{errors.recipientEmail.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              You'll receive an email after each customer call with their details and what they needed
            </p>
          </div>

          {/* Always Enabled */}
          <div className="flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-300 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900">
                Email summaries are always enabled
              </p>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6 bg-zinc-50 border-zinc-300">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-zinc-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-zinc-900 mb-3">
                📧 Email Summary Preview
              </h4>
              
              <div className="bg-white border border-zinc-300 rounded-lg p-4 mb-3">
                <p className="text-sm font-semibold text-zinc-900 mb-2">
                  Subject: New Call - [Customer Name]
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-zinc-900">You'll receive:</p>
                <ul className="space-y-1.5">
                  {[
                    "Customer contact information",
                    "Reason for their call",
                    "All details they provided",
                    "Urgency level (if collected)",
                  ].map((item, i) => (
                    <li key={i} className="text-sm text-zinc-700 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            ← Back to Step 4
          </Button>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSave(handleSubmit((data) => data)())}
            >
              Save & Continue Later
            </Button>
            <Button type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100">
              Continue to Step 6 →
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

