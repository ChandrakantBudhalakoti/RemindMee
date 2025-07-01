import { useState, useEffect } from "react";
import { Reminder } from "@shared/types";

const STORAGE_KEY = "reminders";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored !== "[]") {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const remindersWithDates = parsed.map((reminder: any) => ({
            ...reminder,
            dateTime: new Date(reminder.dateTime),
            createdAt: new Date(reminder.createdAt),
            updatedAt: new Date(reminder.updatedAt),
          }));
          setReminders(remindersWithDates);
        }
      } else {
        console.warn("No reminders found in localStorage");
      }
      setIsInitialized(true);
    } catch (error) {
      console.error("Error loading reminders from localStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
      } catch (error) {
        console.error("Error saving reminders to localStorage:", error);
      }
    }
  }, [reminders, isInitialized]);

  const addReminder = (
    reminder: Omit<Reminder, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newReminder: Reminder = {
      ...reminder,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setReminders((prev) => {
      const updated = [...prev, newReminder];
      return updated;
    });
    return newReminder;
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, ...updates, updatedAt: new Date() }
          : reminder,
      ),
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const toggleComplete = (id: string) => {
    updateReminder(id, {
      isCompleted: !reminders.find((r) => r.id === id)?.isCompleted,
    });
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    return reminders
      .filter((reminder) => !reminder.isCompleted && reminder.dateTime > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
  };

  const getTodayReminders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return reminders.filter(
      (reminder) =>
        reminder.dateTime >= today &&
        reminder.dateTime < tomorrow &&
        !reminder.isCompleted,
    );
  };

  const getOverdueReminders = () => {
    const now = new Date();
    return reminders.filter(
      (reminder) => reminder.dateTime < now && !reminder.isCompleted,
    );
  };

  return {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleComplete,
    getUpcomingReminders,
    getTodayReminders,
    getOverdueReminders,
  };
}
