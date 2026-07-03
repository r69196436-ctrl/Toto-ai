import { OpenAI } from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { Message, Conversation } from '@types/index';

class AIService {
  private openaiClient: OpenAI | null = null;
  private anthropicClient: Anthropic | null = null;

  initializeOpenAI(apiKey: string) {
    this.openaiClient = new OpenAI({ apiKey });
  }

  initializeAnthropic(apiKey: string) {
    this.anthropicClient = new Anthropic({ apiKey });
  }

  async sendMessageOpenAI(
    conversation: Conversation,
    userMessage: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    if (!this.openaiClient) {
      throw new Error('OpenAI client not initialized');
    }

    try {
      const messages = conversation.messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      messages.push({ role: 'user', content: userMessage });

      let fullResponse = '';

      const stream = await this.openaiClient.chat.completions.create({
        model: conversation.model || 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      });

      for await (const chunk of stream) {
        const content =
          chunk.choices[0].delta?.content || '';
        fullResponse += content;
        if (onChunk) {
          onChunk(content);
        }
      }

      return fullResponse;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async sendMessageAnthropic(
    conversation: Conversation,
    userMessage: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    if (!this.anthropicClient) {
      throw new Error('Anthropic client not initialized');
    }

    try {
      const systemPrompt = 'You are a helpful AI assistant. Provide concise and accurate responses.';
      const messages = conversation.messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      messages.push({ role: 'user', content: userMessage });

      let fullResponse = '';

      const stream = await this.anthropicClient.messages.stream({
        model: conversation.model || 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        system: systemPrompt,
        messages,
      });

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          fullResponse += chunk.delta.text;
          if (onChunk) {
            onChunk(chunk.delta.text);
          }
        }
      }

      return fullResponse;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.message.includes('API')) {
      return new Error('API Error: Invalid API key or service unavailable');
    }
    return new Error(error.message || 'An error occurred');
  }
}

export default new AIService();
