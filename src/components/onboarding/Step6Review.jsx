"use client";

import { useState } from "react";
import { Edit2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Step6Review({ 
  businessProfile,
  voiceAgent,
  collectionFields,
  emergencyHandling,
  emailConfig,
  onEdit,
  onSubmit,
  onBack,
  onSave 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
          Review Your Information
        </h2>
        <p className="text-zinc-600">
          Please review all your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Business Profile */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900">
              Business Profile
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-zinc-600 hover:text-zinc-900"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Step 1
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-600 mb-1">Business Name</p>
              <p className="font-medium text-zinc-900">{businessProfile?.businessName}</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Industry</p>
              <p className="font-medium text-zinc-900">{businessProfile?.industry}</p>
            </div>
            {businessProfile?.website && (
              <div>
                <p className="text-zinc-600 mb-1">Website</p>
                <p className="font-medium text-zinc-900">{businessProfile.website}</p>
              </div>
            )}
            <div>
              <p className="text-zinc-600 mb-1">Phone</p>
              <p className="font-medium text-zinc-900">{businessProfile?.phone}</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Email</p>
              <p className="font-medium text-zinc-900">{businessProfile?.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-zinc-600 mb-1">Address</p>
              <p className="font-medium text-zinc-900">
                {businessProfile?.address?.street}, {businessProfile?.address?.city}, {businessProfile?.address?.state} {businessProfile?.address?.zip}
              </p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Mon-Fri Hours</p>
              <p className="font-medium text-zinc-900">{businessProfile?.hours?.mondayFriday}</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Saturday</p>
              <p className="font-medium text-zinc-900">{businessProfile?.hours?.saturday}</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Sunday</p>
              <p className="font-medium text-zinc-900">{businessProfile?.hours?.sunday}</p>
            </div>
          </div>
        </Card>

        {/* Voice Agent Configuration */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900">
              Voice Agent Configuration
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-zinc-600 hover:text-zinc-900"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Step 2
            </Button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-zinc-600 mb-1">Agent Name</p>
              <p className="font-medium text-zinc-900">{voiceAgent?.agentName}</p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Personality</p>
              <p className="font-medium text-zinc-900 capitalize">
                {voiceAgent?.agentPersonality}
              </p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Greeting</p>
              <div className="bg-zinc-50 border border-zinc-300 rounded-lg p-3 mt-2">
                <p className="text-zinc-900 italic">"{voiceAgent?.greeting}"</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Information Collection */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900">
              Information Collection
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              className="text-zinc-600 hover:text-zinc-900"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Step 3
            </Button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-zinc-600 mb-2">Required Fields</p>
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-zinc-900">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Customer Name
                </p>
                <p className="flex items-center gap-2 text-zinc-900">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Phone Number
                </p>
                <p className="flex items-center gap-2 text-zinc-900">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Reason for Call
                </p>
              </div>
            </div>
            
            {(collectionFields?.email || collectionFields?.urgency || collectionFields?.propertyAddress || collectionFields?.bestTimeToCallback) && (
              <div>
                <p className="text-zinc-600 mb-2">Optional Fields Enabled</p>
                <div className="space-y-1">
                  {collectionFields.email && (
                    <p className="flex items-center gap-2 text-zinc-900">
                      <CheckCircle className="h-4 w-4 text-green-600" /> Email Address
                    </p>
                  )}
                  {collectionFields.urgency && (
                    <p className="flex items-center gap-2 text-zinc-900">
                      <CheckCircle className="h-4 w-4 text-green-600" /> Urgency Level
                    </p>
                  )}
                  {collectionFields.propertyAddress && (
                    <p className="flex items-center gap-2 text-zinc-900">
                      <CheckCircle className="h-4 w-4 text-green-600" /> Property Address
                    </p>
                  )}
                  {collectionFields.bestTimeToCallback && (
                    <p className="flex items-center gap-2 text-zinc-900">
                      <CheckCircle className="h-4 w-4 text-green-600" /> Best Time to Call Back
                    </p>
                  )}
                </div>
              </div>
            )}

            {collectionFields?.customFields && collectionFields.customFields.length > 0 && (
              <div>
                <p className="text-zinc-600 mb-2">Custom Questions</p>
                <div className="space-y-2">
                  {collectionFields.customFields.map((field, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-zinc-900 font-medium">{i + 1}.</span>
                      <div>
                        <p className="text-zinc-900">{field.question}</p>
                        {field.required && (
                          <span className="text-xs text-zinc-600">(Required)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Emergency Handling */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900">
              Emergency Call Handling
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(4)}
              className="text-zinc-600 hover:text-zinc-900"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Step 4
            </Button>
          </div>
          
          {emergencyHandling?.enabled ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="font-medium text-zinc-900">Enabled</p>
              </div>
              <div>
                <p className="text-zinc-600 mb-1">Forward To</p>
                <p className="font-medium text-zinc-900">{emergencyHandling.forwardToNumber}</p>
              </div>
              <div>
                <p className="text-zinc-600 mb-1">Trigger Method</p>
                <p className="font-medium text-zinc-900">
                  {emergencyHandling.triggerMethod === "pound_key" ? "Press # Key" : "Say 'Emergency'"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="h-5 w-5 text-zinc-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-zinc-900 mb-1">Disabled</p>
                <p className="text-zinc-600">All calls will follow standard flow</p>
              </div>
            </div>
          )}
        </Card>

        {/* Email Configuration */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-zinc-900">
              Email Configuration
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(5)}
              className="text-zinc-600 hover:text-zinc-900"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Step 5
            </Button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-zinc-600 mb-1">Call Summaries</p>
              <p className="font-medium text-zinc-900 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Enabled
              </p>
            </div>
            <div>
              <p className="text-zinc-600 mb-1">Send To</p>
              <p className="font-medium text-zinc-900">{emailConfig?.recipientEmail}</p>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                What Happens Next?
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>After you submit:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Your information will be reviewed by our team</li>
                  <li>We'll manually set up your voice agent</li>
                  <li>Our team will contact you with your phone number and next steps</li>
                </ol>
                <p className="font-medium mt-3">
                  Expected setup time: 2-3 business days
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          ← Back to Step 5
        </Button>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSave}
          >
            Save & Continue Later
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-100"
          >
            {isSubmitting ? "Submitting..." : "Submit for Review →"}
          </Button>
        </div>
      </div>
    </div>
  );
}

