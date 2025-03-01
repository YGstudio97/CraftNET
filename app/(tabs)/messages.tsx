import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Search, Plus, Circle } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

// Mock data for conversations
const CONVERSATIONS = [
  {
    id: 'conv1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      online: true,
    },
    lastMessage: {
      text: 'I love the design! When can we discuss the details?',
      time: '10:42 AM',
      unread: true,
    },
  },
  {
    id: 'conv2',
    user: {
      id: 'user2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      online: false,
    },
    lastMessage: {
      text: 'Thanks for the feedback on my latest project.',
      time: 'Yesterday',
      unread: false,
    },
  },
  {
    id: 'conv3',
    user: {
      id: 'user3',
      name: 'Sophia Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      online: true,
    },
    lastMessage: {
      text: 'Would you be interested in collaborating on a new pottery collection?',
      time: 'Yesterday',
      unread: true,
    },
  },
  {
    id: 'conv4',
    user: {
      id: 'user4',
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
      online: false,
    },
    lastMessage: {
      text: 'I sent you the invoice for the commissioned piece.',
      time: 'Monday',
      unread: false,
    },
  },
  {
    id: 'conv5',
    user: {
      id: 'user5',
      name: 'Olivia Taylor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
      online: true,
    },
    lastMessage: {
      text: 'The art exhibition is next Friday. Hope you can make it!',
      time: 'Monday',
      unread: false,
    },
  },
  {
    id: 'conv6',
    user: {
      id: 'user6',
      name: 'Daniel Lee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      online: false,
    },
    lastMessage: {
      text: 'Let me know what you think about the wood samples I sent.',
      time: 'Last week',
      unread: false,
    },
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const renderConversationItem = ({ item, index }: { item: typeof CONVERSATIONS[0], index: number }) => (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(400)}>
      <Link href={`/conversation/${item.id}`} asChild>
        <TouchableOpacity style={styles.conversationItem}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            {item.user.online && <View style={styles.onlineIndicator} />}
          </View>
          
          <View style={styles.conversationInfo}>
            <View style={styles.conversationHeader}>
              <Text style={styles.userName}>{item.user.name}</Text>
              <Text style={styles.messageTime}>{item.lastMessage.time}</Text>
            </View>
            
            <View style={styles.messagePreviewContainer}>
              <Text 
                style={[
                  styles.messagePreview, 
                  item.lastMessage.unread && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {item.lastMessage.text}
              </Text>
              
              {item.lastMessage.unread && (
                <View style={styles.unreadIndicator}>
                  <Circle size={8} fill="#5e72e4" color="#5e72e4" />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Plus size={24} color="#5e72e4" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={CONVERSATIONS}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  conversationsList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#8898aa',
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagePreview: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#333',
  },
  unreadIndicator: {
    marginLeft: 5,
  },
});