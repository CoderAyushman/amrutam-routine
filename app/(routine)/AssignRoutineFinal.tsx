import { useRoutineStore } from '@/store/store';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useShallow } from 'zustand/react/shallow';

// const routines = [
//   {
//     id: 1,
//     title: 'Skin Care Routine (Ache Reduction)',
//     weeks: '12 Weeks',
//     items: '3 reminder items',
//     image: require('../assets/skincare1.jpg'),
//   },
//   {
//     id: 2,
//     title: 'Skin Care Routine (Ache Reduction)',
//     weeks: '12 Weeks',
//     items: '3 reminder items',
//     image: require('../assets/skincare2.jpg'),
//   },
// ];

export default function AssignRoutine() {
  const { name, image } = useLocalSearchParams();
  function getImageSource(src: any): ImageSourcePropType {
    if (typeof src === 'number') {
      return src;
    }
    if (typeof src === 'string') {
      return { uri: src };
    }
    if (typeof src === 'object' && src.uri) {
      return src;
    }
    return require('../../assets/images/avatar.png');
  }

  const {
    routines,
    reminders
  } = useRoutineStore(
    useShallow(state => ({
      routines: state.routines,
      reminders: state.reminders,
    })))
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <View style={styles.userInfo}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{name ? name : 'Geetanjali shah'}</Text>
            <Text style={styles.status}>online</Text>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.heading}>
        Assign a routine to {name}? Assign through your pre build Routines
      </Text>

      {/* Routines */}
      <View style={styles.routineWrapper}>
        {routines.length > 0 ? (
          routines.map((routine) => (
            <TouchableOpacity key={routine.id} style={styles.card} onPress={() => { router.push(`/`) }}>
              <Image source={getImageSource(routine.image)} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{routine.name}</Text>
                <View style={styles.cardMeta}>
                  <FontAwesome name="calendar" size={14} color="#555" />
                  <Text style={styles.metaText}>{routine.weeklyBenefits.length}</Text>
                </View>
                <View style={styles.cardMeta}>
                  <Ionicons name="notifications-outline" size={14} color="#555" />
                  <Text style={styles.metaText}>{routine.reminders.length}</Text>
                </View>
                <Text style={styles.byText}>By You</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', marginTop: 20 }}>No routines found</Text>
        )}
      </View>

      {/* New Routine Prompt */}
      <View style={styles.questionRow}>
        <Ionicons name="help-circle-outline" size={18} color="#7c7c7c" />
        <Text style={styles.questionText}>
          Unable to find a perfect routine for {name}?
        </Text>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={() => { router.push('/CreateRoutine') }}>
        <Text style={styles.createButtonText}>Create a New Routine</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.learnMore}>Learn more about Routine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    marginTop: 30
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  status: {
    fontSize: 12,
    color: 'green',
  },
  heading: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  routineWrapper: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
    color: '#222',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#555',
  },
  byText: {
    fontSize: 11,
    color: '#888',
    marginTop: 6,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 13,
    color: '#666',
  },
  createButton: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  learnMore: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});