import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

class SpeechService {
  async requestMicrophonePermission(): Promise<boolean> {
    try {
      const permission = await Audio.requestPermissionsAsync();
      return permission.status === 'granted';
    } catch (error) {
      console.error('Microphone permission error:', error);
      return false;
    }
  }

  async startRecording(): Promise<Audio.Recording> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      return recording;
    } catch (error) {
      throw new Error('Failed to start recording');
    }
  }

  async stopRecording(recording: Audio.Recording): Promise<string> {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      return uri || '';
    } catch (error) {
      throw new Error('Failed to stop recording');
    }
  }

  async speak(text: string): Promise<void> {
    try {
      await Speech.speak(text, {
        language: 'en',
        pitch: 1,
        rate: 1,
      });
    } catch (error) {
      console.error('Speech error:', error);
    }
  }

  async stopSpeaking(): Promise<void> {
    try {
      await Speech.stop();
    } catch (error) {
      console.error('Stop speech error:', error);
    }
  }
}

export default new SpeechService();
