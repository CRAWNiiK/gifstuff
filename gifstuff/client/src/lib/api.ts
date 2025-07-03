export interface GifResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export interface QRResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export const gifApi = {
  async generateGif(endpoint: string, imageUrl: string): Promise<GifResponse> {
    try {
      const response = await fetch(`/api/gif/${endpoint}?image=${encodeURIComponent(imageUrl)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  },

  async generateQR(url: string): Promise<QRResponse> {
    try {
      const response = await fetch(`/api/qr?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  },

  async checkIP(): Promise<string> {
    try {
      const response = await fetch('/api/checkip');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      throw new Error('Failed to check IP address');
    }
  }
};

export const validateImageUrl = (url: string): boolean => {
  const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  return urlPattern.test(url);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
