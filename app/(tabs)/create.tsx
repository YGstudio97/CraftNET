import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { Camera, X, Upload, Plus, ChevronDown } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

// Mock categories
const CATEGORIES = [
  { id: 'woodworking', name: 'Woodworking' },
  { id: 'painting', name: 'Painting' },
  { id: 'pottery', name: 'Pottery' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'textiles', name: 'Textiles' },
  { id: 'photography', name: 'Photography' },
  { id: 'sculpture', name: 'Sculpture' },
  { id: 'digital', name: 'Digital Art' },
];

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Mock function to add an image
  const handleAddImage = () => {
    // In a real app, this would open the camera or image picker
    // For now, we'll just add a placeholder image
    const mockImages = [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    ];
    
    if (images.length < 5) {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      setImages([...images, randomImage]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial('');
    }
  };
  
  const handleRemoveMaterial = (index: number) => {
    const newMaterials = [...materials];
    newMaterials.splice(index, 1);
    setMaterials(newMaterials);
  };
  
  const handleSelectCategory = (categoryId: string) => {
    setCategory(categoryId);
    setShowCategoryPicker(false);
  };
  
  const handleSubmit = () => {
    // Validate form
    if (!title) {
      setError('Please enter a title');
      return;
    }
    
    if (!description) {
      setError('Please enter a description');
      return;
    }
    
    if (!category) {
      setError('Please select a category');
      return;
    }
    
    if (images.length === 0) {
      setError('Please add at least one image');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // In a real app, you would submit the form data to your backend here
    // For now, we'll just navigate back to the home screen
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Project</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeIn.duration(400)}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a title for your project"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity 
              style={styles.categorySelector}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={category ? styles.categoryText : styles.placeholderText}>
                {category ? CATEGORIES.find(c => c.id === category)?.name : 'Select a category'}
              </Text>
              <ChevronDown size={20} color="#666" />
            </TouchableOpacity>
            
            {showCategoryPicker && (
              <View style={styles.categoryPicker}>
                {CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryOption,
                      category === cat.id && styles.selectedCategoryOption
                    ]}
                    onPress={() => handleSelectCategory(cat.id)}
                  >
                    <Text 
                      style={[
                        styles.categoryOptionText,
                        category === cat.id && styles.selectedCategoryOptionText
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your project, process, and inspiration"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Images</Text>
            <Text style={styles.helperText}>Add up to 5 images of your project</Text>
            
            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <X size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              
              {images.length < 5 && (
                <TouchableOpacity 
                  style={styles.addImageButton}
                  onPress={handleAddImage}
                >
                  <Camera size={24} color="#5e72e4" />
                  <Text style={styles.addImageText}>Add Image</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Materials Used</Text>
            
            <View style={styles.materialsContainer}>
              {materials.map((material, index) => (
                <View key={index} style={styles.materialTag}>
                  <Text style={styles.materialText}>{material}</Text>
                  <TouchableOpacity onPress={() => handleRemoveMaterial(index)}>
                    <X size={14} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            <View style={styles.addMaterialContainer}>
              <TextInput
                style={styles.materialInput}
                placeholder="Add a material"
                value={newMaterial}
                onChangeText={setNewMaterial}
                onSubmitEditing={handleAddMaterial}
              />
              <TouchableOpacity 
                style={styles.addMaterialButton}
                onPress={handleAddMaterial}
              >
                <Plus size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Upload size={20} color="#fff" style={styles.submitIcon} />
            <Text style={styles.submitText}>Publish Project</Text>
          </TouchableOpacity>
        </Animated.View>
        
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: '#8898aa',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
  },
  categorySelector: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#8898aa',
  },
  categoryPicker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  categoryOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedCategoryOption: {
    backgroundColor: '#f0f2f5',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryOptionText: {
    color: '#5e72e4',
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addImageText: {
    color: '#5e72e4',
    marginTop: 5,
    fontSize: 12,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  materialTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  materialText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  addMaterialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addMaterialButton: {
    backgroundColor: '#5e72e4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#5e72e4',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitIcon: {
    marginRight: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});