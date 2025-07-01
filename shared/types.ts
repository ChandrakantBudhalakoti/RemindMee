export interface Reminder {
  id: string;
  title: string;
  description?: string;
  type: "general" | "meeting" | "birthday" | "task";
  dateTime: Date;
  isCompleted: boolean;
  isRecurring: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly" | "yearly";
  meetingLink?: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationSettings {
  enabled: boolean;
  soundEnabled: boolean;
  desktopEnabled: boolean;
  advanceNotice: number; // minutes before reminder
}
