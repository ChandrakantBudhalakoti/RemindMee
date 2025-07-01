import { useState } from "react";
import { Reminder } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

interface ReminderFormProps {
  onSubmit: (
    reminder: Omit<Reminder, "id" | "createdAt" | "updatedAt">,
  ) => void;
  initialData?: Partial<Reminder>;
  submitLabel?: string;
}

export function ReminderForm({
  onSubmit,
  initialData,
  submitLabel = "Create Reminder",
}: ReminderFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    type: initialData?.type || ("general" as const),
    dateTime: initialData?.dateTime
      ? format(initialData.dateTime, "yyyy-MM-dd'T'HH:mm")
      : "",
    isCompleted: initialData?.isCompleted || false,
    isRecurring: initialData?.isRecurring || false,
    recurringPattern: initialData?.recurringPattern || ("weekly" as const),
    meetingLink: initialData?.meetingLink || "",
    priority: initialData?.priority || ("medium" as const),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      alert("Please enter a title for your reminder");
      return;
    }

    if (!formData.dateTime) {
      alert("Please select a date and time for your reminder");
      return;
    }

    // Check if the selected date is in the past
    const selectedDate = new Date(formData.dateTime);
    const now = new Date();
    if (selectedDate <= now) {
      alert("Please select a future date and time");
      return;
    }

    console.log("Creating reminder with data:", formData);

    const reminderData: Omit<Reminder, "id" | "createdAt" | "updatedAt"> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      type: formData.type,
      dateTime: selectedDate,
      isCompleted: formData.isCompleted,
      isRecurring: formData.isRecurring,
      recurringPattern: formData.isRecurring
        ? formData.recurringPattern
        : undefined,
      meetingLink: formData.meetingLink.trim() || undefined,
      priority: formData.priority,
    };

    console.log("Submitting reminder data:", reminderData);
    onSubmit(reminderData);
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-gradient-end bg-clip-text text-transparent">
          {initialData?.id ? "Edit Reminder" : "Create New Reminder"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Enter reminder title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Add any additional details"
              rows={3}
            />
          </div>

          {/* Type and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateField("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => updateField("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-2">
            <Label htmlFor="dateTime">Date & Time *</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => updateField("dateTime", e.target.value)}
              required
            />
          </div>

          {/* Meeting Link */}
          {formData.type === "meeting" && (
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link</Label>
              <Input
                id="meetingLink"
                value={formData.meetingLink}
                onChange={(e) => updateField("meetingLink", e.target.value)}
                placeholder="https://zoom.us/j/..."
                type="url"
              />
            </div>
          )}

          {/* Recurring */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Recurring Reminder</Label>
                <p className="text-sm text-muted-foreground">
                  Set this reminder to repeat
                </p>
              </div>
              <Switch
                checked={formData.isRecurring}
                onCheckedChange={(checked) =>
                  updateField("isRecurring", checked)
                }
              />
            </div>

            {formData.isRecurring && (
              <div className="space-y-2">
                <Label htmlFor="recurringPattern">Repeat Pattern</Label>
                <Select
                  value={formData.recurringPattern}
                  onValueChange={(value) =>
                    updateField("recurringPattern", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gradient-bg text-white"
            size="lg"
          >
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
