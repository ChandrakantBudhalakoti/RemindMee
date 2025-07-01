import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Home, Plus, Settings, Clock } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Add Reminder", href: "/add", icon: Plus },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 gradient-bg rounded-xl">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-gradient-end bg-clip-text text-transparent">
                RemindMe
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "transition-all duration-200",
                    isActive && "gradient-bg text-white shadow-lg",
                  )}
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
