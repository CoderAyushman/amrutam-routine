import { useRoutineStore } from '@/store/store';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useShallow } from 'zustand/react/shallow';
type RemindersChannels = {
  id: string;
  mobileNumber: string;
  email: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
};
export default function AddChannels() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [fbEnabled, setFbEnabled] = useState(false);
  const [instaEnabled, setInstaEnabled] = useState(false);
  const [value, setValue] = useState('value');
  const {
    addReminderChannel,

  } = useRoutineStore(
    useShallow(state => ({
      addReminderChannel: state.addReminderChannel,
    })))
  const handleSave = () => {
    if (smsEnabled && whatsappEnabled && emailEnabled) {
      addReminderChannel({
        id: new Date().toISOString(),
        mobileNumber: value,
        email: value,
        whatsapp: value
      })
      router.back()
    }

  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Reminder Channels</Text>
      <Text style={styles.subheading}>
        Add channels to get reminded about the reminder
      </Text>

      <ChannelSection
        title="SMS"
        enabled={smsEnabled}
        onToggle={setSmsEnabled}
        placeholder="Mobile Number"
        defaultValue="+91-9871708209"
      />

      <ChannelSection
        title="WhatsApp"
        enabled={whatsappEnabled}
        onToggle={setWhatsappEnabled}
        placeholder="WhatsApp Number"
        defaultValue="+91-9871708209"
      />

      <ChannelSection
        title="Email"
        enabled={emailEnabled}
        onToggle={setEmailEnabled}
        placeholder="Email ID"
        defaultValue="amrutamxyz@gmail.com"
      />

      <SimpleChannel
        title="Google Calendar"
        enabled={googleEnabled}
        onToggle={setGoogleEnabled}
      />
      <SimpleChannel
        title="Facebook Messenger"
        enabled={fbEnabled}
        onToggle={setFbEnabled}
      />
      <SimpleChannel
        title="Instagram"
        enabled={instaEnabled}
        onToggle={setInstaEnabled}
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => { handleSave() }}>
        <Text style={styles.saveButtonText}>Save Channels</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ChannelSection({ title, enabled, onToggle, placeholder, defaultValue }: any) {
  return (
    <View style={styles.channelContainer}>
      <View style={styles.channelHeader}>
        <Text style={styles.channelTitle}>{title}</Text>
        <Switch value={enabled} onValueChange={onToggle} />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="check" size={16} color="green" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          defaultValue={defaultValue}
          editable={enabled}

        />
      </View>
      <TouchableOpacity style={styles.addMore}>
        <Ionicons name="add-circle-outline" size={16} color="green" />
        <Text style={styles.addMoreText}>Add More</Text>
      </TouchableOpacity>
    </View>
  );
}

function SimpleChannel({ title, enabled, onToggle }: any) {
  return (
    <View style={styles.channelContainer}>
      <View style={styles.channelHeader}>
        <Text style={styles.channelTitle}>{title}</Text>
        <Switch value={enabled} onValueChange={onToggle} />
      </View>
      <TouchableOpacity
        style={[
          styles.simpleChannelBtn,
          { backgroundColor: enabled ? '#fff' : '#f1f1f1' },
        ]}
        disabled={!enabled}
      >
        <Ionicons name="add" size={18} color="green" />
        <Text
          style={[
            styles.simpleChannelText,
            { color: enabled ? 'green' : '#999' },
          ]}
        >
          Add Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  channelContainer: {
    marginBottom: 24,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  addMore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  addMoreText: {
    marginLeft: 4,
    color: 'green',
    fontSize: 14,
  },
  simpleChannelBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  simpleChannelText: {
    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 50
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});