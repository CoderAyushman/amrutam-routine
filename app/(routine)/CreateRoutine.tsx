import { useRoutineStore } from '@/store/store';
import { Entypo, Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useShallow } from 'zustand/react/shallow';
export default function CreateRoutineScreen() {
  const [isSaved, setIsSaved] = useState(false);
  const [duration, setDuration] = useState('6');
  const [openCategory, setOpenCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState('lifestyle');
  const [categoryitems, setCategoryItems] = useState([
    { label: 'LifeStyle', value: 'lifestyle' },
    { label: 'Health', value: 'health' },
    { label: 'Self Care', value: 'selfcare' },
    { label: 'Skin Care', value: 'skincare' },
    { label: 'Hair Care', value: 'haircare' },
  ]);
  const [openUnit, setOpenUnit] = useState(false);
  const [valueUnit, setValueUnit] = useState('weeks');
  const [unitsitems, setUnitsItems] = useState([
    { label: 'Weeks', value: 'weeks' },
    { label: 'Months', value: 'months' },
    { label: 'Days', value: 'days' },
  ]);
  const sampleImages = [
    require("../../assets/images/hair1.png"),
    require("../../assets/images/hair2.png"),
    require("../../assets/images/hair3.png"),
    require("../../assets/images/hair4.png"),
    require("../../assets/images/hair5.png"),

  ];
  const [routineImageUri, setRoutineImageUri] = useState<string | ImageSourcePropType>('');
  const [routineName, setRoutineName] = useState('');
  const [routineDescription, setRoutineDescription] = useState('');
  const {
    routines,
    reminders,
    benefits,
    caregiver,
    reminderChannel,
    addRoutines,
    deleteReminder,
  } = useRoutineStore(
    useShallow(state => ({
      routines: state.routines,
      reminders: state.reminders,
      benefits: state.benefits,
      caregiver: state.caregivers,
      reminderChannel: state.remindersChannels,
      addRoutines: state.addRoutine,
      deleteReminder: state.deleteReminder,
    })))
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const fileName = image.uri.split('/').pop(); // extract filename
      const newPath: any = FileSystem?.documentDirectory! + new Date().getTime() + '-' + fileName;

      try {
        await FileSystem.copyAsync({
          from: image.uri,
          to: newPath,
        });
        setRoutineImageUri(newPath);
        console.log('Saved image at:', newPath);
      } catch (e) {
        console.error('Failed to save image:', e);
      }
    }
  };
  const handleSaveAndProceed = () => {
    try {
      if (routineImageUri && routineName && routineDescription && duration) {
        console.log(routineImageUri, routineName, routineDescription, duration, valueCategory, valueUnit)
        setIsSaved(true)
      }
      else {
        alert('Please fill all the fields')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleProceed = () => {
    try {
      if (reminders.length > 0 && benefits.length > 0 && caregiver.length > 0 && reminderChannel.length > 0) {
        addRoutines({
          id: new Date().toISOString(),
          name: routineName,
          category: valueCategory,
          image: routineImageUri,
          description: routineDescription,
          duration: duration,
          unit: valueUnit,
          reminders: reminders,
          weeklyBenefits: benefits,
          assignedCaregivers: caregiver
        })
        router.back()
      }
      else {
        alert('Please fill all the fields')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: 'white', width: '100%', height: '100%' }}
    >
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <TouchableOpacity style={{ left: 0, top: 20, position: 'absolute' }} onPress={() => { isSaved ? setIsSaved(false) : router.back() }}><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>
        <Text style={styles.pageTitle}>Create Routine</Text>
        <Text style={styles.subTitle}>Create your own routine</Text>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', gap: 10, marginBlock: 20 }}>
          <View style={[{ height: 5, backgroundColor: "#D9D9D9", width: '40%', borderRadius: 20 }, isSaved && { backgroundColor: "#3A643B" }]}></View>
          <View style={{ height: 5, backgroundColor: "#D9D9D9", width: '40%', borderRadius: 20 }}></View>
        </View>
        {!isSaved ? <View>
          <Text style={styles.label}>Routine Name</Text>
          <TextInput placeholder="Enter your routine name" style={styles.input} value={routineName} onChangeText={setRoutineName} />

          <Text style={styles.label}>Category</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={openCategory}
              value={valueCategory}
              items={categoryitems}
              setOpen={setOpenCategory}
              setValue={setValueCategory}
              setItems={setCategoryItems}
              style={{ borderWidth: 0, padding: 0, margin: 0 }}
            />
          </View>
          <Text style={styles.label}>Please select the category of your Routine</Text>
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', paddingBlock: 20 }}>
            {routineImageUri ? (
              <Image source={typeof routineImageUri === 'string' ? { uri: routineImageUri } : routineImageUri} style={{ width: 150, height: 150, borderRadius: 10, marginHorizontal: 'auto' }} />
            ) : <View><TouchableOpacity style={styles.uploadBox} onPress={() => pickImage()}>
              <Ionicons name="cloud-upload-outline" size={30} color="gray" />
              <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>

              <Text style={styles.orText}>OR</Text>
              <Text style={styles.label}>Select from our picks</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRow}>
                {sampleImages.map((img, i) => (
                  <TouchableOpacity key={i} onPress={() => { setRoutineImageUri(img); }}>
                    <Image source={img} style={styles.sampleImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            }
            {routineImageUri && <TouchableOpacity style={styles.cancelButton} onPress={() => { setRoutineImageUri(''); }}><Text>Cancel</Text></TouchableOpacity>}
          </View>

          <Text style={styles.label}>Description</Text>
          <View style={styles.descriptionBox}>
            <TextInput
              multiline
              placeholder="Describe your Routine"
              value={routineDescription}
              onChangeText={setRoutineDescription}
              style={styles.descriptionItem}
            />
          </View>

          <Text style={styles.label}>Please select how long you want to follow the Routine</Text>
          <View style={styles.durationRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 2 }]}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"

            />
            <View style={{ flex: 1, }}>
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
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={() => { handleSaveAndProceed() }}>
            <Text style={styles.saveText}>Save and Proceed</Text>
          </TouchableOpacity>
        </View> : (
          <View style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between', padding: 10, }}>
            <View style={styles.topSection}>
              <TouchableOpacity onPress={() => router.push('/AddReminderScreen')}>
                <AntDesign name="plussquareo" size={40} color="#3A643B" />
              </TouchableOpacity>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}> Add Reminder Items</Text>
                <Text style={styles.sectionSubText}>Add Items for your Routine</Text>
              </View>
            </View>

            {/* Item Card */}
            {reminders && reminders.map((reminder, index) => (
              <View style={styles.card} key={index}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {reminder.name}
                  </Text>
                  <TouchableOpacity onPress={() => { deleteReminder(reminder.id) }}>
                    <Entypo name="cross" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{reminder.productType}</Text>
                </View>

                <TouchableOpacity>
                  <Text style={styles.viewDetails}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}


            {/* <TouchableOpacity style={styles.moreItems}>
              <Text style={styles.moreItemsText}>More Reminder Items (2) ➤</Text>
            </TouchableOpacity> */}

            <View style={styles.topSection}>
              <TouchableOpacity onPress={() => router.push({ pathname: '/AddWeeklyBenefits', params: { duration: duration, unit: valueUnit, routineName: routineName } })} >
                <AntDesign name="plussquareo" size={40} color="#3A643B" />
              </TouchableOpacity>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}> Add Weekly Benefits</Text>
                <Text style={styles.sectionSubText}>
                  Add weekly benefits of this Routine so that users can tally the progress
                </Text>
                {benefits.length > 0 && <Text style={{ color: '#3A643B', fontWeight: 'bold', fontSize: 16 }}>Benefits are added</Text>}
              </View>
            </View>
            <View style={styles.topSection}>
              <TouchableOpacity onPress={() => router.push({ pathname: '/AddRemindersChannels' })} >
                <AntDesign name="plussquareo" size={40} color="#3A643B" />
              </TouchableOpacity>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}> Add Reminder Channels</Text>
                <Text style={styles.sectionSubText}>
                  We will notify you about your Routine using channels.
                </Text>

                <View style={styles.chipContainer}>
                  {reminderChannel.length > 0 && ['SMS', 'Whatsapp', 'Email'].map((label) => (
                    <View style={styles.chip} key={label}>
                      <Text style={styles.chipText}>{label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Assign a Caregiver */}
            <View style={styles.topSection}>
              <TouchableOpacity onPress={() => router.push('/AssignCaregiver')} >
                <AntDesign name="plussquareo" size={40} color="#3A643B" />
              </TouchableOpacity>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}> Assign a Caregiver</Text>
                <Text style={styles.sectionSubText}>We will keep updating caregiver about your Routine.</Text>

                {/* Caregiver Card */}
                {caregiver.length > 0 && caregiver.map((caregiver, index) => (
                  <View style={styles.card} key={index}>
                    <View style={{ flexDirection: 'row' }}>
                      {/* <Image
                      source={ caregiver?.image! ? { uri: caregiver.image } : require('../../assets/images/avatar.png')} // Placeholder image
                      style={styles.avatar}
                    /> */}
                      <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text style={styles.cardTitle}>{caregiver.firstName}</Text>
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>Recent Consultation</Text>
                        </View>
                        <Text style={styles.pendingText}>Request Pending ⏳</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} >
                      <Entypo name="cross" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ))}

              </View>
            </View>

            {/* Proceed Button */}
            <TouchableOpacity style={styles.button} onPress={() => { handleProceed() }}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        )

        }
      </ScrollView>
    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 60,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    // padding: 12,
    // marginBottom: 16,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  uploadBox: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadText: {
    marginTop: 6,
    fontSize: 14,
    color: '#888',
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 8,
    color: '#888',
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sampleImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  descriptionItem: {
    fontSize: 13,
    marginBottom: 6,
    color: '#555',
  },
  durationRow: {
    flexDirection: 'row',
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 50,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: { borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 10, backgroundColor: 'white', marginVertical: 10 },
  section: {
    width: '100%',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubText: {
    color: 'gray',
    fontSize: 12,
  },
  card: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  badge: {
    backgroundColor: '#e6f4ea',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  badgeText: {
    fontSize: 12,
    color: 'green',
    fontWeight: '500',
  },
  viewDetails: {
    color: '#1e88e5',
    marginTop: 6,
    fontWeight: '500',
  },
  moreItems: {
    marginBottom: 16,
  },
  moreItemsText: {
    color: '#1e88e5',
    fontWeight: '500',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  chip: {
    backgroundColor: '#d7eedf',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    color: 'green',
    fontWeight: '500',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  pendingText: {
    marginTop: 6,
    color: '#cc9a00',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topSection: { display: 'flex', flexDirection: 'row', gap: 10, },

})