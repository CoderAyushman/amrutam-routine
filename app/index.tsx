import { useRoutineStore } from '@/store/store';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
// const routines = [
//     {
//         title: 'Focus & Work',
//         image: require('../assets/images/focus.png'), // Replace with your image
//         reminders: 3,
//         stars: 47,
//     },
//     {
//         title: 'Skin Care Routine',
//         image: require('../assets/images/skincare.png'),
//         reminders: 3,
//         stars: 8,
//     },
// ];

const patients = [
    { name: 'Meeta Sharma', concern: 'Migraines' },
    { name: 'Apana Jude', concern: 'Migraines' },
    { name: 'Ankit Tez', concern: 'Migraines' },
];


const index = () => {
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
        return require('../assets/images/focus.png');
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
        <View style={styles.container}>
            <Text style={styles.header}>My Routine</Text>
            {routines.length > 0 ? (
                <View style={styles.routineScroll}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {routines.map((routine, index) => (
                            <View key={index} style={styles.routineCard}>
                                <Image source={getImageSource(routine.image)} style={styles.routineImage} />
                                <View style={{ width: '100%' }}>

                                    <Text style={styles.routineTitle}>{routine.name}</Text>
                                    <View style={styles.routineMeta}>
                                        <Text style={styles.metaText}>{reminders.length} Reminder Items</Text>
                                        <Text style={styles.metaText}>
                                            5<Entypo name="star" size={14} color="#facc15" />
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <Text style={[styles.routineScroll, { fontSize: 16, fontWeight: '500', textAlign: 'center', marginTop: 20 }]}>You have no routines yet</Text>
            )}

            <View style={styles.assignSection}>
                <Text style={styles.subHeader}>Patients yet to assign a routine</Text>
                <TouchableOpacity>
                    <Text style={styles.seeMore}>See More</Text>
                </TouchableOpacity>
            </View>

            {patients.map((patient, index) => (
                <View key={index} style={styles.patientCard}>
                    <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
                    <View style={styles.patientInfo}>
                        <Text style={styles.patientName}>{patient.name}</Text>
                        <Text style={styles.concern}>Concern: {patient.concern}</Text>
                    </View>
                    <TouchableOpacity style={styles.assignButton} onPress={() => { router.push({ pathname: '/(routine)/AssignRoutine', params: { name: patient.name, image: '../../assets/images/avatar.png', concern: patient.concern } }) }}    >
                        <Text style={styles.assignText}>Assign Routine</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity style={styles.add} onPress={() => { router.push('/(routine)/CreateRoutine') }}>
                <MaterialIcons name="add" size={28} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default index

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        marginTop: 60,

    },
    routineScroll: {
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
    },
    routineCard: {
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBlock: 16,
    },
    routineImage: {
        width: 144,
        height: 144,
        borderRadius: 8,
    },
    routineTitle: {
        fontWeight: '600',
        marginTop: 8,
    },
    routineMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    metaText: {
        fontSize: 12,
        color: '#777',
    },
    assignSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '500',
    },
    seeMore: {
        color: '#3A643B',
        fontWeight: '500',
    },
    patientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    patientInfo: {
        flex: 1,
    },
    patientName: {
        fontWeight: '500',
        fontSize: 16,
    },
    concern: {
        fontSize: 13,
        color: '#666',
    },
    assignButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderColor: '#3A643B',
        borderWidth: 1,
        borderRadius: 6,
    },
    assignText: {
        color: '#3A643B',
        fontWeight: '500',
    },
    add: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#3A643B',
        width: 70,
        height: 70,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});