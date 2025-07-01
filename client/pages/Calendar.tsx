import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CalendarComponent from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useReminders } from "@/hooks/useReminders";

export default function Calendar() {
  const [value, setValue] = useState(new Date());
  const { reminders } = useReminders();
  const selectedDateReminders = reminders.filter((reminder) => {
    const reminderDate = new Date(reminder.dateTime);
    return (
      reminderDate.getFullYear() === value.getFullYear() &&
      reminderDate.getMonth() === value.getMonth() &&
      reminderDate.getDate() === value.getDate()
    );
  });

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (
      reminders.some((reminder) => {
        const d = new Date(reminder.dateTime);
        return (
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
        );
      })
    ) {
      return "bg-purple-200 rounded-full";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-gradient-end bg-clip-text text-transparent mb-4">
            Calendar View
          </h1>
          <p className="text-lg text-muted-foreground">
            View all your reminders in calendar format
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-6 w-6" />
              <span>Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <CalendarComponent
                onChange={(val) => {
                  if (val instanceof Date) {
                    setValue(val);
                  } else if (Array.isArray(val) && val[0] instanceof Date) {
                    setValue(val[0]);
                  }
                }}
                value={value}
                tileClassName={tileClassName}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  Reminders for {value.toLocaleDateString()}
                </h3>
                {selectedDateReminders.length === 0 ? (
                  <p className="text-muted-foreground">
                    No reminders for this day.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {selectedDateReminders.map((reminder) => (
                      <li
                        key={reminder.id}
                        className="p-2 rounded bg-purple-50 dark:bg-slate-800"
                      >
                        <div className="font-medium">{reminder.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {reminder.description}
                        </div>
                        <div className="text-xs">
                          {new Date(reminder.dateTime).toLocaleTimeString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button asChild>
                <Link to="/">Back to Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/add" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Reminder</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
