import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GEMINI_API_KEY } from '@/constants/gemini';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  
  // Initialize Gemini AI
  const genAI = useRef<GoogleGenerativeAI | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);

  useEffect(() => {
    // Check if API key is configured
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
        setIsApiKeyValid(true);
      } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        Alert.alert(
          'Lỗi cấu hình',
          'Không thể khởi tạo AI. Vui lòng kiểm tra API key trong constants/gemini.ts'
        );
      }
    }
  }, []);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: isApiKeyValid
          ? 'Xin chào! Tôi đang chạy ở chế độ demo. Để sử dụng AI thật với Gemini, vui lòng thêm API key vào file constants/gemini.ts. Lấy API key miễn phí tại: https://makersuite.google.com/app/apikey'
        : 'Xin chào! Tôi là trợ lý AI của ứng dụng Di Sản Việt Nam Dân Chủ Cộng Hòa. Tôi có thể giúp bạn tìm hiểu về lịch sử, văn hóa, và các sự kiện quan trọng của Việt Nam Dân Chủ Cộng Hòa (1955-1975). Bạn muốn hỏi gì?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      // Use Gemini API if configured, otherwise fallback to local responses
      let responseText: string;

      if (isApiKeyValid && genAI.current) {
        responseText = await getGeminiResponse(userQuery);
      } else {
        responseText = generateLocalResponse(userQuery);
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Xin lỗi, đã có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getGeminiResponse = async (query: string): Promise<string> => {
    if (!genAI.current) {
      throw new Error('Gemini AI not initialized');
    }

    const model = genAI.current.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemPrompt = `Bạn là một trợ lý AI chuyên về lịch sử Việt Nam Dân Chủ Cộng Hòa (1955-1975). 
Hãy trả lời các câu hỏi một cách chính xác, khách quan và có cơ sở lịch sử.
Tập trung vào các sự kiện, nhân vật, văn hóa và đời sống xã hội trong thời kỳ này.
Trả lời bằng tiếng Việt, ngắn gọn (2-4 câu) nhưng đầy đủ thông tin.
Nếu câu hỏi không liên quan đến Việt Nam Dân Chủ Cộng Hòa, hãy lịch sự hướng người dùng về chủ đề này.`;

    const prompt = `${systemPrompt}\n\nCâu hỏi: ${query}\n\nTrả lời:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  };

  const generateLocalResponse = (query: string): string => {
    // Simple pattern matching for demo purposes (fallback when API key not configured)
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('ngô đình diệm') || lowerQuery.includes('ngo dinh diem')) {
      return 'Ngô Đình Diệm là Tổng thống đầu tiên của Việt Nam Dân Chủ Cộng Hòa (1955-1963). Ông đã đóng vai trò quan trọng trong việc xây dựng chính quyền mới sau Hiệp định Geneva 1954. Tuy nhiên, chính quyền của ông cũng gặp nhiều tranh cãi do các chính sách độc đoán và đàn áp đối lập.';
    }
    
    if (lowerQuery.includes('hiệp định geneva') || lowerQuery.includes('1954')) {
      return 'Hiệp định Geneva 1954 được ký kết ngày 21/7/1954, kết thúc cuộc chiến tranh Đông Dương lần thứ nhất. Hiệp định này chia đất nước tạm thời tại vĩ tuyến 17, với miền Bắc do chính quyền Việt Nam Dân chủ Cộng hòa quản lý và miền Nam do Quốc gia Việt Nam (sau này là Việt Nam Dân Chủ Cộng Hòa) quản lý.';
    }
    
    if (lowerQuery.includes('sài gòn') || lowerQuery.includes('saigon')) {
      return 'Sài Gòn là thủ đô của Việt Nam Dân Chủ Cộng Hòa từ 1955-1975. Thành phố này là trung tâm chính trị, kinh tế, văn hóa quan trọng, được mệnh danh là "Hòn ngọc Viễn Đông". Sài Gòn có nhiều công trình kiến trúc độc đáo kết hợp giữa phong cách Pháp và bản địa.';
    }
    
    if (lowerQuery.includes('tết mậu thân') || lowerQuery.includes('1968')) {
      return 'Tổng tiến công và nổi dậy Tết Mậu Thân 1968 là chiến dịch quân sự lớn diễn ra vào ngày 30/1/1968. Đây là sự kiện quan trọng đánh dấu bước ngoặt trong cuộc chiến, cho thấy quyết tâm và khả năng chiến đấu của lực lượng giải phóng.';
    }
    
    if (lowerQuery.includes('30/4') || lowerQuery.includes('30 tháng 4') || lowerQuery.includes('1975')) {
      return 'Ngày 30/4/1975 đánh dấu sự kết thúc của Việt Nam Dân Chủ Cộng Hòa với chiến dịch Hồ Chí Minh. Đây là sự kiện lịch sử quan trọng kết thúc 20 năm chia cắt đất nước, mở ra giai đoạn thống nhất và xây dựng đất nước.';
    }
    
    if (lowerQuery.includes('văn hóa') || lowerQuery.includes('culture')) {
      return 'Văn hóa Việt Nam Dân Chủ Cộng Hòa thời kỳ 1955-1975 rất đa dạng và phong phú. Sài Gòn là trung tâm văn hóa sôi động với nhiều nhà hát, rạp chiếu phim, câu lạc bộ âm nhạc. Âm nhạc trữ tình, nhạc vàng, và nghệ thuật điện ảnh đã phát triển mạnh mẽ trong thời kỳ này.';
    }
    
    if (lowerQuery.includes('giáo dục') || lowerQuery.includes('education')) {
      return 'Hệ thống giáo dục Việt Nam Dân Chủ Cộng Hòa được xây dựng theo mô hình Pháp-Mỹ với nhiều trường đại học danh tiếng như Đại học Văn khoa Sài Gòn, Đại học Y khoa, Đại học Luật khoa. Giáo dục được chú trọng đầu tư và phát triển.';
    }

    if (lowerQuery.includes('kinh tế') || lowerQuery.includes('economy')) {
      return 'Kinh tế Việt Nam Dân Chủ Cộng Hòa chủ yếu dựa vào nông nghiệp, thương mại và dịch vụ. Sài Gòn là trung tâm kinh tế lớn với nhiều doanh nghiệp, ngân hàng và thị trường sôi động. Miền Nam cũng nhận được viện trợ kinh tế đáng kể từ Hoa Kỳ.';
    }
    
    // Default response
    return 'Cảm ơn câu hỏi của bạn! Tôi có thể giúp bạn tìm hiểu về nhiều chủ đề liên quan đến Việt Nam Dân Chủ Cộng Hòa như: lịch sử chính trị (Ngô Đình Diệm, Hiệp định Geneva), các sự kiện quan trọng (Tết Mậu Thân 1968, 30/4/1975), văn hóa, giáo dục, và kinh tế. Bạn muốn tìm hiểu về chủ đề nào cụ thể?';
  };

  const suggestedQuestions = [
    'Ngô Đình Diệm là ai?',
    'Hiệp định Geneva 1954 là gì?',
    'Tết Mậu Thân 1968',
    'Văn hóa Sài Gòn',
    'Giáo dục thời Việt Nam Dân Chủ Cộng Hoà',
  ];

  const handleSuggestionPress = (question: string) => {
    setInputText(question);
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border, paddingTop: insets.top + 16 }]}>
          <View style={[styles.aiAvatar, { backgroundColor: colors.tint + '22' }]}>
            <Ionicons name="sparkles" size={24} color={colors.tint} />
          </View>
          <View style={styles.headerText}>
            <View style={styles.headerTitleRow}>
              <ThemedText type="title" style={styles.headerTitle}>Trợ lý AI</ThemedText>
              {isApiKeyValid ? (
                <View style={[styles.statusBadge, { backgroundColor: '#10B981' + '22' }]}>
                  <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                  <ThemedText style={[styles.statusText, { color: '#10B981' }]}>Gemini</ThemedText>
                </View>
              ) : (
                <View style={[styles.statusBadge, { backgroundColor: colors.icon + '22' }]}>
                  <View style={[styles.statusDot, { backgroundColor: colors.icon }]} />
                  <ThemedText style={[styles.statusText, { color: colors.icon }]}>Demo</ThemedText>
                </View>
              )}
            </View>
            <ThemedText style={[styles.headerSubtitle, { color: colors.icon }]}>
              {isApiKeyValid ? 'Powered by Gemini 2.5 Flash' : 'Hỏi đáp về lịch sử Việt Nam Dân Chủ Cộng Hòa'}
            </ThemedText>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[styles.messagesContent, { paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
              ]}
            >
              {!message.isUser && (
                <View style={[styles.messageAvatar, { backgroundColor: colors.tint + '22' }]}>
                  <Ionicons name="sparkles" size={16} color={colors.tint} />
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.isUser
                    ? { backgroundColor: colors.tint }
                    : { backgroundColor: colors.cardBackground, borderWidth: 1, borderColor: colors.border },
                  message.isUser ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <ThemedText
                  style={[
                    styles.messageText,
                    { color: message.isUser ? colors.background : colors.text },
                  ]}
                >
                  {message.text}
                </ThemedText>
              </View>
              {message.isUser && (
                <View style={[styles.messageAvatar, { backgroundColor: colors.tint }]}>
                  <Ionicons name="person" size={16} color={colors.background} />
                </View>
              )}
            </View>
          ))}

          {isLoading && (
            <View style={[styles.messageWrapper, styles.aiMessageWrapper]}>
              <View style={[styles.messageAvatar, { backgroundColor: colors.tint + '22' }]}>
                <Ionicons name="sparkles" size={16} color={colors.tint} />
              </View>
              <View
                style={[
                  styles.messageBubble,
                  styles.aiBubble,
                  { backgroundColor: colors.cardBackground, borderWidth: 1, borderColor: colors.border },
                ]}
              >
                <ActivityIndicator color={colors.tint} />
              </View>
            </View>
          )}

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <View style={styles.suggestionsContainer}>
              <ThemedText style={[styles.suggestionsTitle, { color: colors.icon }]}>
                Câu hỏi gợi ý:
              </ThemedText>
              <View style={styles.suggestionsGrid}>
                {suggestedQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.suggestionChip, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                    onPress={() => handleSuggestionPress(question)}
                  >
                    <ThemedText style={[styles.suggestionText, { color: colors.tint }]}>
                      {question}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground, borderTopColor: colors.border, paddingBottom: insets.bottom + 12 }]}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Hỏi về lịch sử..."
              placeholderTextColor={colors.icon}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? colors.tint : colors.border },
              ]}
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() ? colors.background : colors.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 13,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    gap: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  suggestionsContainer: {
    marginTop: 8,
    gap: 12,
  },
  suggestionsTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
