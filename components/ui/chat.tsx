import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/theme/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-audio';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
export interface ChatMessage {
  id: string;
  text?: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio' | 'file' | 'system';
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  replyTo?: string;
  attachments?: ChatAttachment[];
  reactions?: ChatReaction[];
  isEdited?: boolean;
  isForwarded?: boolean;
  location?: { latitude: number; longitude: number };
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  uri: string;
  name?: string;
  size?: number;
  duration?: number; // for audio/video
}

export interface ChatReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  isTyping?: boolean;
}

export interface ChatProps {
  messages: ChatMessage[];
  currentUserId: string;
  users: ChatUser[];
  onSendMessage: (
    message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'>
  ) => void;
  onEditMessage?: (messageId: string, newText: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onReactToMessage?: (messageId: string, emoji: string) => void;
  onTyping?: (isTyping: boolean) => void;
  onScrollToMessage?: (messageId: string) => void;
  enableVoiceMessages?: boolean;
  enableImageMessages?: boolean;
  enableFileMessages?: boolean;
  enableReactions?: boolean;
  enableReplies?: boolean;
  enableForwarding?: boolean;
  enableEditing?: boolean;
  enableSearch?: boolean;
  placeholder?: string;
  maxMessageLength?: number;
  theme?: 'auto' | 'light' | 'dark';
}

const COMMON_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '😡', '👏', '🔥'];

