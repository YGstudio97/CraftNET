import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Settings, Grid2x2 as Grid, Bookmark, Award, CreditCard as Edit, MapPin, Calendar, Link as LinkIcon } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 50) / COLUMN_COUNT;

// Mock user data
const USER = {
  id: 'user123',
  name: 'Alex Morgan',
  username: '@alexmorgan',
  bio: 'Furniture designer and woodworker. Creating functional art from sustainable materials. Workshop tours available by appointment.',
  avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop',
  coverPhoto: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=800&auto=format&fit=crop',
  location: 'Portland, OR',
  memberSince: 'January 2023',
  website: 'alexmorgandesigns.com',
  followers: 1243,
  following: 385,
  projects: 47,
  skills: ['Woodworking', 'Furniture Design', 'Carpentry', 'Sustainable Materials'],
  featured: true,
};

// Mock projects data
const PROJECTS = [
  {
    id: '1',
    title: 'Walnut Coffee Table',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=400&auto=format&fit=crop',
    likes: 234,
    featured: true,
  },
  {
    id: '2',
    title: 'Oak Bookshelf',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=400&auto=format&fit=crop',
    likes: 187,
    featured: false,
  },
  {
    id: '3',
    title: 'Maple Dining Chairs',
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=400&auto=format&fit=crop',
    likes: 156,
    featured: true,
  },
  {
    id: '4',
    title: 'Cherry Wood Side Table',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400&auto=format&fit=crop',
    likes: 129,
    featured: false,
  },
  {
    id: '5',
    title: 'Reclaimed Wood Bench',
    image: 'https://images.unsplash.com/photo-1611464908623-07f19927264e?q=80&w=400&auto=format&fit=crop',
    likes: 98,
    featured: false,
  },
  {
    id: '6',
    title: 'Minimalist Desk',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=400&auto=format&fit=crop',
    likes: 76,
    featured: false,
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('projects');
  
  const renderProjectItem = ({ item }: { item: typeof PROJECTS[0] }) => (
    <Link href={`/project/${item.id}`} asChild>
      <TouchableOpacity style={styles.projectItem}>
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
    </Link>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coverPhotoContainer}>
          <Image source={{ uri: USER.coverPhoto }} style={styles.coverPhoto} />
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.profileInfoContainer}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER.avatar }} style={styles.avatar} />
            {USER.featured && (
              <View style={styles.verifiedBadge}>
                <Award size={14} color="#fff" />
              </View>
            )}
          </View>
          
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{USER.name}</Text>
            <Text style={styles.username}>{USER.username}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{USER.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{USER.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{USER.projects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
          </View>
          
          <Text style={styles.bio}>{USER.bio}</Text>
          
          <View style={styles.infoItems}>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>{USER.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>Member since {USER.memberSince}</Text>
            </View>
            <View style={styles.infoItem}>
              <LinkIcon size={16} color="#666" style={styles.infoIcon} />
              <Text style={styles.infoText}>{USER.website}</Text>
            </View>
          </View>
          
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {USER.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Edit size={18} color="#5e72e4" />
              <Text style={styles.secondaryButtonText}>Edit Profile</Text>
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
          data={PROJECTS}
          renderItem={renderProjectItem}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.projectsGrid}
        />
        
        {/* Add some bottom padding to account for the tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  coverPhotoContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  headerActions: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
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
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
});