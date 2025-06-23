import { ImageSourcePropType } from 'react-native';
import { create, type StoreApi, type UseBoundStore } from "zustand";
type reminderType = "product" | "activity";
type reminderFrequency = string|string[]; 
type RemindersItem = {
  id: string;
  reminderType?: reminderType;
  name: string;
  productType: string;
  quantity: string;
  unit: string;
  frequency: reminderFrequency;
};

type WeeklyBenefits = {
  id: string;
  title: string;
  beneFits: string[];
};
type RemindersChannels = {
  id: string;
  mobileNumber: string;
  email: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
};
type Caregiver = {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  image?: string;
};
type Routines = {
  id: string;
  name: string;
  category: string;
  image: ImageSourcePropType | string; 
  description: string;
  duration: string;
  unit: string;
  reminders: RemindersItem[];
  weeklyBenefits: WeeklyBenefits[];
  assignedCaregivers: Caregiver[];
};
type routineStore = {
  routines: Routines[];
  reminders: RemindersItem[];
  caregivers: Caregiver[];
  benefits: WeeklyBenefits[];
  remindersChannels: RemindersChannels[];
  addRoutine: (routine: Routines) => void;
  updateRoutine: (updatedRoutine: Routines) => void;
  deleteRoutine: (id: string) => void;
  // getRoutineById: (id: string) => Routines | undefined;
  addReminder: (reminder: RemindersItem) => void;
  updateReminder: (updatedReminder: RemindersItem) => void;
  deleteReminder: (id: string) => void;
  addCaregiver: (caregiver: Caregiver) => void;
  updateCaregiver: (updatedCaregiver: Caregiver) => void;
  deleteCaregiver: (id: string) => void;
  addBenefits: (benefits: WeeklyBenefits) => void;
  updateBenefits: (updatedBenefits: WeeklyBenefits) => void;
  deleteBenefits: (id: string) => void;
  addReminderChannel: (channel: RemindersChannels) => void;
  updateReminderChannel: (updatedChannel: RemindersChannels) => void;
  // getBenefitsById: (id: string) => WeeklyBenefits | undefined;
};
export const useRoutineStore: UseBoundStore<StoreApi<routineStore>> = create(
  (set) => ({
    routines: [],
    reminders: [],
    caregivers: [],
    benefits: [],
    remindersChannels: [],
    addRoutine: (routine) =>
      set((state) => ({
        routines: [...state.routines, routine],
      })),

    updateRoutine: (updatedRoutine) =>
      set((state) => ({
        routines: state.routines.map((routine) =>
          routine.id === updatedRoutine.id ? updatedRoutine : routine
        ),
      })),
    deleteRoutine: (id) =>
      set((state) => ({
        routines: state.routines.filter((routine) => routine.id !== id),
      })),
    addReminder: (reminder) =>
      set((state) => ({
        reminders: [...state.reminders, reminder],
      })),
    updateReminder: (updatedReminder) =>
      set((state) => ({
        reminders: state.reminders.map((reminder) =>
          reminder.id === updatedReminder.id ? updatedReminder : reminder
        ),
      })),
    deleteReminder: (id) =>
      set((state) => ({
        reminders: state.reminders.filter((reminder) => reminder.id !== id),
      })),
    addCaregiver: (caregiver) =>
      set((state) => ({
        caregivers: [...state.caregivers, caregiver],
      })),
    updateCaregiver: (updatedCaregiver) =>
      set((state) => ({
        caregivers: state.caregivers.map((caregiver) =>
          caregiver.id === updatedCaregiver.id ? updatedCaregiver : caregiver
        ),
      })),
    deleteCaregiver: (id) =>
      set((state) => ({
        caregivers: state.caregivers.filter((caregiver) => caregiver.id !== id),
      })),
    addBenefits: (benefits) =>
      set((state) => ({ benefits: [...state.benefits, benefits] })),
    updateBenefits: (updatedBenefits) =>
      set((state) => ({
        benefits: state.benefits.map((benefit) =>
          benefit.id === updatedBenefits.id ? updatedBenefits : benefit
        ),
      })),
    deleteBenefits: (id) =>
      set((state) => ({
        benefits: state.benefits.filter((benefit) => benefit.id !== id)
      })),
    addReminderChannel: (channel) =>
      set((state) => ({ remindersChannels: [...state.remindersChannels, channel] })),
    updateReminderChannel: (updatedChannel) =>
      set((state) => ({
        remindersChannels: state.remindersChannels.map((channel) =>
          channel.id === updatedChannel.id ? updatedChannel : channel
        )
    }))
    
    
    
  })
);
