import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Grid2x2 as Grid, Bookmark, Award, MapPin, Calendar, Link as LinkIcon, MessageCircle } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 50) / COLUMN_COUNT;

// Mock users data
const USERS = {
  'user1': {
    id: 'user1',
    name: 'Emma Johnson',
    username: '@emmajohnson',
    bio: 'Woodworker specializing in custom furniture. Passionate about sustainable materials and traditional techniques with modern design.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=800&auto=format&fit=crop',
    location: 'Seattle, WA',
    memberSince: 'March 2022',
    website: 'emmajohnsondesigns.com',
    followers: 2547,
    following: 412,
    projects: 38,
    skills: ['Furniture Design', 'Woodworking', 'Sustainable Materials', 'Custom Joinery'],
    featured: true,
  },
  'user2': {
    id: 'user2',
    name: 'Marcus Chen',
    username: '@marcuschen',
    bio: 'Contemporary painter exploring the intersection of abstract expressionism and digital media. My work has been featured in galleries across North America.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    location: 'New York, NY',
    memberSince: 'January 2023',
    website: 'marcuschenart.com',
    followers: 1843,
    following: 267,
    projects: 25,
    skills: ['Abstract Painting', 'Digital Art', 'Mixed Media', 'Installation Art'],
    featured: false,
  },
  'creator1': {
    id: 'creator1',
    name: 'Jessica Miller',
    username: '@jessicamiller',
    bio: 'Jewelry designer specializing in handcrafted pieces using ethically sourced materials. Each piece tells a unique story and is made with love and attention to detail.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    location: 'Austin, TX',
    memberSince: 'April 2021',
    website: 'jessicamillerjewelry.com',
    followers: 45200,
    following: 512,
    projects: 67,
    skills: ['Jewelry Design', 'Metalworking', 'Gemstone Setting', 'Sustainable Practices'],
    featured: true,
  },
};

// Mock projects data for each user
const USER_PROJECTS = {
  'user1': [
    {
      id: '1',
      title: 'Handcrafted Oak Dining Table',
      image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2?q=80&w=400&auto=format&fit=crop',
      likes: 342,
      featured: true,
    },
    {
      id: '2',
      title: 'Walnut Coffee Table',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=400&auto=format&fit=crop',
      likes: 256,
      featured: false,
    },
    {
      id: '3',
      title: 'Maple Bookshelf',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=400&auto=format&fit=crop',
      likes: 189,
      featured: true,
    },
    {
      id: '4',
      title: 'Cherry Wood Side Table',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400&auto=format&fit=crop',
      likes: 143,
      featured: false,
    },
  ],
  'user2': [
    {
      id: '5',
      title: 'Abstract Acrylic Landscape',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop',
      likes: 517,
      featured: true,
    },
    {
      id: '6',
      title: 'Urban Decay Series #3',
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=400&auto=format&fit=crop',
      likes: 432,
      featured: false,
    },
    {
      id: '7',
      title: 'Digital Distortion',
      image: 'https://images.unsplash.com/photo-1573096108468-702f6014ef28?q=80&w=400&auto=format&fit=crop',
      likes: 378,
      featured: true,
    },
  ],
  'creator1': [
    {
      id: '8',
      title: 'Silver Moonstone Ring',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop',
      likes: 1243,
      featured: true,
    },
    {
      id: '9',
      title: 'Gold Geometric Earrings',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop',
      likes: 987,
      featured: true,
    },
    {
      id: '10',
      title: 'Copper Statement Necklace',
      image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=400&auto=format&fit=crop',
      likes: 856,
      featured: false,
    },
    {
      id: '11',
      title: 'Turquoise Cuff Bracelet',
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=400&auto=format&fit=crop',
      likes: 723,
      featured: false,
    },
    {
      id: '12',
      title: 'Mixed Metal Pendant',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop',
      likes: 645,
      featured: true,
    },
  ],
};

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const user = USERS[userId as keyof typeof USERS];
  const projects = USER_PROJECTS[userId as keyof typeof USER_PROJECTS] || [];
  
  const [activeTab, setActiveTab] = useState('projects');
  const [isFollowing, setIsFollowing] = useState(false);
  
  if (!user) {
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
          <Text style={styles.notFoundText}>User not found</Text>
          <TouchableOpacity 
            style={styles.goBackButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.goBackButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  const renderProjectItem = ({ item }: { item: typeof projects[0] }) => (
    <TouchableOpacity 
      style={styles.projectItem}
      onPress={() => router.push(`/project/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.projectImage} />
      {item.featured && (
        <View style={styles.featuredBadge}>
          <Award size={12} color="#fff" />
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      <View style={styles.projectInfo}>
        <Text style={styles.projectTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.projectLikes}>{item.likes} likes</Text>
      </View>
    </TouchableOpacity>
  );

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
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coverPhotoContainer}>
          <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
        </View>
        
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.profileInfoContainer}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            {user.featured && (
              <View style={styles.verifiedBadge}>
                <Award size={14} color="#fff" />
              </View>
            )}
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {user.followers > 1000 
                  ? `${(user.followers / 1000).toFixed(1)}K` 
                  : user.followers}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.projects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
          </View>
          
          <Text style={styles.bio}>{user.bio}</Text>
          
          <View style={styles.infoItems}>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>{user.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>Member since {user.memberSince}</Text>
            </View>
            <View style={styles.infoItem}>
              <LinkIcon size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>{user.website}</Text>
            </View>
          </View>
          
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {user.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.primaryButton,
                isFollowing && styles.followingButton
              ]}
              onPress={handleFollow}
            >
              <Text 
                style={[
                  styles.primaryButtonText,
                  isFollowing && styles.followingButtonText
                ]}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push(`/conversation/${user.id}`)}
            >
              <MessageCircle size={18} color="#5e72e4" />
              <Text style={styles.secondaryButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'projects' && styles.activeTab]}
              onPress={() => setActiveTab('projects')}
            >
              <Grid size={20} color={activeTab === 'projects' ? '#5e72e4' : '#8898aa'} />
              <Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
              onPress={() => setActiveTab('saved')}
            >
              <Bookmark size={20} color={activeTab === 'saved' ? '#5e72e4' : '#8898aa'} />
              <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Saved</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.projectsGrid}
          ListEmptyComponent={
            <View style={styles.emptyProjectsContainer}>
              <Text style={styles.emptyProjectsText}>No projects to display</Text>
            </View>
          }
        />
        
        {/* Add some bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPhotoContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  profileInfoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  avatarContainer: {
    position: 'absolute',
    top: -50,
    left: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#5e72e4',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  nameContainer: {
    marginLeft: 110,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#8898aa',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#8898aa',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 20,
  },
  infoItems: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#5e72e4',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#5e72e4',
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  followingButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#5e72e4',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: '#5e72e4',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5e72e4',
    flexDirection: 'row',
  },
  secondaryButtonText: {
    color: '#5e72e4',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#5e72e4',
  },
  tabText: {
    fontSize: 14,
    color: '#8898aa',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#5e72e4',
    fontWeight: 'bold',
  },
  projectsGrid: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  projectItem: {
    width: ITEM_WIDTH,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  projectImage: {
    width: '100%',
    height: ITEM_WIDTH,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#5e72e4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  projectInfo: {
    padding: 10,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  projectLikes: {
    fontSize: 12,
    color: '#8898aa',
  },
  emptyProjectsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyProjectsText: {
    fontSize: 16,
    color: '#8898aa',
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