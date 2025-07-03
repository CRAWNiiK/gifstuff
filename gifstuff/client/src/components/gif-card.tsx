import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface GifCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  endpoint: string;
  color: string;
  onGenerate: (endpoint: string) => void;
  isLoading?: boolean;
}

export function GifCard({
  title,
  description,
  icon: Icon,
  endpoint,
  color,
  onGenerate,
  isLoading = false,
}: GifCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap = {
      pink: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
      green: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      orange: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      yellow: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
      red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
      gray: "bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const getButtonClasses = (color: string) => {
    const buttonMap = {
      pink: "bg-pink-500 hover:bg-pink-600",
      green: "bg-green-500 hover:bg-green-600",
      orange: "bg-orange-500 hover:bg-orange-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      yellow: "bg-yellow-500 hover:bg-yellow-600",
      red: "bg-red-500 hover:bg-red-600",
      indigo: "bg-indigo-500 hover:bg-indigo-600",
      gray: "bg-gray-500 hover:bg-gray-600",
    };
    return buttonMap[color as keyof typeof buttonMap] || buttonMap.gray;
  };

  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">{title}</h4>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(color)}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button
          onClick={() => onGenerate(endpoint)}
          disabled={isLoading}
          className={`w-full text-white font-medium transition-colors duration-200 ${getButtonClasses(color)}`}
        >
          {isLoading ? "Generating..." : `Generate ${title}`}
        </Button>
      </CardContent>
    </Card>
  );
}
