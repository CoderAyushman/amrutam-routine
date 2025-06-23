import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ConsultationSummary() {
    const [selectedConcern, setSelectedConcern] = useState('Knee Pain');
    const [explanation, setExplanation] = useState('');
    const [openUnit, setOpenUnit] = useState(false);
    const [valueUnit, setValueUnit] = useState('kneepain');
    const [unitsitems, setUnitsItems] = useState([
        { label: 'Knee Pain', value: 'kneepain' },
        { label: 'Migraine', value: 'migraine' },
        { label: 'Acidity', value: 'acidity' },
    ]);
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
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="#333" onPress={() => { router.replace('/') }} />
                <View style={styles.userInfo}>
                    <Image
                        source={getImageSource(require('../../assets/images/avatar.png'))}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.username}>{name ? name : 'Geetanjali Shah'}</Text>
                        <Text style={styles.status}>online</Text>
                    </View>
                </View>
            </View>

            {/* Completion Message */}
            <View style={styles.messageRow}>
                <Ionicons name="information-circle-outline" size={18} color="#555" />
                <Text style={styles.messageText}>Well done! Consultation time is over 🎉</Text>
            </View>

            {/* Summary Box */}
            <View style={styles.card}>
                <SummaryRow label="Age" value="34" />
                <SummaryRow label="Height" value="5'10 ft" />
                <SummaryRow label="Weight" value="74 kg" />
                <SummaryRow label="Sleep Pattern" value="Better not good" />
                <SummaryRow label="General Concerns" value="Back pain, Mig., +2" />
            </View>

            {/* Dropdown */}
            <Text style={styles.sectionLabel}>Current Concerns</Text>
            <View style={styles.pickerContainer}>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={openUnit}
                    value={valueUnit}
                    items={unitsitems}
                    setOpen={setOpenUnit}
                    setValue={setValueUnit}
                    setItems={setUnitsItems}
                    style={styles.input}
                />
            </View>

            {/* Explanation Box */}
            <Text style={styles.sectionLabel}>Explain</Text>
            <TextInput
                placeholder={`Explain "${name}" about the Concern`}
                style={styles.textarea}
                multiline
                numberOfLines={5}
                value={explanation}
                onChangeText={setExplanation}
            />

            {/* Next Button */}
            <TouchableOpacity style={styles.nextButton} onPress={() => { router.replace({ pathname: '/AssignRoutineFinal', params: { name: name, image: image } }) }}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
    </View>
);
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc'
    },
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
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
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    messageText: {
        fontSize: 14,
        color: '#444',
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 12,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#555',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111',
    },
    sectionLabel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
    },
    picker: {
        height: 45,
        paddingHorizontal: 10,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 30,
    },
    nextButton: {
        backgroundColor: 'green',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});