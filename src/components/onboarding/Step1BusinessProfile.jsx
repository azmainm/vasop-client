"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const businessProfileSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(1, "Please select an industry"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "Please select a state"),
    zip: z.string().regex(/^\d{5}$/, "Please enter a valid ZIP code"),
  }),
  hours: z.object({
    mondayFriday: z.string().min(1, "Please enter your weekday hours"),
    saturday: z.string().min(1, "Please enter Saturday hours or 'Closed'"),
    sunday: z.string().min(1, "Please enter Sunday hours or 'Closed'"),
  }),
});

const industries = [
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electrical",
  "Construction",
  "Landscaping",
  "Fencing",
  "Other",
];

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export function Step1BusinessProfile({ data, onNext, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: data || {},
  });

  const onSubmit = (formData) => {
    onNext(formData);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
          Tell Us About Your Business
        </h2>
        <p className="text-zinc-600">
          Let's start with the basics about your business
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-zinc-900 mb-4">
            Basic Information
          </h3>

          <div className="space-y-2">
            <Label htmlFor="businessName">
              Business Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              placeholder="4Trades"
              className="placeholder:text-zinc-400"
              {...register("businessName")}
            />
            {errors.businessName && (
              <p className="text-sm text-red-500">{errors.businessName.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              The name of your business as customers know it
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">
              Industry <span className="text-red-500">*</span>
            </Label>
            <select
              id="industry"
              {...register("industry")}
              className="w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="">Select your industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-sm text-red-500">{errors.industry.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              What type of services does your business provide?
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              placeholder="www.4trades.ai"
              className="placeholder:text-zinc-400"
              {...register("website")}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              Your business website if you have one
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Business Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              className="placeholder:text-zinc-400"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              Main phone number for your business
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Business Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="contact@4trades.ai"
              className="placeholder:text-zinc-400"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              Main email address for your business
            </p>
          </div>
        </Card>

        {/* Business Address */}
        <Card className="p-6 space-y-4 bg-zinc-50">
          <h3 className="font-semibold text-lg text-zinc-900 mb-4">
            Business Address
          </h3>

          <div className="space-y-2">
            <Label htmlFor="street">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="street"
              placeholder="123 Main Street"
              className="placeholder:text-zinc-400"
              {...register("address.street")}
            />
            {errors.address?.street && (
              <p className="text-sm text-red-500">{errors.address.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Portland"
                className="placeholder:text-zinc-400"
                {...register("address.city")}
              />
              {errors.address?.city && (
                <p className="text-sm text-red-500">{errors.address.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip">
                ZIP Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zip"
                placeholder="97201"
                className="placeholder:text-zinc-400"
                {...register("address.zip")}
              />
              {errors.address?.zip && (
                <p className="text-sm text-red-500">{errors.address.zip.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">
              State <span className="text-red-500">*</span>
            </Label>
            <select
              id="state"
              {...register("address.state")}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="">Select state</option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.address?.state && (
              <p className="text-sm text-red-500">{errors.address.state.message}</p>
            )}
          </div>
        </Card>

        {/* Business Hours */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg text-zinc-900 mb-4">
            Business Hours
          </h3>
          <p className="text-sm text-zinc-600 mb-4">
            When is your business typically available?
          </p>

          <div className="space-y-2">
            <Label htmlFor="mondayFriday">
              Monday - Friday <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mondayFriday"
              placeholder="8 AM - 6 PM"
              className="placeholder:text-zinc-400"
              {...register("hours.mondayFriday")}
            />
            {errors.hours?.mondayFriday && (
              <p className="text-sm text-red-500">{errors.hours.mondayFriday.message}</p>
            )}
            <p className="text-xs text-zinc-500">e.g., 8 AM - 6 PM, 9 AM - 5 PM</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="saturday">
              Saturday <span className="text-red-500">*</span>
            </Label>
            <Input
              id="saturday"
              placeholder="9 AM - 4 PM or Closed"
              className="placeholder:text-zinc-400"
              {...register("hours.saturday")}
            />
            {errors.hours?.saturday && (
              <p className="text-sm text-red-500">{errors.hours.saturday.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              e.g., 9 AM - 4 PM or type 'Closed'
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sunday">
              Sunday <span className="text-red-500">*</span>
            </Label>
            <Input
              id="sunday"
              placeholder="Closed"
              className="placeholder:text-zinc-400"
              {...register("hours.sunday")}
            />
            {errors.hours?.sunday && (
              <p className="text-sm text-red-500">{errors.hours.sunday.message}</p>
            )}
            <p className="text-xs text-zinc-500">
              e.g., 10 AM - 2 PM or type 'Closed'
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSave(handleSubmit((data) => data)())}
          >
            Save & Continue Later
          </Button>
          <Button type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100">
            Continue to Step 2 →
          </Button>
        </div>
      </form>
    </div>
  );
}

