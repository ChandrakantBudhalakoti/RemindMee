import { format } from "date-fns";
import { Reminder } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Clock,
  Calendar,
  ExternalLink,
  Trash2,
  Check,
  AlertCircle,
  Users,
  Gift,
  CheckCircle2,
} from "lucide-react";

interface ReminderCardProps {
  reminder: Reminder;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (reminder: Reminder) => void;
}

const typeIcons = {
  general: Clock,
  meeting: Users,
  birthday: Gift,
  task: CheckCircle2,
};

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const typeColors = {
  general: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  meeting:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  birthday: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  task: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export function ReminderCard({
  reminder,
  onToggleComplete,
  onDelete,
  onEdit,
}: ReminderCardProps) {
  const TypeIcon = typeIcons[reminder.type];
  const isOverdue = reminder.dateTime < new Date() && !reminder.isCompleted;
  const formattedDate = format(reminder.dateTime, "MMM dd, yyyy 'at' h:mm a");

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-lg border-l-4",
        reminder.isCompleted
          ? "opacity-60 border-l-green-400"
          : isOverdue
            ? "border-l-red-400 bg-red-50/50 dark:bg-red-950/20"
            : "border-l-primary",
        "group cursor-pointer",
      )}
      onClick={() => onEdit?.(reminder)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div
              className={cn(
                "p-2 rounded-lg",
                reminder.isCompleted
                  ? "bg-green-100 dark:bg-green-900"
                  : "gradient-bg",
              )}
            >
              <TypeIcon
                className={cn(
                  "h-4 w-4",
                  reminder.isCompleted
                    ? "text-green-600 dark:text-green-400"
                    : "text-white",
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "text-lg font-semibold",
                  reminder.isCompleted && "line-through text-muted-foreground",
                )}
              >
                {reminder.title}
              </h3>
              {reminder.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {reminder.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(reminder.id);
              }}
              className="h-8 w-8 p-0"
            >
              {reminder.isCompleted ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(reminder.id);
              }}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            {isOverdue && !reminder.isCompleted && (
              <div className="flex items-center space-x-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>Overdue</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={typeColors[reminder.type]}>
              {reminder.type}
            </Badge>
            <Badge
              variant="outline"
              className={priorityColors[reminder.priority]}
            >
              {reminder.priority}
            </Badge>
            {reminder.meetingLink && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-6 w-6 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={reminder.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
