import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GifCard } from "@/components/gif-card";
import { ResultModal } from "@/components/result-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { useGifGeneration, useQRGeneration, useIPCheck } from "@/hooks/use-gif-api";
import { validateImageUrl, validateUrl } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  DollarSign,
  Pizza,
  Tornado,
  Coins,
  Hand,
  Cat,
  Flame,
  Target,
  Sparkles,
  Image as ImageIcon,
  QrCode,
  Globe,
  Check,
} from "lucide-react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [generatedResult, setGeneratedResult] = useState<{
    url: string;
    type: "gif" | "qr";
  } | null>(null);

  const { toast } = useToast();
  const gifMutation = useGifGeneration();
  const qrMutation = useQRGeneration();
  const ipMutation = useIPCheck();

  const gifEndpoints = [
    { name: "Pet Pet", endpoint: "petpet", icon: Heart, color: "pink", description: "Add a petting animation to your image" },
    { name: "Money", endpoint: "money", icon: DollarSign, color: "green", description: "Make it rain money on your image" },
    { name: "Pizza", endpoint: "pizza", icon: Pizza, color: "orange", description: "Add pizza slices to your image" },
    { name: "Swirl", endpoint: "swirl", icon: Tornado, color: "purple", description: "Create a swirling effect" },
    { name: "Dogecash", endpoint: "dogecash", icon: Coins, color: "yellow", description: "Add Dogecoin money effect" },
    { name: "Slap", endpoint: "slap", icon: Hand, color: "red", description: "Add a slapping animation" },
    { name: "Cat Jam", endpoint: "catjam", icon: Cat, color: "indigo", description: "Add a cat jamming effect" },
    { name: "Burn", endpoint: "burn", icon: Flame, color: "orange", description: "Add fire burning effect" },
    { name: "Gun", endpoint: "gun", icon: Target, color: "gray", description: "Add gun pointing effect" },
  ];

  const validateImageInput = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image URL first",
        variant: "destructive",
      });
      return false;
    }

    if (!validateImageUrl(imageUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid image URL (jpg, png, gif, etc.)",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleGifGeneration = async (endpoint: string) => {
    if (!validateImageInput()) return;

    try {
      const result = await gifMutation.mutateAsync({ endpoint, imageUrl });
      if (result.success && result.url) {
        setGeneratedResult({ url: result.url, type: "gif" });
      }
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleQRGeneration = async () => {
    if (!qrUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(qrUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await qrMutation.mutateAsync(qrUrl);
      if (result.success && result.url) {
        setGeneratedResult({ url: result.url, type: "qr" });
      }
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleIPCheck = async () => {
    try {
      const ip = await ipMutation.mutateAsync();
      setIpAddress(ip);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const validateImageUrlInput = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (validateImageUrl(imageUrl)) {
      toast({
        title: "Valid URL!",
        description: "This is a valid image URL",
      });
    } else {
      toast({
        title: "Invalid URL",
        description: "Please use a direct link to an image file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Sparkles className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">GifStuff</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Create Amazing GIFs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your images into entertaining GIFs with our collection of fun effects and generators.
          </p>
        </section>

        {/* Input Section */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <ImageIcon className="text-primary mr-2" />
                <h3 className="text-lg font-semibold">Image URL Input</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === "Enter" && validateImageUrlInput()}
                />
                <Button onClick={validateImageUrlInput} className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Validate
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter a valid image URL to generate GIFs using the effects below.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* GIF Generation Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="text-secondary mr-2" />
            <h3 className="text-2xl font-bold">GIF Effects</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifEndpoints.map((effect) => (
              <GifCard
                key={effect.endpoint}
                title={effect.name}
                description={effect.description}
                icon={effect.icon}
                endpoint={effect.endpoint}
                color={effect.color}
                onGenerate={handleGifGeneration}
                isLoading={gifMutation.isPending}
              />
            ))}
          </div>
        </section>

        {/* Special Tools Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="text-primary mr-2" />
            <h3 className="text-2xl font-bold">Special Tools</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Generator */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                    <QrCode className="text-blue-600 dark:text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">QR Code Generator</h4>
                    <p className="text-muted-foreground text-sm">Generate QR codes from URLs</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input
                    type="url"
                    placeholder="Enter URL to generate QR code"
                    value={qrUrl}
                    onChange={(e) => setQrUrl(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleQRGeneration()}
                  />
                  <Button
                    onClick={handleQRGeneration}
                    disabled={qrMutation.isPending}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    {qrMutation.isPending ? "Generating..." : "Generate QR Code"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* IP Checker */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mr-4">
                    <Globe className="text-teal-600 dark:text-teal-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">IP Address Checker</h4>
                    <p className="text-muted-foreground text-sm">Check your current IP address</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="px-4 py-3 bg-muted rounded-lg text-center">
                    <span className={`text-lg font-mono ${ipAddress ? "text-foreground" : "text-muted-foreground"}`}>
                      {ipAddress || "Click to check your IP"}
                    </span>
                  </div>
                  <Button
                    onClick={handleIPCheck}
                    disabled={ipMutation.isPending}
                    className="w-full bg-teal-500 hover:bg-teal-600"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {ipMutation.isPending ? "Checking..." : "Check My IP"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Result Modal */}
        <ResultModal
          url={generatedResult?.url || ""}
          type={generatedResult?.type || "gif"}
          isOpen={!!generatedResult}
          onClose={() => setGeneratedResult(null)}
        />
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            Built with <Heart className="inline h-4 w-4 text-red-500" /> using GifStuffAPI
          </p>
        </div>
      </footer>
    </div>
  );
}
