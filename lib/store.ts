import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserOutlet } from "@/types/Types";

export type UserProfile = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    user_type_id: number;
    dob: string;  // Stored as string in Zustand
    email: string;
    phone_number: string;
};


export type OutletManagerSlice = {
    selectedOutlet: UserOutlet;
    currentUserId: number;
};

export type UserProfileSlice = {
    currentUser: UserProfile;
};

export type State = {
    outletManagerSlice: OutletManagerSlice;
    userProfileSlice: UserProfileSlice;
};

export type Actions = {
    updateSelectedOutlet: (outlet: UserOutlet) => void;
    updateCurrentUserId: (id: number) => void;
    updateUserProfile: (profile: UserProfile) => void;
};

export const useStore = create<State & Actions>()(
    persist(
        (set) => ({
            outletManagerSlice: {
                selectedOutlet: {
                    id: -1,
                    name: '',
                    address: '',
                    contact_no: '',
                    capacity: 0,
                    reserved_count: 0,
                    available_count: 0,
                    created_at: '',
                    district: ''
                },
                currentUserId: -1
            },
            userProfileSlice: {
                currentUser: {
                    id: -1,
                    username: '',
                    firstname: '',
                    lastname: '',
                    user_type_id: 0,
                    dob: '',
                    email: '',
                    phone_number: ''
                }
            },
            updateSelectedOutlet: (outlet) =>
                set((state) => ({
                    outletManagerSlice: {
                        ...state.outletManagerSlice,
                        selectedOutlet: outlet
                    }
                })),
            updateCurrentUserId: (userId) =>
                set((state) => ({
                    outletManagerSlice: {
                        ...state.outletManagerSlice,
                        currentUserId: userId
                    }
                })),
            updateUserProfile: (profile) =>
                set((state) => ({
                    userProfileSlice: {
                        ...state.userProfileSlice,
                        currentUser: profile
                    }
                }))
        }),
        {
            name: 'application-store',
            skipHydration: true
        }
    )
);
