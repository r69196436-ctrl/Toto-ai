import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@store/appStore';
import imageService from '@services/imageService';
import { colors } from '@utils/colors';

interface ImageGenerationScreenProps {
  navigation: any;
}

export const ImageGenerationScreen: React.FC<ImageGenerationScreenProps> = ({
  navigation,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];

  const { settings } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [size, setSize] = useState<'256x256' | '512x512' | '1024x1024'>('512x512');

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    if (!settings.openaiApiKey) {
      Alert.alert('Error', 'OpenAI API key not configured. Please add it in Settings.');
      return;
    }

    setLoading(true);
    try {
      imageService.initializeOpenAI(settings.openaiApiKey);
      const url = await imageService.generateImage(prompt, size);
      setImageUrl(url);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={themeColors.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Image Generation
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
          <Text style={[styles.label, { color: themeColors.text }]}>
            Describe the image you want to generate
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.background,
                color: themeColors.text,
                borderColor: themeColors.border,
              },
            ]}
            placeholder="E.g., A futuristic city at sunset..."
            placeholderTextColor={themeColors.textSecondary}
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={4}
          />

          <Text style={[styles.label, { color: themeColors.text, marginTop: 12 }]}>
            Image Size
          </Text>
          <View style={styles.sizeContainer}>
            {(['256x256', '512x512', '1024x1024'] as const).map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.sizeButton,
                  {
                    backgroundColor: size === s ? themeColors.primary : themeColors.border,
                  },
                ]}
                onPress={() => setSize(s)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    { color: size === s ? 'white' : themeColors.text },
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.generateButton,
              { backgroundColor: themeColors.primary },
            ]}
            onPress={handleGenerateImage}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="white" />
                <Text style={styles.generateText}>Generate Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {imageUrl && (
          <View style={[styles.resultCard, { backgroundColor: themeColors.surface }]}>
            <Text style={[styles.resultTitle, { color: themeColors.text }]}>
              Generated Image
            </Text>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sizeText: {
    fontWeight: '600',
    fontSize: 12,
  },
  generateButton: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  generateText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  resultCard: {
    borderRadius: 12,
    padding: 16,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
});
