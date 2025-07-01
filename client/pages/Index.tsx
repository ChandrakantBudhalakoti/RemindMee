import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ReminderCard } from "@/components/ReminderCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReminders } from "@/hooks/useReminders";
import { useNotifications } from "@/hooks/useNotifications";
import { format, isToday, isTomorrow, startOfDay, addDays } from "date-fns";
import {
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Bell,
} from "lucide-react";

export default function Index() {
  const {
    reminders,
    deleteReminder,
    toggleComplete,
    getUpcomingReminders,
    getTodayReminders,
    getOverdueReminders,
  } = useReminders();

  const { requestPermission, scheduleNotification } = useNotifications();
  const [permissionRequested, setPermissionRequested] = useState(false);

  const upcomingReminders = getUpcomingReminders().slice(0, 5);
  const todayReminders = getTodayReminders();
  const overdueReminders = getOverdueReminders();

  // Request notification permission and schedule notifications
  useEffect(() => {
    if (!permissionRequested) {
      requestPermission();
      setPermissionRequested(true);
    }

    // Schedule notifications for upcoming reminders
    upcomingReminders.forEach((reminder) => {
      if (!reminder.isCompleted) {
        scheduleNotification(reminder);
      }
    });
  }, [
    upcomingReminders,
    requestPermission,
    scheduleNotification,
    permissionRequested,
  ]);

  const stats = [
    {
      title: "Today's Reminders",
      value: todayReminders.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Upcoming",
      value: upcomingReminders.length,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Completed",
      value: reminders.filter((r) => r.isCompleted).length,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Overdue",
      value: overdueReminders.length,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900",
    },
  ];

  const hasRemindersInStorage = (() => {
    try {
      const stored = localStorage.getItem("reminders");
      if (!stored) return false;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0;
    } catch {
      return false;
    }
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-gradient-end bg-clip-text text-transparent mb-4">
            Welcome back!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Stay organized and never miss an important moment
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="gradient-bg text-white">
              <Link to="/add" className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Reminder</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Bell className="h-5 w-5 mr-2" />
              Quick Actions
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Reminders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayReminders.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No reminders for today
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/add">
                      {hasRemindersInStorage ? "Add reminder" : "Add your first reminder"}
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayReminders.map((reminder) => (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      onToggleComplete={toggleComplete}
                      onDelete={deleteReminder}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Upcoming Reminders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingReminders.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming reminders</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/add">Schedule a reminder</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      onToggleComplete={toggleComplete}
                      onDelete={deleteReminder}
                    />
                  ))}
                  {upcomingReminders.length >= 5 && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/calendar">View all reminders</Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Overdue Reminders */}
        {overdueReminders.length > 0 && (
          <Card className="mt-8 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <span>Overdue Reminders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdueReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteReminder}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>All Reminders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reminders.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No reminders found</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/add">Add your first reminder</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {[...reminders]
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .map((reminder) => (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      onToggleComplete={toggleComplete}
                      onDelete={deleteReminder}
                    />
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
