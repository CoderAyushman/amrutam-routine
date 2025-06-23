import { useRoutineStore } from '@/store/store';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
type WeeklyBenefits = {
  id: string;
  title: string;
  beneFits: string[];
};


export default function WeeklyBenefitsScreen() {
  const { duration, unit, routineName }: any = useLocalSearchParams()
  const [durationRange, setDurationRange] = useState<any>([]);
  const [weeks, setWeeks] = useState('2 weeks');
  const [openUnit, setOpenUnit] = useState<boolean>(false);
  const [valueUnit, setValueUnit] = useState<any>(2);
  const [unitsitems, setUnitsItems] = useState<any>([
    { label: '2 Weeks', value: 2 },
    { label: '4 Weeks', value: 2 },

  ]);
  const [benefits, setBenefits] = useState<any>({
    '0-2': [''],
    '2-4': [''],
    '4-6': [''],
    '6-8': [''],
  });
  const {
    addBenefits,

  } = useRoutineStore(
    useShallow(state => ({
      addBenefits: state.addBenefits,
    })))
  useEffect(() => {
    console.log(duration, unit)
    try {
      if (duration && unit && valueUnit) {
        let range = []
        let benefits: any = []

        if (duration / 2 >= 2) {
          setUnitsItems([{
            label: `2 ${unit}`,
            value: 2,
          }])
          if (duration / 4 >= 2) {
            setUnitsItems([
              {
                label: `2 ${unit}`,
                value: 2,
              }, { label: `4 ${unit}`, value: 4 }
            ])
          }
        }
        else {
          setUnitsItems([{
            label: `${duration} ${unit}`,
            value: duration,
          }])
        }
        for (let i = 0; i < duration / Number(valueUnit); i++) {
          range.push(`${Math.floor(i * Number(valueUnit))}-${Math.floor((i + 1) * Number(valueUnit))}`)
          benefits[`${Math.floor(i * Number(valueUnit))}-${Math.floor((i + 1) * Number(valueUnit))}`] = [''];
        }
        setDurationRange(range)
        setBenefits(benefits)

        console.log(durationRange)
      }
    } catch (error) {
      console.log(error)
    }
  }, [duration, unit, valueUnit])

  const handleAddBenefit = (range: any) => {
    setBenefits((prev: any) => ({
      ...prev,
      [range]: [...prev[range], ''],
    }));
  };

  const handleDeleteBenefit = (range: any, index: number) => {
    const updated = [...benefits[range]];
    updated.splice(index, 1);
    setBenefits((prev: any) => ({
      ...prev,
      [range]: updated.length === 0 ? [''] : updated,
    }));
  };

  const handleBenefitChange = (range: string, index: number, text: string) => {
    const updated = [...benefits[range]];
    updated[index] = text;
    setBenefits((prev: any) => ({
      ...prev,
      [range]: updated,
    }));
  };
  const handleSubmit = () => {
    if (benefits) {
      const weeklyBenefits: WeeklyBenefits = {
        id: Date.now().toString(),
        title: routineName,
        beneFits: Object.values(benefits),
      };
      addBenefits(weeklyBenefits)
      router.back()
    }
    else {
      alert('Please add benefits')
    }
  }
  return (
    <ScrollView style={styles.safe}>
      <TouchableOpacity style={{ left: 10, top: 20, padding: 10 }} onPress={() => { router.back() }}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.heading}>Add Weekly Benefits</Text>
        <Text style={styles.subHeading}>Add weekly benefits to your Routine</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This weekly benefit will help potential users track their weekly progress while using this routine.
          </Text>
        </View>

        <Text style={styles.label}>Select {unit}</Text>
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

        <Text style={styles.noteText}>
          Total weeks for your “{routineName}” is <Text style={{ fontWeight: '600' }}>{duration} {unit}</Text>
        </Text>

        {valueUnit && durationRange?.map((range: any, index: any) => (
          <View key={`${range}-${index}`} style={styles.benefitSection}>
            <Text style={styles.rangeTitle}>{range} {unit} Benefits</Text>
            {benefits[range]?.map((benefit: any | undefined, idx: any) => (
              <View key={`${benefit}-${idx}`}>
                <TextInput
                  style={styles.input}
                  placeholder={`Benefit ${idx + 1}`}
                  value={benefit}
                  onChangeText={(text) => { setTimeout(() => { handleBenefitChange(range, idx, text) }, 500) }}
                />
              </View>
            ))}
            {benefits[range]?.every((b: any) => !b.trim()) && (
              <Text style={styles.errorText}> Add at least one benefit in each {unit} to enhance the experience</Text>
            )}

            <View style={styles.actionRow}>
              {benefits[range]?.length > 1 && (
                <TouchableOpacity onPress={() => handleDeleteBenefit(range, benefits[range].length - 1)}>
                  <Text style={styles.deleteText}>🗑 Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleAddBenefit(range)}>
                <Text style={styles.addText}>➕ Add More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit() }}>
        <Text style={styles.submitButtonText}>Add Benefits</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    paddingBottom: 120,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subHeading: {
    color: '#888',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#eaf4ec',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    color: '#2e7d32',
    fontSize: 13,
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  noteText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 16,
  },
  benefitSection: {
    marginBottom: 24,
  },
  rangeTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  deleteText: {
    color: '#d32f2f',
    fontWeight: '500',
  },
  addText: {
    color: '#2e7d32',
    fontWeight: '500',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginBottom: 6,
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
