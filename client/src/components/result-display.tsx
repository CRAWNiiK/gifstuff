import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  url: string;
  type: "gif" | "qr";
  onClose: () => void;
}

export function ResultDisplay({ url, type, onClose }: ResultDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "error",
      });
    }
  };

  const downloadContent = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();
    toast({
      title: "Download started!",
      description: "Your file is being downloaded",
      variant: "success",
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">
              {type === "gif" ? "Generated GIF" : "Generated QR Code"}
            </h4>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
          
          <div className="flex justify-center">
            {!imageLoaded && (
              <div className="flex items-center justify-center w-64 h-64 bg-muted rounded-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <img
              src={url}
              alt={type === "gif" ? "Generated GIF" : "Generated QR Code"}
              className={`max-w-full h-auto rounded-lg shadow-lg ${
                imageLoaded ? "block" : "hidden"
              }`}
              style={{ maxHeight: "400px" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground break-all font-mono">
              {url}
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={copyToClipboard} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy URL
            </Button>
            <Button
              onClick={downloadContent}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
