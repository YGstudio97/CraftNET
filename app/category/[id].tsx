import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Filter, Award } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 50) / COLUMN_COUNT;

// Mock categories data
const CATEGORIES = {
  'woodworking': {
    id: 'woodworking',
    name: 'Woodworking',
    image: 'https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?q=80&w=800&auto=format&fit=crop',
    description: 'Discover beautiful handcrafted wooden furniture, sculptures, and home decor created by talented artisans.',
    projectCount: 245,
    creatorCount: 87,
  },
  'painting': {
    id: 'painting',
    name: 'Painting',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    description: 'Explore a diverse collection of paintings across various styles, from abstract to realism, created by emerging and established artists.',
    projectCount: 312,
    creatorCount: 104,
  },
  'pottery': {
    id: 'pottery',
    name: 'Pottery',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop',
    description: 'Discover handcrafted ceramic pieces including functional pottery, decorative sculptures, and unique art objects.',
    projectCount: 187,
    creatorCount: 62,
  },
  'jewelry': {
    id: 'jewelry',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Browse handcrafted jewelry pieces made from precious metals, gemstones, and alternative materials by independent designers.',
    projectCount: 276,
    creatorCount: 93,
  },
  'textiles': {
    id: 'textiles',
    name: 'Textiles',
    image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=800&auto=format&fit=crop',
    description: 'Explore handwoven fabrics, embroidery, quilting, and other textile arts created by skilled craftspeople around the world.',
    projectCount: 156,
    creatorCount: 48,
  },
  'photography': {
    id: 'photography',
    name: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    description: 'Discover stunning photography across various genres, from landscapes and portraits to abstract and documentary.',
    projectCount: 423,
    creatorCount: 137,
  },
  'sculpture': {
    id: 'sculpture',
    name: 'Sculpture',
    image: 'https://images.unsplash.com/photo-1544413164-5f1b295eb435?q=80&w=800&auto=format&fit=crop',
    description: 'Explore three-dimensional artworks created through carving, modeling, casting, and assembling by contemporary sculptors.',
    projectCount: 132,
    creatorCount: 45,
  },
  'digital': {
    id: 'digital',
    name: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1633186223008-a0c7e3d14fd5?q=80&w=800&auto=format&fit=crop',
    description: 'Discover digital illustrations, 3D renderings, digital paintings, and other computer-generated artwork by innovative digital artists.',
    projectCount: 367,
    creatorCount: 112,
  },
};

