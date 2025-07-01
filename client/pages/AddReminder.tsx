import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ReminderForm } from "@/components/ReminderForm";
import { useReminders } from "@/hooks/useReminders";
import { useNotifications } from "@/hooks/useNotifications";
import { Reminder } from "@shared/types";
import { toast } from "sonner";

export default function AddReminder() {
  const navigate = useNavigate();
  const { addReminder, reminders } = useReminders();
  const { requestPermission, scheduleNotification } = useNotifications();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleSubmit = (
    reminderData: Omit<Reminder, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      const newReminder = addReminder(reminderData);
      localStorage.setItem("reminders", JSON.stringify([...reminders, newReminder]));
      scheduleNotification(newReminder);
      toast.success("Reminder created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating reminder:", error);
      toast.error("Failed to create reminder. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-gradient-end bg-clip-text text-transparent mb-4">
            Create New Reminder
          </h1>
          <p className="text-lg text-muted-foreground">
            Never forget important moments and tasks
          </p>
        </div>

        <ReminderForm onSubmit={handleSubmit} submitLabel="Create Reminder" />
      </main>
    </div>
  );
}
