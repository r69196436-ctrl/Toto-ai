import { OpenAI } from 'openai';

class ImageService {
  private openaiClient: OpenAI | null = null;

  initializeOpenAI(apiKey: string) {
    this.openaiClient = new OpenAI({ apiKey });
  }

  async generateImage(prompt: string, size: '256x256' | '512x512' | '1024x1024' = '512x512'): Promise<string> {
    if (!this.openaiClient) {
      throw new Error('OpenAI client not initialized');
    }

    try {
      const response = await this.openaiClient.images.generate({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size,
      });

      return response.data[0].url || '';
    } catch (error) {
      throw new Error('Failed to generate image');
    }
  }
}

export default new ImageService();
