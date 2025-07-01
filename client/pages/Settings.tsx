import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Plus, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-gradient-end bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Customize your reminder preferences
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-6 w-6" />
              <span>App Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-16">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="p-4 gradient-bg rounded-full">
                  <SettingsIcon className="h-12 w-12 text-white" />
                </div>
                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Bell className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Settings Panel Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We're building comprehensive settings to let you customize
                notifications, themes, default reminder types, and much more!
              </p>
              <div className="flex justify-center gap-4">
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
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
