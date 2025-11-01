"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const collectionFieldsSchema = z.object({
  email: z.boolean(),
  urgency: z.boolean(),
  propertyAddress: z.boolean(),
  bestTimeToCallback: z.boolean(),
  customFields: z.array(
    z.object({
      question: z.string().min(5, "Question must be at least 5 characters"),
      required: z.boolean(),
    })
  ).max(5, "Maximum 5 custom questions allowed"),
});

export function Step3CollectionFields({ data, onNext, onBack, onSave }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionFieldsSchema),
    defaultValues: data || {
      email: false,
      urgency: false,
      propertyAddress: false,
      bestTimeToCallback: false,
      customFields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const customFields = watch("customFields");

  const onSubmit = (formData) => {
    onNext(formData);
  };

  const addCustomField = () => {
    if (fields.length < 5) {
      append({ question: "", required: false });
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
          Information Collection
        </h2>
        <p className="text-zinc-600">
          Choose what information your agent should collect from callers
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Standard Fields */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-zinc-900 mb-4">
            Standard Fields
          </h3>
          <p className="text-sm text-zinc-600 mb-4">
            These are the details your agent will ask callers for during conversations
          </p>

          {/* Always Collected */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-zinc-900">
              Always Collected (Required)
            </p>
            
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox checked disabled className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Label className="font-medium text-zinc-900">Customer Name</Label>
                    <Badge variant="secondary" className="bg-zinc-200 text-zinc-700">
                      Required
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Agent will ask: "Could I get your name?"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox checked disabled className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Label className="font-medium text-zinc-900">Phone Number</Label>
                    <Badge variant="secondary" className="bg-zinc-200 text-zinc-700">
                      Required
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Agent will ask: "What's the best number to reach you?"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox checked disabled className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Label className="font-medium text-zinc-900">Reason for Call</Label>
                    <Badge variant="secondary" className="bg-zinc-200 text-zinc-700">
                      Required
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-600">
                    Agent will ask: "What are you calling about?"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="space-y-3 pt-4">
            <p className="text-sm font-semibold text-zinc-900">
              Optional Fields
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
                <Checkbox
                  id="email"
                  {...register("email")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="email" className="font-medium text-zinc-900 cursor-pointer">
                    Email Address
                  </Label>
                  <p className="text-xs text-zinc-600 mt-1">
                    Agent will ask: "Do you have an email address?"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
                <Checkbox
                  id="urgency"
                  {...register("urgency")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="urgency" className="font-medium text-zinc-900 cursor-pointer">
                    Urgency Level
                  </Label>
                  <p className="text-xs text-zinc-600 mt-1">
                    Agent will ask: "Would you like us to call you back on the next business day?"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
                <Checkbox
                  id="propertyAddress"
                  {...register("propertyAddress")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="propertyAddress" className="font-medium text-zinc-900 cursor-pointer">
                    Property Address
                  </Label>
                  <p className="text-xs text-zinc-600 mt-1">
                    Agent will ask: "What's the property address where service is needed?"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
                <Checkbox
                  id="bestTimeToCallback"
                  {...register("bestTimeToCallback")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="bestTimeToCallback" className="font-medium text-zinc-900 cursor-pointer">
                    Best Time to Call Back
                  </Label>
                  <p className="text-xs text-zinc-600 mt-1">
                    Agent will ask: "What's the best time for us to reach you?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Custom Questions */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-zinc-900 mb-1">
              Custom Questions
            </h3>
            <p className="text-sm text-zinc-600">
              Add specific questions unique to your business
            </p>
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-8 bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-300">
              <p className="text-zinc-600 mb-4">No custom questions yet</p>
              <p className="text-sm text-zinc-500 mb-6">
                Add questions specific to your business
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={addCustomField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Question
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 bg-zinc-50 border-zinc-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`question-${index}`}>
                          Custom Question {index + 1}
                        </Label>
                        <Input
                          id={`question-${index}`}
                          placeholder="e.g., What type of fence are you interested in?"
                          className="placeholder:text-zinc-400"
                          {...register(`customFields.${index}.question`)}
                        />
                        {errors.customFields?.[index]?.question && (
                          <p className="text-sm text-red-500">
                            {errors.customFields[index].question.message}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`required-${index}`}
                          {...register(`customFields.${index}.required`)}
                        />
                        <Label
                          htmlFor={`required-${index}`}
                          className="font-normal cursor-pointer"
                        >
                          Make this required
                        </Label>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}

              {fields.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomField}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Custom Question
                </Button>
              )}

              {fields.length >= 5 && (
                <p className="text-sm text-zinc-500 text-center">
                  Maximum 5 custom questions reached
                </p>
              )}
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
            ← Back to Step 2
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
              Continue to Step 4 →
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

