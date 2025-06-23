import { useRoutineStore } from '@/store/store';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useShallow } from 'zustand/react/shallow';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
type reminderType = "product" | "activity";
type reminderFrequency = string | string[];
type RemindersItem = {
    id: string;
    reminderType?: reminderType;
    name: string;
    productType: string;
    quantity: string;
    unit: string;
    frequency: reminderFrequency;
};
export default function AddReminderScreen() {
    const [isSaved, setIsSaved] = useState(false);
    const [selectedDays, setSelectedDays] = useState(['Tue', 'Thu', 'Sat']);
    const [frequency, setFrequency] = useState('Custom');
    const [itemQuantity, setItemQuantity] = useState('1');
    const [openProduct, setOpenProduct] = useState(false);
    const [porductValue, setProductValue] = useState('consumable');
    const [productName, setProductName] = useState('');
    const [prosuctItems, setProductItems] = useState([
        { label: 'Consumable', value: 'consumable' },
        { label: 'Gel', value: 'gel' },
        { label: 'Lotion', value: 'lotion' },
        { label: 'Cream', value: 'cream' },
    ]);
    const [openUnit, setOpenUnit] = useState(false);
    const [valueUnit, setValueUnit] = useState('tbsp');
    const [unitsitems, setUnitsItems] = useState([
        { label: 'TBSP', value: 'tbsp' },
        { label: 'ML', value: 'ml' },
        { label: 'GM', value: 'gm' },

    ]);
    const {
        addReminder,

    } = useRoutineStore(
        useShallow(state => ({
            addReminder: state.addReminder,
        })))
    const toggleDay = (day: any) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    const handleOnPressNext = () => {
        try {
            if (productName && itemQuantity) {
                const reminder: RemindersItem = {
                    id: Date.now().toString(),
                    name: productName,
                    productType: porductValue,
                    quantity: itemQuantity,
                    unit: valueUnit,
                    frequency: frequency === 'Custom' ? selectedDays : 'Daily',
                }
                addReminder(reminder)
                router.back()
            }
            else[
                alert('Please fill all the fields')
            ]
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={{ left: 0, top: 20 }} onPress={() => { isSaved ? setIsSaved(false) : router.back() }}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>


            <Text style={styles.title}>Add Reminder Items</Text>
            {/* Title */}
            <Text >Enter Product Details</Text>

            {/* Product Name Dropdown */}
            <View style={{ gap: 10 }}>
                <Text >Product Name</Text>
                <View style={styles.dropdown}>
                    <TextInput placeholder="Enter Product name" style={styles.dropdownText} value={productName} onChangeText={setProductName} />
                </View>
                <Text style={styles.subText}>Unable to find Product? Add your Product</Text>
            </View>

            {/* Product Type Dropdown */}
            <View style={{ gap: 10 }}>
                <Text >Product Type</Text>
                <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={openProduct}
                    value={porductValue}
                    items={prosuctItems}
                    setOpen={setOpenProduct}
                    setValue={setProductValue}
                    setItems={setProductItems}
                    style={styles.dropdown}
                />
            </View>

            {/* Quantity & Unit */}
            <View style={{ gap: 10 }}>
                <Text >Quantity & Unit</Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                    <View style={[styles.dropdownSmall, { width: '40%' }]}>
                        <TextInput style={styles.dropdownText} placeholder="Quantity" value={itemQuantity} onChangeText={setItemQuantity} />
                    </View>
                    <View style={[{ width: '30%' }, styles.dropdownSmall]}>

                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={openUnit}
                            value={valueUnit}
                            items={unitsitems}
                            setOpen={setOpenUnit}
                            setValue={setValueUnit}
                            setItems={setUnitsItems}
                            style={{ borderWidth: 0 }}
                        />
                    </View>
                </View>

            </View>
            {/* Frequency Radio Buttons */}
            <View style={styles.frequencyRow}>
                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setFrequency('Daily')}
                >
                    <View style={styles.radioCircleOuter}>
                        {frequency === 'Daily' && <View style={styles.radioCircleInner} />}
                    </View>
                    <Text style={styles.radioText}>Daily</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setFrequency('Custom')}
                >
                    <View style={styles.radioCircleOuter}>
                        {frequency === 'Custom' && <View style={styles.radioCircleInner} />}
                    </View>
                    <Text style={styles.radioText}>Custom Days</Text>
                </TouchableOpacity>
            </View>

            {/* Day Selector */}
            {frequency === 'Custom' && (
                <View style={styles.dayRow}>
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[
                                styles.dayButton,
                                selectedDays.includes(day) && styles.dayButtonActive,
                            ]}
                            onPress={() => toggleDay(day)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    selectedDays.includes(day) && styles.dayTextActive,
                                ]}
                            >
                                {day}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {/* Bottom Button */}
            <TouchableOpacity style={styles.button} onPress={() => { handleOnPressNext() }}>
                <Text style={styles.buttonText} >Next</Text>
            </TouchableOpacity>
        </ScrollView>


    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 16,
        paddingBottom: 100,
    },
    stepBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 12,
    },
    step: {
        flex: 1,
        height: 4,
        backgroundColor: '#ddd',
        marginHorizontal: 4,
        borderRadius: 2,
    },
    stepActive: {
        backgroundColor: '#2e7d32',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        marginBottom: 6,
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
    },
    subText: {
        color: '#888',
        fontSize: 12,
        marginBottom: 16,
    },
    row: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    dropdownSmall: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 5,
        borderRadius: 8,
    },
    frequencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircleOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2e7d32',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    radioCircleInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#2e7d32',
    },
    radioText: {
        fontSize: 14,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 4,
    },
    dayButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    dayButtonActive: {
        backgroundColor: '#cde8d5',
    },
    dayText: {
        fontSize: 14,
        color: '#444',
    },
    dayTextActive: {
        color: '#2e7d32',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#2e7d32',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        marginBottom: 16,
    },
});
