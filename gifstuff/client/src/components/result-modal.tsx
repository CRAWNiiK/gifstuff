import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultModalProps {
  url: string;
  type: "gif" | "qr";
  isOpen: boolean;
  onClose: () => void;
}

export function ResultModal({ url, type, isOpen, onClose }: ResultModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
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
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setImageLoaded(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "gif" ? "Generated GIF" : "Generated QR Code"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
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
          
          <div className="flex justify-center space-x-3">
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
      </DialogContent>
    </Dialog>
  );
}