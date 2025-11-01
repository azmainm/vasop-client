"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const voiceAgentSchema = z.object({
  agentName: z.string().min(2, "Please enter an agent name").max(20, "Agent name must be 20 characters or less"),
  agentPersonality: z.enum(["professional", "friendly", "formal"], {
    required_error: "Please select a personality type",
  }),
  greeting: z.string().min(20, "Greeting must be at least 20 characters").max(500, "Greeting must be 500 characters or less"),
});

const personalities = [
  {
    value: "professional",
    label: "Professional",
    description: "Efficient and business-focused. Gets to the point.",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm and conversational. Casual but helpful.",
  },
  {
    value: "formal",
    label: "Formal",
    description: "Business-like and corporate tone. Very professional.",
  },
];

export function Step2VoiceAgent({ data, businessData, onNext, onBack, onSave }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(voiceAgentSchema),
    defaultValues: data || {},
  });

  const agentName = watch("agentName", "");
  const greeting = watch("greeting", "");
  const selectedPersonality = watch("agentPersonality");

  const generateGreeting = () => {
    setIsGenerating(true);
    
    // Simulate greeting generation
    setTimeout(() => {
      const businessName = businessData?.businessName || "Your Business";
      const name = agentName || "the AI assistant";
      
      const greetingTemplate = `Hi there, I'm ${name}, ${businessName}'s virtual assistant. Parts of this call may be recorded so we can better understand your needs and improve our service. To get started, what are you calling about today?`;
      
      setValue("greeting", greetingTemplate);
      toast.success("Greeting generated! Feel free to customize it");
      setIsGenerating(false);
    }, 1000);
  };

  const onSubmit = (formData) => {
    onNext(formData);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
          Configure Your Voice Agent
        </h2>
        <p className="text-zinc-600">
          Customize how your AI assistant will interact with callers
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Agent Identity */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-zinc-900 mb-4">
            Agent Identity
          </h3>

          <div className="space-y-2">
            <Label htmlFor="agentName">
              Agent Name <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  id="agentName"
                  placeholder="Alex"
                  className="placeholder:text-zinc-400"
                  {...register("agentName")}
                />
                {errors.agentName && (
                  <p className="text-sm text-red-500">{errors.agentName.message}</p>
                )}
                <p className="text-xs text-zinc-500">
                  Choose a friendly, professional name for your AI assistant (e.g., Mason, Alex, Sarah)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>
              Agent Personality <span className="text-red-500">*</span>
            </Label>
            <p className="text-xs text-zinc-500 mb-3">
              How should your agent communicate with callers?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {personalities.map((personality) => (
                <label
                  key={personality.value}
                  className={`
                    relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedPersonality === personality.value
                      ? "border-zinc-900 bg-zinc-50"
                      : "border-zinc-300 hover:border-zinc-400"
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={personality.value}
                    {...register("agentPersonality")}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${selectedPersonality === personality.value
                          ? "border-zinc-900"
                          : "border-zinc-300"
                        }
                      `}
                    >
                      {selectedPersonality === personality.value && (
                        <div className="w-3 h-3 rounded-full bg-zinc-900" />
                      )}
                    </div>
                    <span className="font-semibold text-zinc-900">
                      {personality.label}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {personality.description}
                  </p>
                </label>
              ))}
            </div>
            {errors.agentPersonality && (
              <p className="text-sm text-red-500">{errors.agentPersonality.message}</p>
            )}
          </div>
        </Card>

        {/* Greeting Message */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-zinc-900 mb-4">
            Greeting Message
          </h3>

          <div className="space-y-2">
            <Label htmlFor="greeting">
              Greeting Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="greeting"
              rows={4}
              placeholder="Hi there, I'm [Agent Name], [Business Name]'s virtual assistant..."
              className="placeholder:text-zinc-400"
              {...register("greeting")}
            />
            {errors.greeting && (
              <p className="text-sm text-red-500">{errors.greeting.message}</p>
            )}
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">
                This is what your agent will say when answering calls
              </p>
              <span className="text-xs text-zinc-500">
                {greeting.length} / 500 characters
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={generateGreeting}
            disabled={isGenerating || !agentName || !selectedPersonality}
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Auto-Generate Greeting"}
          </Button>

          {/* Preview Card */}
          {greeting && (
            <div className="bg-zinc-50 border border-zinc-300 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="h-4 w-4 text-zinc-700" />
                <span className="text-sm font-semibold text-zinc-900">Preview</span>
              </div>
              <p className="text-zinc-700 italic leading-relaxed">
                "{greeting}"
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            ← Back to Step 1
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
              Continue to Step 3 →
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