export const Chat: React.FC<ChatProps> = ({
  messages,
  currentUserId,
  users,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
  onTyping,
  onScrollToMessage,
  enableVoiceMessages = true,
  enableImageMessages = true,
  enableFileMessages = true,
  enableReactions = true,
  enableReplies = true,
  enableForwarding = true,
  enableEditing = true,
  enableSearch = false,
  placeholder = 'Type a message...',
  maxMessageLength = 4000,
  theme = 'auto',
}) => {
  const colorScheme = useColorScheme();
  const isDark =
    theme === 'dark' || (theme === 'auto' && colorScheme === 'dark');
  const colors = isDark ? Colors.dark : Colors.light;

  // State
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(
    null
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Refs
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const recordingTimer = useRef<number | null>(null);
  const typingTimer = useRef<number | null>(null);

  // Voice recording setup
  useEffect(() => {
    Audio.requestPermissionsAsync();
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  // Handle typing indicator
  const handleTyping = useCallback(
    (text: string) => {
      setInputText(text);

      if (onTyping) {
        onTyping(text.length > 0);

        if (typingTimer.current) {
          clearTimeout(typingTimer.current);
        }

        typingTimer.current = setTimeout(() => {
          onTyping(false);
        }, 1000);
      }
    },
    [onTyping]
  );

  // Send text message
  const sendMessage = useCallback(() => {
    if (!inputText.trim() && !replyingTo) return;

    const message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'> = {
      text: inputText.trim(),
      senderId: currentUserId,
      senderName: users.find((u) => u.id === currentUserId)?.name || 'You',
      type: 'text',
      replyTo: replyingTo?.id,
    };

    onSendMessage(message);
    setInputText('');
    setReplyingTo(null);

    if (onTyping) onTyping(false);
  }, [inputText, currentUserId, users, onSendMessage, replyingTo, onTyping]);

  // Start voice recording
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Please grant microphone permission to record voice messages.'
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
      });

      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);

      // Start timer
      recordingTimer.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  // Stop voice recording
  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }

      setRecording(null);
      setIsRecording(false);
      setRecordingDuration(0);

      if (uri) {
        const message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'> = {
          senderId: currentUserId,
          senderName: users.find((u) => u.id === currentUserId)?.name || 'You',
          type: 'audio',
          attachments: [
            {
              id: Date.now().toString(),
              type: 'audio',
              uri,
              duration: recordingDuration,
            },
          ],
        };

        onSendMessage(message);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to save recording. Please try again.');
    }
  };

  // Pick image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets) {
      const attachments: ChatAttachment[] = result.assets.map(
        (asset, index) => ({
          id: `${Date.now()}_${index}`,
          type: 'image',
          uri: asset.uri,
          name: asset.fileName || `image_${index}.jpg`,
          size: asset.fileSize,
        })
      );

      const message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'> = {
        senderId: currentUserId,
        senderName: users.find((u) => u.id === currentUserId)?.name || 'You',
        type: 'image',
        attachments,
      };

      onSendMessage(message);
    }
  };

  // Pick document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const asset = result.assets[0];
        const attachment: ChatAttachment = {
          id: Date.now().toString(),
          type: 'document',
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
        };

        const message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'> = {
          senderId: currentUserId,
          senderName: users.find((u) => u.id === currentUserId)?.name || 'You',
          type: 'file',
          attachments: [attachment],
        };

        onSendMessage(message);
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };

  // React to message
  const reactToMessage = (messageId: string, emoji: string) => {
    if (onReactToMessage) {
      onReactToMessage(messageId, emoji);
    }
    setShowEmojiPicker(null);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Message item component
  const renderMessage = ({
    item: message,
    index,
  }: {
    item: ChatMessage;
    index: number;
  }) => {
    const isCurrentUser = message.senderId === currentUserId;
    const user = users.find((u) => u.id === message.senderId);
    const replyMessage = message.replyTo
      ? messages.find((m) => m.id === message.replyTo)
      : null;

    // Swipe to reply gesture
    const translateX = useRef(new Animated.Value(0)).current;
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 50;
      },
      onPanResponderMove: (_, gestureState) => {
        if (!isCurrentUser && gestureState.dx > 0) {
          translateX.setValue(Math.min(gestureState.dx, 100));
        } else if (isCurrentUser && gestureState.dx < 0) {
          translateX.setValue(Math.max(gestureState.dx, -100));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 50 && enableReplies) {
          setReplyingTo(message);
          inputRef.current?.focus();
        }
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    });

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX }],
          marginVertical: 4,
          marginHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onLongPress={() =>
            setSelectedMessage(
              selectedMessage === message.id ? null : message.id
            )
          }
          style={{
            flexDirection: isCurrentUser ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
          }}
        >
          {/* Avatar */}
          {!isCurrentUser && (
            <View style={{ marginRight: 8 }}>
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: colors.primaryForeground,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase() || '?'}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Message Content */}
          <View
            style={{
              maxWidth: SCREEN_WIDTH * 0.7,
              backgroundColor: isCurrentUser ? colors.primary : colors.card,
              borderRadius: 16,
              borderBottomLeftRadius: !isCurrentUser ? 4 : 16,
              borderBottomRightRadius: isCurrentUser ? 4 : 16,
              padding: 12,
              marginLeft: isCurrentUser ? 8 : 0,
              marginRight: !isCurrentUser ? 8 : 0,
            }}
          >
            {/* Reply indicator */}
            {replyMessage && (
              <TouchableOpacity
                onPress={() => onScrollToMessage?.(replyMessage.id)}
                style={{
                  borderLeftWidth: 3,
                  borderLeftColor: colors.border,
                  paddingLeft: 8,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                  {replyMessage.senderName}
                </Text>
                <Text
                  style={{ color: colors.textMuted, fontSize: 14 }}
                  numberOfLines={1}
                >
                  {replyMessage.text || 'Attachment'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Message text */}
            {message.text && (
              <Text
                style={{
                  color: isCurrentUser
                    ? colors.primaryForeground
                    : colors.foreground,
                  fontSize: 16,
                  lineHeight: 20,
                }}
              >
                {message.text}
                {message.isEdited && (
                  <Text
                    style={{
                      color: colors.textMuted,
                      fontSize: 12,
                      fontStyle: 'italic',
                    }}
                  >
                    {' '}
                    (edited)
                  </Text>
                )}
              </Text>
            )}

            {/* Attachments */}
            {message.attachments?.map((attachment) => (
              <View
                key={attachment.id}
                style={{ marginTop: message.text ? 8 : 0 }}
              >
                {attachment.type === 'image' && (
                  <Image
                    source={{ uri: attachment.uri }}
                    style={{
                      width: 200,
                      height: 150,
                      borderRadius: 8,
                    }}
                    resizeMode='cover'
                  />
                )}
                {attachment.type === 'audio' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.muted,
                      borderRadius: 20,
                      padding: 8,
                      minWidth: 120,
                    }}
                  >
                    <TouchableOpacity style={{ marginRight: 8 }}>
                      <Ionicons
                        name='play'
                        size={20}
                        color={
                          isCurrentUser
                            ? colors.primaryForeground
                            : colors.foreground
                        }
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        height: 2,
                        backgroundColor: colors.border,
                        borderRadius: 1,
                      }}
                    >
                      <View
                        style={{
                          width: '30%',
                          height: '100%',
                          backgroundColor: colors.primary,
                          borderRadius: 1,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 8,
                        fontSize: 12,
                        color: isCurrentUser
                          ? colors.primaryForeground
                          : colors.foreground,
                      }}
                    >
                      {formatDuration(attachment.duration || 0)}
                    </Text>
                  </View>
                )}
                {attachment.type === 'document' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.muted,
                      borderRadius: 8,
                      padding: 8,
                      minWidth: 150,
                    }}
                  >
                    <MaterialIcons
                      name='description'
                      size={24}
                      color={
                        isCurrentUser
                          ? colors.primaryForeground
                          : colors.foreground
                      }
                    />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: isCurrentUser
                            ? colors.primaryForeground
                            : colors.foreground,
                        }}
                        numberOfLines={1}
                      >
                        {attachment.name}
                      </Text>
                      {attachment.size && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.textMuted,
                          }}
                        >
                          {(attachment.size / 1024 / 1024).toFixed(1)} MB
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            ))}

            {/* Reactions */}
            {message.reactions && message.reactions.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 4,
                }}
              >
                {Object.entries(
                  message.reactions.reduce((acc, reaction) => {
                    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([emoji, count]) => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => reactToMessage(message.id, emoji)}
                    style={{
                      backgroundColor: colors.muted,
                      borderRadius: 12,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      marginRight: 4,
                      marginTop: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>{emoji}</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.textMuted,
                        marginLeft: 2,
                      }}
                    >
                      {count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Message status and time */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                {formatTime(message.timestamp)}
              </Text>

              {isCurrentUser && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 8,
                  }}
                >
                  {message.status === 'sending' && (
                    <ActivityIndicator size='small' color={colors.textMuted} />
                  )}
                  {message.status === 'sent' && (
                    <Ionicons
                      name='checkmark'
                      size={16}
                      color={colors.textMuted}
                    />
                  )}
                  {message.status === 'delivered' && (
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons
                        name='checkmark'
                        size={16}
                        color={colors.textMuted}
                      />
                      <Ionicons
                        name='checkmark'
                        size={16}
                        color={colors.textMuted}
                        style={{ marginLeft: -4 }}
                      />
                    </View>
                  )}
                  {message.status === 'read' && (
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons
                        name='checkmark'
                        size={16}
                        color={colors.blue}
                      />
                      <Ionicons
                        name='checkmark'
                        size={16}
                        color={colors.blue}
                        style={{ marginLeft: -4 }}
                      />
                    </View>
                  )}
                  {message.status === 'failed' && (
                    <Ionicons
                      name='alert-circle'
                      size={16}
                      color={colors.destructive}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Message actions */}
        {selectedMessage === message.id && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 8,
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 8,
              alignSelf: 'center',
            }}
          >
            {enableReactions && (
              <TouchableOpacity
                onPress={() => setShowEmojiPicker(message.id)}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name='heart-outline'
                  size={20}
                  color={colors.foreground}
                />
              </TouchableOpacity>
            )}

            {enableReplies && (
              <TouchableOpacity
                onPress={() => {
                  setReplyingTo(message);
                  setSelectedMessage(null);
                  inputRef.current?.focus();
                }}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name='arrow-undo-outline'
                  size={20}
                  color={colors.foreground}
                />
              </TouchableOpacity>
            )}

            {enableForwarding && (
              <TouchableOpacity
                onPress={() => {
                  // Handle forward
                  setSelectedMessage(null);
                }}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name='arrow-redo-outline'
                  size={20}
                  color={colors.foreground}
                />
              </TouchableOpacity>
            )}

            {enableEditing && isCurrentUser && message.type === 'text' && (
              <TouchableOpacity
                onPress={() => {
                  setEditingMessage(message);
                  setInputText(message.text || '');
                  setSelectedMessage(null);
                  inputRef.current?.focus();
                }}
                style={{ padding: 8 }}
              >
                <Ionicons
                  name='create-outline'
                  size={20}
                  color={colors.foreground}
                />
              </TouchableOpacity>
            )}

            {(isCurrentUser || message.senderId === currentUserId) &&
              onDeleteMessage && (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete Message',
                      'Are you sure you want to delete this message?',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => {
                            onDeleteMessage(message.id);
                            setSelectedMessage(null);
                          },
                        },
                      ]
                    );
                  }}
                  style={{ padding: 8 }}
                >
                  <Ionicons
                    name='trash-outline'
                    size={20}
                    color={colors.destructive}
                  />
                </TouchableOpacity>
              )}
          </View>
        )}

        {/* Emoji picker */}
        {showEmojiPicker === message.id && enableReactions && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 8,
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 8,
              alignSelf: 'center',
            }}
          >
            {COMMON_EMOJIS.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() => reactToMessage(message.id, emoji)}
                style={{ padding: 8 }}
              >
                <Text style={{ fontSize: 24 }}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    );
  };

  // Typing indicator
  const renderTypingIndicator = () => {
    const typingUsers = users.filter(
      (u) => u.isTyping && u.id !== currentUserId
    );
    if (typingUsers.length === 0) return null;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
          marginBottom: 8,
        }}
      >
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ color: colors.textMuted, fontSize: 14, marginRight: 8 }}
          >
            {typingUsers.length === 1
              ? `${typingUsers[0].name} is typing`
              : `${typingUsers.length} people are typing`}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {[0, 1, 2].map((i) => (
              <Animated.View
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: colors.textMuted,
                  marginHorizontal: 1,
                  opacity: 0.5,
                }}
              >
                <Animated.View
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    backgroundColor: colors.textMuted,
                  }}
                />
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Search bar */}
      {showSearch && enableSearch && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: colors.card,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              backgroundColor: colors.background,
              borderRadius: 20,
              paddingHorizontal: 16,
              color: colors.foreground,
            }}
            placeholder='Search messages...'
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            onPress={() => {
              setShowSearch(false);
              setSearchQuery('');
            }}
            style={{ marginLeft: 8 }}
          >
            <Ionicons name='close' size={24} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 16 }}
        inverted
        onScrollToIndexFailed={() => {}}
        ListHeaderComponent={renderTypingIndicator}
      />

      {/* Reply bar */}
      {replyingTo && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.card,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <View
            style={{
              borderLeftWidth: 3,
              borderLeftColor: colors.primary,
              paddingLeft: 12,
              flex: 1,
            }}
          >
            <Text
              style={{ color: colors.primary, fontSize: 12, fontWeight: '600' }}
            >
              Replying to {replyingTo.senderName}
            </Text>
            <Text
              style={{ color: colors.textMuted, fontSize: 14 }}
              numberOfLines={1}
            >
              {replyingTo.text || 'Attachment'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setReplyingTo(null)}
            style={{ padding: 4 }}
          >
            <Ionicons name='close' size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}

      {/* Input area */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          backgroundColor: colors.background,
          paddingHorizontal: 16,
          paddingVertical: 8,
          paddingBottom: Platform.OS === 'ios' ? 34 : 8,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        {/* Attachment button */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Add Attachment', 'Choose attachment type', [
              { text: 'Cancel', style: 'cancel' },
              ...(enableImageMessages
                ? [{ text: 'Photo', onPress: pickImage }]
                : []),
              ...(enableFileMessages
                ? [{ text: 'Document', onPress: pickDocument }]
                : []),
            ]);
          }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.card,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          <Ionicons name='add' size={20} color={colors.foreground} />
        </TouchableOpacity>

        {/* Text input */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.card,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            maxHeight: 100,
            marginRight: 8,
          }}
        >
          <TextInput
            ref={inputRef}
            style={{
              color: colors.foreground,
              fontSize: 16,
              maxHeight: 80,
            }}
            placeholder={editingMessage ? 'Edit message...' : placeholder}
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={handleTyping}
            multiline
            textAlignVertical='top'
            maxLength={maxMessageLength}
          />
        </View>

        {/* Voice recording */}
        {isRecording ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.destructive,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.destructiveForeground,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: colors.destructiveForeground,
                fontSize: 14,
                fontWeight: '600',
              }}
            >
              {formatDuration(recordingDuration)}
            </Text>
            <TouchableOpacity
              onPress={stopRecording}
              style={{ marginLeft: 12 }}
            >
              <Ionicons
                name='stop'
                size={20}
                color={colors.destructiveForeground}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Voice message button */}
            {enableVoiceMessages &&
              inputText.trim() === '' &&
              !editingMessage && (
                <TouchableOpacity
                  onPressIn={startRecording}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    name='mic'
                    size={20}
                    color={colors.primaryForeground}
                  />
                </TouchableOpacity>
              )}

            {/* Send button */}
            {(inputText.trim() !== '' || editingMessage) && (
              <TouchableOpacity
                onPress={() => {
                  if (editingMessage && onEditMessage) {
                    onEditMessage(editingMessage.id, inputText);
                    setEditingMessage(null);
                    setInputText('');
                  } else {
                    sendMessage();
                  }
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name={editingMessage ? 'checkmark' : 'send'}
                  size={20}
                  color={colors.primaryForeground}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      {/* Character count */}
      {inputText.length > maxMessageLength * 0.8 && (
        <View
          style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 90 : 70,
            right: 20,
            backgroundColor: colors.card,
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              color:
                inputText.length >= maxMessageLength
                  ? colors.destructive
                  : colors.textMuted,
              fontSize: 12,
            }}
          >
            {inputText.length}/{maxMessageLength}
          </Text>
        </View>
      )}

      {/* Edit message indicator */}
      {editingMessage && (
        <View
          style={{
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 120 : 100,
            left: 20,
            right: 20,
            backgroundColor: colors.card,
            borderRadius: 8,
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Ionicons name='create-outline' size={16} color={colors.primary} />
          <Text
            style={{
              color: colors.primary,
              fontSize: 12,
              fontWeight: '600',
              marginLeft: 4,
              flex: 1,
            }}
          >
            Editing message
          </Text>
          <TouchableOpacity
            onPress={() => {
              setEditingMessage(null);
              setInputText('');
            }}
          >
            <Ionicons name='close' size={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

// Export additional components that might be useful

// Message status component
export const MessageStatus: React.FC<{
  status: ChatMessage['status'];
  colorScheme?: 'light' | 'dark';
}> = ({ status, colorScheme = 'light' }) => {
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  switch (status) {
    case 'sending':
      return <ActivityIndicator size='small' color={colors.textMuted} />;
    case 'sent':
      return <Ionicons name='checkmark' size={16} color={colors.textMuted} />;
    case 'delivered':
      return (
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name='checkmark' size={16} color={colors.textMuted} />
          <Ionicons
            name='checkmark'
            size={16}
            color={colors.textMuted}
            style={{ marginLeft: -4 }}
          />
        </View>
      );
    case 'read':
      return (
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name='checkmark' size={16} color={colors.blue} />
          <Ionicons
            name='checkmark'
            size={16}
            color={colors.blue}
            style={{ marginLeft: -4 }}
          />
        </View>
      );
    case 'failed':
      return (
        <Ionicons name='alert-circle' size={16} color={colors.destructive} />
      );
    default:
      return null;
  }
};

// Online status indicator
export const OnlineStatus: React.FC<{
  isOnline: boolean;
  size?: number;
}> = ({ isOnline, size = 8 }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: isOnline ? '#34C759' : '#8E8E93',
        borderWidth: 2,
        borderColor: '#FFFFFF',
      }}
    />
  );
};

// Chat header component
export const ChatHeader: React.FC<{
  user: ChatUser;
  onBack?: () => void;
  onUserPress?: () => void;
  onSearch?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  enableSearch?: boolean;
  enableCalls?: boolean;
  colorScheme?: 'light' | 'dark';
}> = ({
  user,
  onBack,
  onUserPress,
  onSearch,
  onCall,
  onVideoCall,
  enableSearch = false,
  enableCalls = false,
  colorScheme = 'light',
}) => {
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: Platform.OS === 'ios' ? 44 : 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      {/* Back button */}
      {onBack && (
        <TouchableOpacity onPress={onBack} style={{ marginRight: 16 }}>
          <Ionicons name='arrow-back' size={24} color={colors.foreground} />
        </TouchableOpacity>
      )}

      {/* User info */}
      <TouchableOpacity
        onPress={onUserPress}
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
      >
        <View style={{ position: 'relative' }}>
          {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.primaryForeground,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          {/* Online status */}
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <OnlineStatus isOnline={user.isOnline || false} />
          </View>
        </View>

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text
            style={{
              color: colors.foreground,
              fontSize: 18,
              fontWeight: '600',
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 14,
            }}
          >
            {user.isOnline
              ? 'Online'
              : user.lastSeen
              ? `Last seen ${user.lastSeen.toLocaleTimeString()}`
              : 'Offline'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Action buttons */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {enableSearch && onSearch && (
          <TouchableOpacity onPress={onSearch} style={{ marginLeft: 12 }}>
            <Ionicons name='search' size={24} color={colors.foreground} />
          </TouchableOpacity>
        )}

        {enableCalls && onCall && (
          <TouchableOpacity onPress={onCall} style={{ marginLeft: 12 }}>
            <Ionicons name='call' size={24} color={colors.foreground} />
          </TouchableOpacity>
        )}

        {enableCalls && onVideoCall && (
          <TouchableOpacity onPress={onVideoCall} style={{ marginLeft: 12 }}>
            <Ionicons name='videocam' size={24} color={colors.foreground} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Usage example component
export const ChatExample: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! How are you doing today?',
      senderId: 'user2',
      senderName: 'Alice',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      status: 'read',
    },
    {
      id: '2',
      text: "I'm doing great, thanks for asking! How about you?",
      senderId: 'user1',
      senderName: 'You',
      timestamp: new Date(Date.now() - 240000),
      type: 'text',
      status: 'read',
    },
    {
      id: '3',
      text: 'Pretty good! Just working on some React Native components.',
      senderId: 'user2',
      senderName: 'Alice',
      timestamp: new Date(Date.now() - 180000),
      type: 'text',
      status: 'read',
      reactions: [
        { emoji: '👍', userId: 'user1', userName: 'You' },
        { emoji: '🔥', userId: 'user3', userName: 'Bob' },
      ],
    },
  ]);

  const users: ChatUser[] = [
    {
      id: 'user1',
      name: 'You',
      avatar: 'https://via.placeholder.com/40',
      isOnline: true,
    },
    {
      id: 'user2',
      name: 'Alice',
      avatar: 'https://via.placeholder.com/40',
      isOnline: true,
      isTyping: false,
    },
    {
      id: 'user3',
      name: 'Bob',
      avatar: 'https://via.placeholder.com/40',
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000),
    },
  ];

  const handleSendMessage = (
    message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'>
  ) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, text: newText, isEdited: true } : msg
      )
    );
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const handleReactToMessage = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReactions = msg.reactions || [];
          const userReaction = existingReactions.find(
            (r) => r.userId === 'user1'
          );

          if (userReaction) {
            // Remove if same emoji, change if different
            if (userReaction.emoji === emoji) {
              return {
                ...msg,
                reactions: existingReactions.filter(
                  (r) => r.userId !== 'user1'
                ),
              };
            } else {
              return {
                ...msg,
                reactions: existingReactions.map((r) =>
                  r.userId === 'user1' ? { ...r, emoji } : r
                ),
              };
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [
                ...existingReactions,
                { emoji, userId: 'user1', userName: 'You' },
              ],
            };
          }
        }
        return msg;
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        user={users[1]}
        onBack={() => console.log('Back pressed')}
        onUserPress={() => console.log('User pressed')}
        onSearch={() => console.log('Search pressed')}
        onCall={() => console.log('Call pressed')}
        onVideoCall={() => console.log('Video call pressed')}
        enableSearch
        enableCalls
      />
      <Chat
        messages={messages}
        currentUserId='user1'
        users={users}
        onSendMessage={handleSendMessage}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
        onReactToMessage={handleReactToMessage}
        onTyping={(isTyping) => console.log('Typing:', isTyping)}
        enableVoiceMessages
        enableImageMessages
        enableFileMessages
        enableReactions
        enableReplies
        enableForwarding
        enableEditing
        enableSearch
      />
    </View>
  );
};
