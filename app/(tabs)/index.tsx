import { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { Heart, MessageCircle, Share2, Bookmark, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Mock data for the feed
const FEED_DATA = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      verified: true,
    },
    category: 'woodworking',
    title: 'Handcrafted Oak Dining Table',
    description: 'Completed this custom dining table made from solid oak. Finished with natural oil to preserve the beautiful grain pattern.',
    image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2?q=80&w=800&auto=format&fit=crop',
    likes: 342,
    comments: 28,
    bookmarked: false,
    timeAgo: '2h',
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      verified: false,
    },
    category: 'painting',
    title: 'Abstract Acrylic Landscape',
    description: 'My latest acrylic painting inspired by the mountains near my hometown. Used a palette knife for texture.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    likes: 517,
    comments: 42,
    bookmarked: true,
    timeAgo: '5h',
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sophia Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      verified: true,
    },
    category: 'pottery',
    title: 'Ceramic Vase Collection',
    description: 'Just finished firing these ceramic vases. Each one is hand-thrown and glazed with my custom blue formula.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop',
    likes: 289,
    comments: 19,
    bookmarked: false,
    timeAgo: '1d',
  },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [feedData, setFeedData] = useState(FEED_DATA);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  
  const flatListRef = useRef<FlatList>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newState = { ...prev };
      newState[postId] = !newState[postId];
      return newState;
    });
    
    setFeedData(prev => 
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: likedPosts[postId] ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newState = { ...prev };
      newState[postId] = !newState[postId];
      return newState;
    });
  };

  const renderItem = ({ item, index }: { item: typeof FEED_DATA[0], index: number }) => {
    const isLiked = likedPosts[item.id] || false;
    const isBookmarked = bookmarkedPosts[item.id] || item.bookmarked;
    
    return (
      <Animated.View 
        entering={FadeInUp.delay(index * 100).duration(400)}
        style={styles.postContainer}
      >
        <View style={styles.postHeader}>
          <Link href={`/profile/${item.user.id}`} asChild>
            <TouchableOpacity style={styles.userInfo}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Link href={`/category/${item.category}`} asChild>
                  <TouchableOpacity>
                    <Text style={styles.category}>{item.category}</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity>
            <MoreHorizontal size={24} color="#666" />
          </TouchableOpacity>
        </View>
        
        <Link href={`/project/${item.id}`} asChild>
          <TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.postImage} />
          </TouchableOpacity>
        </Link>
        
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDescription}>{item.description}</Text>
        </View>
        
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleLike(item.id)}
            >
              <Heart 
                size={22} 
                color={isLiked ? "#e74c3c" : "#666"} 
                fill={isLiked ? "#e74c3c" : "none"} 
              />
              <Text style={styles.actionText}>
                {item.likes + (likedPosts[item.id] ? 1 : 0)}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={22} color="#666" />
              <Text style={styles.actionText}>{item.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={22} color="#666" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={() => handleBookmark(item.id)}>
            <Bookmark 
              size={22} 
              color="#666" 
              fill={isBookmarked ? "#666" : "none"} 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CraftNET</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={feedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  feedContainer: {
    paddingBottom: 80,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  category: {
    fontSize: 14,
    color: '#5e72e4',
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    height: width * 0.8,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});