import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, Image as ImageIcon, Smile, Paperclip, MoveVertical as MoreVertical } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock conversations data
const CONVERSATIONS = {
  'conv1': {
    id: 'conv1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      online: true,
    },
    messages: [
      {
        id: 'm1',
        text: 'Hi there! I saw your oak dining table project and I absolutely love it.',
        sender: 'user1',
        time: '10:30 AM',
        date: 'Today',
      },
      {
        id: 'm2',
        text: 'Thank you! I appreciate the kind words.',
        sender: 'me',
        time: '10:35 AM',
        date: 'Today',
      },
      {
        id: 'm3',
        text: 'I was wondering if you do custom commissions? I\'ve been looking for a similar table but with slightly different dimensions.',
        sender: 'user1',
        time: '10:38 AM',
        date: 'Today',
      },
      {
        id: 'm4',
        text: 'Yes, I do take custom commissions. What dimensions are you looking for?',
        sender: 'me',
        time: '10:40 AM',
        date: 'Today',
      },
      {
        id: 'm5',
        text: 'Great! I need something around 68" x 36" to fit my dining space. Would that be possible?',
        sender: 'user1',
        time: '10:42 AM',
        date: 'Today',
      },
    ],
  },
  'user1': {
    id: 'user1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      online: true,
    },
    messages: [
      {
        id: 'm1',
        text: 'Hi there! I saw your oak dining table project and I absolutely love it.',
        sender: 'user1',
        time: '10:30 AM',
        date: 'Today',
      },
      {
        id: 'm2',
        text: 'Thank you! I appreciate the kind words.',
        sender: 'me',
        time: '10:35 AM',
        date: 'Today',
      },
      {
        id: 'm3',
        text: 'I was wondering if you do custom commissions? I\'ve been looking for a similar table but with slightly different dimensions.',
        sender: 'user1',
        time: '10:38 AM',
        date: 'Today',
      },
      {
        id: 'm4',
        text: 'Yes, I do take custom commissions. What dimensions are you looking for?',
        sender: 'me',
        time: '10:40 AM',
        date: 'Today',
      },
      {
        id: 'm5',
        text: 'Great! I need something around 68" x 36" to fit my dining space. Would that be possible?',
        sender: 'user1',
        time: '10:42 AM',
        date: 'Today',
      },
    ],
  },
  'creator1': {
    id: 'creator1',
    user: {
      id: 'creator1',
      name: 'Jessica Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      online: true,
    },
    messages: [
      {
        id: 'm1',
        text: 'Hello! I just wanted to say that your jewelry designs are amazing.',
        sender: 'me',
        time: '2:15 PM',
        date: 'Yesterday',
      },
      {
        id: 'm2',
        text: 'Thank you so much! That means a lot to me.',
        sender: 'creator1',
        time: '2:30 PM',
        date: 'Yesterday',
      },
      {
        id: 'm3',
        text: 'I\'m particularly interested in your turquoise collection. Do you ship internationally?',
        sender: 'me',
        time: '2:32 PM',
        date: 'Yesterday',
      },
      {
        id: 'm4',
        text: 'Yes, I do ship internationally! The turquoise collection is one of my favorites too. Shipping usually takes 7-10 business days depending on the destination.',
        sender: 'creator1',
        time: '2:45 PM',
        date: 'Yesterday',
      },
      {
        id: 'm5',
        text: 'That\'s perfect. I\'ll check out your shop and place an order soon.',
        sender: 'me',
        time: '3:00 PM',
        date: 'Yesterday',
      },
      {
        id: 'm6',
        text: 'Sounds great! Let me know if you have any questions about specific pieces.',
        sender: 'creator1',
        time: '3:05 PM',
        date: 'Yesterday',
      },
    ],
  },
};

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const conversation = CONVERSATIONS[conversationId as keyof typeof CONVERSATIONS];
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(conversation?.messages || []);
  
  const flatListRef = useRef<FlatList>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  
  if (!conversation) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Conversation not found</Text>
          <TouchableOpacity 
            style={styles.goBackButton}
            onPress={() => router.replace('/(tabs)/messages')}
          >
            <Text style={styles.goBackButtonText}>Go to Messages</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: `m${messages.length + 1}`,
        text: message.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today',
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate a reply after 1-2 seconds
      setTimeout(() => {
        const replies = [
          "That sounds great! I'll get back to you with more details soon.",
          "Thanks for letting me know. I appreciate your interest in my work.",
          "Perfect! I'll make a note of that and we can discuss further.",
          "I understand. Let me think about how we can make this work for you.",
          "Absolutely! That's definitely something I can help with.",
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMessage = {
          id: `m${messages.length + 2}`,
          text: randomReply,
          sender: conversation.user.id,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'Today',
        };
        
        setMessages(prev => [...prev, replyMessage]);
      }, 1000 + Math.random() * 1000);
    }
  };
  
  const renderMessage = ({ item, index }: { item: typeof messages[0], index: number }) => {
    const isMe = item.sender === 'me';
    const showDate = index === 0 || messages[index - 1].date !== item.date;
    
    return (
      <Animated.View entering={FadeInUp.delay(index * 50).duration(300)}>
        {showDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        
        <View style={[styles.messageContainer, isMe ? styles.myMessageContainer : styles.theirMessageContainer]}>
          {!isMe && (
            <Image source={{ uri: conversation.user.avatar }} style={styles.messageAvatar} />
          )}
          
          <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.theirMessageBubble]}>
            <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.theirMessageText]}>
              {item.text}
            </Text>
            <Text style={[styles.messageTime, isMe ? styles.myMessageTime : styles.theirMessageTime]}>
              {item.time}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={() => router.push(`/profile/${conversation.user.id}`)}
        >
          <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{conversation.user.name}</Text>
            <Text style={styles.userStatus}>
              {conversation.user.online ? 'Online' : 'Offline'}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Paperclip size={22} color="#666" />
        </TouchableOpacity>
        
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Smile size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton}>
            <ImageIcon size={22} color="#666" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.disabledSendButton]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Send size={22} color={message.trim() ? "#fff" : "#a0aec0"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userStatus: {
    fontSize: 12,
    color: '#4caf50',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#8898aa',
    backgroundColor: 'rgba(248, 249, 250, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '100%',
  },
  myMessageBubble: {
    backgroundColor: '#5e72e4',
  },
  theirMessageBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  theirMessageTime: {
    color: '#8898aa',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  emojiButton: {
    marginHorizontal: 5,
  },
  imageButton: {
    marginLeft: 5,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5e72e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#e2e8f0',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#5e72e4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});