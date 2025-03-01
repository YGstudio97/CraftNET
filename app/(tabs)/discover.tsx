import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

// Mock data for categories
const CATEGORIES = [
  { id: 'woodworking', name: 'Woodworking', image: 'https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?q=80&w=200&auto=format&fit=crop' },
  { id: 'painting', name: 'Painting', image: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62b1?q=80&w=200&auto=format&fit=crop' },
  { id: 'pottery', name: 'Pottery', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=200&auto=format&fit=crop' },
  { id: 'jewelry', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop' },
  { id: 'textiles', name: 'Textiles', image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=200&auto=format&fit=crop' },
  { id: 'photography', name: 'Photography', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
  { id: 'sculpture', name: 'Sculpture', image: 'https://images.unsplash.com/photo-1544413164-5f1b295eb435?q=80&w=200&auto=format&fit=crop' },
  { id: 'digital', name: 'Digital Art', image: 'https://images.unsplash.com/photo-1633186223008-a0c7e3d14fd5?q=80&w=200&auto=format&fit=crop' },
];

// Mock data for trending projects
const TRENDING_PROJECTS = [
  {
    id: '101',
    title: 'Modern Minimalist Chair',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=400&auto=format&fit=crop',
    user: {
      name: 'Daniel Lee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    },
    category: 'woodworking',
    likes: 1243,
  },
  {
    id: '102',
    title: 'Abstract Fluid Art Series',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=400&auto=format&fit=crop',
    user: {
      name: 'Amelia Parker',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    },
    category: 'painting',
    likes: 982,
  },
  {
    id: '103',
    title: 'Handcrafted Ceramic Set',
    image: 'https://images.unsplash.com/photo-1603120296664-c04b8c1231c4?q=80&w=400&auto=format&fit=crop',
    user: {
      name: 'Noah Wilson',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
    },
    category: 'pottery',
    likes: 756,
  },
];

// Mock data for popular creators
const POPULAR_CREATORS = [
  {
    id: 'creator1',
    name: 'Jessica Miller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
    specialty: 'Jewelry Designer',
    followers: '45.2K',
  },
  {
    id: 'creator2',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop',
    specialty: 'Woodworker',
    followers: '32.8K',
  },
  {
    id: 'creator3',
    name: 'Olivia Taylor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
    specialty: 'Digital Artist',
    followers: '28.5K',
  },
  {
    id: 'creator4',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    specialty: 'Photographer',
    followers: '19.7K',
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const renderCategoryItem = ({ item, index }: { item: typeof CATEGORIES[0], index: number }) => (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(400)}>
      <Link href={`/category/${item.id}`} asChild>
        <TouchableOpacity style={styles.categoryItem}>
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
  
  const renderTrendingItem = ({ item }: { item: typeof TRENDING_PROJECTS[0] }) => (
    <Link href={`/project/${item.id}`} asChild>
      <TouchableOpacity style={styles.trendingItem}>
        <Image source={{ uri: item.image }} style={styles.trendingImage} />
        <View style={styles.trendingOverlay}>
          <Text style={styles.trendingTitle}>{item.title}</Text>
          <View style={styles.trendingUser}>
            <Image source={{ uri: item.user.avatar }} style={styles.trendingAvatar} />
            <Text style={styles.trendingUserName}>{item.user.name}</Text>
          </View>
          <Text style={styles.trendingLikes}>{item.likes} likes</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
  
  const renderCreatorItem = ({ item }: { item: typeof POPULAR_CREATORS[0] }) => (
    <Link href={`/profile/${item.id}`} asChild>
      <TouchableOpacity style={styles.creatorItem}>
        <Image source={{ uri: item.avatar }} style={styles.creatorAvatar} />
        <Text style={styles.creatorName}>{item.name}</Text>
        <Text style={styles.creatorSpecialty}>{item.specialty}</Text>
        <Text style={styles.creatorFollowers}>{item.followers} followers</Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search creators, projects, or categories"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Projects</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContainer}
          >
            {TRENDING_PROJECTS.map(project => (
              <Link key={project.id} href={`/project/${project.id}`} asChild>
                <TouchableOpacity style={styles.trendingItem}>
                  <Image source={{ uri: project.image }} style={styles.trendingImage} />
                  <View style={styles.trendingOverlay}>
                    <Text style={styles.trendingTitle}>{project.title}</Text>
                    <View style={styles.trendingUser}>
                      <Image source={{ uri: project.user.avatar }} style={styles.trendingAvatar} />
                      <Text style={styles.trendingUserName}>{project.user.name}</Text>
                    </View>
                    <Text style={styles.trendingLikes}>{project.likes} likes</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Creators</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creatorsContainer}
          >
            {POPULAR_CREATORS.map(creator => (
              <Link key={creator.id} href={`/profile/${creator.id}`} asChild>
                <TouchableOpacity style={styles.creatorItem}>
                  <Image source={{ uri: creator.avatar }} style={styles.creatorAvatar} />
                  <Text style={styles.creatorName}>{creator.name}</Text>
                  <Text style={styles.creatorSpecialty}>{creator.specialty}</Text>
                  <Text style={styles.creatorFollowers}>{creator.followers} followers</Text>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventItem}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>15</Text>
              <Text style={styles.eventMonth}>JUN</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Virtual Craft Workshop</Text>
              <Text style={styles.eventDescription}>Learn advanced pottery techniques with master ceramicist Maya Johnson.</Text>
              <Text style={styles.eventTime}>2:00 PM - 4:00 PM EST</Text>
            </View>
          </View>
          
          <View style={styles.eventItem}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>22</Text>
              <Text style={styles.eventMonth}>JUN</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Woodworking Masterclass</Text>
              <Text style={styles.eventDescription}>Join expert woodworker Thomas Reed for a live demonstration of joinery techniques.</Text>
              <Text style={styles.eventTime}>1:00 PM - 3:30 PM EST</Text>
            </View>
          </View>
        </View>
        
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
  header: {
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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    width: 100,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  trendingContainer: {
    paddingHorizontal: 15,
  },
  trendingItem: {
    width: 250,
    height: 180,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trendingUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  trendingAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  trendingUserName: {
    color: '#fff',
    fontSize: 12,
  },
  trendingLikes: {
    color: '#fff',
    fontSize: 12,
  },
  creatorsContainer: {
    paddingHorizontal: 15,
  },
  creatorItem: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  creatorAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  creatorSpecialty: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  creatorFollowers: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  followButton: {
    backgroundColor: '#5e72e4',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  eventDate: {
    width: 50,
    height: 60,
    backgroundColor: '#5e72e4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventDay: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventMonth: {
    color: '#fff',
    fontSize: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 12,
    color: '#999',
  },
});