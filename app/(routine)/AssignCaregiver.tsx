import { useRoutineStore } from '@/store/store';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useShallow } from 'zustand/react/shallow';
const caregivers = [
    {
        id: 1,
        name: 'Dr. Pooja',
        note: 'Recent Consultation',
        image: require('../../assets/images/pooja.png'),
    },
    {
        id: 2,
        name: 'Sister <3',
        note: 'Recent Caregiver',
        image: require('../../assets/images/sister.png'),
    },
];

export default function AssignCaregiver() {
    const {
        addCaregiver,

    } = useRoutineStore(
        useShallow(state => ({
            addCaregiver: state.addCaregiver,
        })))
    const handleAddCaregiver = (person: any) => {
        try {
            addCaregiver({
                id: new Date().toISOString(),
                firstName: person.name,
            })
            router.back()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <TouchableOpacity style={{ left: 0, top: 20 }} onPress={() => { router.back() }}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.heading}>Assign a Caregiver</Text>
            <Text style={styles.subheading}>Assign a caregiver for yourself</Text>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons name="person-circle-outline" size={18} color="#aaa" />
                <TextInput
                    placeholder="Search for a Caregiver"
                    style={styles.searchInput}
                    placeholderTextColor="#aaa"
                />
            </View>

            {/* Quick Add */}
            <Text style={styles.quickAddTitle}>Quick Add</Text>

            {caregivers.map((person) => (
                <View style={styles.card} key={person.id}>
                    <Image source={person.image} style={styles.avatar} />
                    <View style={styles.cardText}>
                        <Text style={styles.cardName}>{person.name}</Text>
                        <Text style={styles.cardNote}>{person.note}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddCaregiver(person)}>
                        <Ionicons name="add-circle-outline" size={18} color="green" />
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {/* Invite Button */}
            <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Invite Your Friend</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',

    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginTop: 30,
    },
    subheading: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 24,
    },
    searchInput: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
        flex: 1,
    },
    quickAddTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    cardText: {
        flex: 1,
    },
    cardName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    cardNote: {
        fontSize: 13,
        color: '#888',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    addButtonText: {
        color: 'green',
        fontSize: 14,
        marginLeft: 4,
    },
    inviteButton: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 40,
    },
    inviteButtonText: {
        color: 'green',
        fontSize: 15,
        fontWeight: '600',
    },
});