// Mock projects data for each category
const CATEGORY_PROJECTS = {
  'woodworking': [
    {
      id: '1',
      title: 'Handcrafted Oak Dining Table',
      image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Emma Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      },
      likes: 342,
      featured: true,
    },
    {
      id: '2',
      title: 'Walnut Coffee Table',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100&auto=format&fit=crop',
      },
      likes: 256,
      featured: false,
    },
    {
      id: '3',
      title: 'Maple Bookshelf',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Daniel Lee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      },
      likes: 189,
      featured: true,
    },
    {
      id: '4',
      title: 'Cherry Wood Side Table',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
      },
      likes: 143,
      featured: false,
    },
  ],
  'painting': [
    {
      id: '5',
      title: 'Abstract Acrylic Landscape',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      },
      likes: 517,
      featured: true,
    },
    {
      id: '6',
      title: 'Urban Decay Series #3',
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Olivia Taylor',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
      },
      likes: 432,
      featured: false,
    },
    {
      id: '7',
      title: 'Digital Distortion',
      image: 'https://images.unsplash.com/photo-1573096108468-702f6014ef28?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Sophia Williams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      },
      likes: 378,
      featured: true,
    },
  ],
  'pottery': [
    {
      id: '8',
      title: 'Ceramic Vase Collection',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Sophia Williams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      },
      likes: 289,
      featured: true,
    },
    {
      id: '9',
      title: 'Stoneware Dinner Set',
      image: 'https://images.unsplash.com/photo-1603120296664-c04b8c1231c4?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Noah Wilson',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
      },
      likes: 245,
      featured: false,
    },
  ],
  'jewelry': [
    {
      id: '10',
      title: 'Silver Moonstone Ring',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Jessica Miller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      },
      likes: 456,
      featured: true,
    },
    {
      id: '11',
      title: 'Gold Geometric Earrings',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Jessica Miller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      },
      likes: 387,
      featured: true,
    },
  ],
  'textiles': [
    {
      id: '12',
      title: 'Hand-woven Wall Hanging',
      image: 'https://images.unsplash.com/photo-1551893665-f843f600794e?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Amelia Parker',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
      },
      likes: 278,
      featured: true,
    },
  ],
  'photography': [
    {
      id: '13',
      title: 'Urban Architecture Series',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
      },
      likes: 523,
      featured: true,
    },
  ],
  'sculpture': [
    {
      id: '14',
      title: 'Bronze Abstract Form',
      image: 'https://images.unsplash.com/photo-1544413164-5f1b295eb435?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop',
      },
      likes: 312,
      featured: true,
    },
  ],
  'digital': [
    {
      id: '15',
      title: 'Futuristic Cityscape',
      image: 'https://images.unsplash.com/photo-1633186223008-a0c7e3d14fd5?q=80&w=400&auto=format&fit=crop',
      user: {
        name: 'Olivia Taylor',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
      },
      likes: 478,
      featured: true,
    },
  ],
};

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id;
  const category = CATEGORIES[categoryId as keyof typeof CATEGORIES];
  const projects = CATEGORY_PROJECTS[categoryId as keyof typeof CATEGORY_PROJECTS] || [];
  
  const [sortBy, setSortBy] = useState('popular');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  if (!category) {
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
          <Text style={styles.notFoundText}>Category not found</Text>
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
  
  const handleSortChange = (option: string) => {
    setSortBy(option);
    setShowFilterOptions(false);
  };
  
  const renderProjectItem = ({ item, index }: { item: typeof projects[0], index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
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
          <View style={styles.projectUser}>
            <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
            <Text style={styles.userName}>{item.user.name}</Text>
          </View>
          <Text style={styles.projectLikes}>{item.likes} likes</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
        <Text style={styles.headerTitle}>{category.name}</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>
      
      {showFilterOptions && (
        <View style={styles.filterOptions}>
          <TouchableOpacity 
            style={[styles.filterOption, sortBy === 'popular' && styles.activeFilterOption]}
            onPress={() => handleSortChange('popular')}
          >
            <Text style={[styles.filterOptionText, sortBy === 'popular' && styles.activeFilterOptionText]}>
              Most Popular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterOption, sortBy === 'recent' && styles.activeFilterOption]}
            onPress={() => handleSortChange('recent')}
          >
            <Text style={[styles.filterOptionText, sortBy === 'recent' && styles.activeFilterOptionText]}>
              Most Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterOption, sortBy === 'featured' && styles.activeFilterOption]}
            onPress={() => handleSortChange('featured')}
          >
            <Text style={[styles.filterOptionText, sortBy === 'featured' && styles.activeFilterOptionText]}>
              Featured
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.categoryBanner}>
        <Image source={{ uri: category.image }} style={styles.categoryImage} />
        <View style={styles.categoryOverlay}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
          <View style={styles.categoryStats}>
            <Text style={styles.categoryStat}>{category.projectCount} Projects</Text>
            <Text style={styles.categoryStatDivider}>•</Text>
            <Text style={styles.categoryStat}>{category.creatorCount} Creators</Text>
          </View>
        </View>
      </View>
      
      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.projectsGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyProjectsContainer}>
            <Text style={styles.emptyProjectsText}>No projects to display</Text>
          </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterOptions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterOption: {
    backgroundColor: '#f0f2f5',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterOptionText: {
    color: '#5e72e4',
    fontWeight: 'bold',
  },
  categoryBanner: {
    height: 200,
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
    opacity: 0.9,
  },
  categoryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryStat: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  categoryStatDivider: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginHorizontal: 5,
  },
  projectsGrid: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 80,
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
  projectUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  userName: {
    fontSize: 12,
    color: '#666',
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