import {create} from "zustand";
import {persist} from "zustand/middleware";
import {UserOutlet} from "@/types/Types";

export type OutletManagerSlice = {
    selectedOutlet: UserOutlet
    currentUserId: number
}

export type State = {
    outletManagerSlice: OutletManagerSlice
}

export type Actions = {
    updateSelectedOutlet: (outlet:UserOutlet) => void,
    updateCurrentUserId: (id: number) => void
}

export const useStore = create<State & Actions>()(persist((set) => ({
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
                }, currentUserId: -1
            },
            updateSelectedOutlet: (outlet) => set(state => ({
                outletManagerSlice: {
                    ...state.outletManagerSlice, selectedOutlet: outlet
                }
            })),
            updateCurrentUserId: () => {
            }
        }),
        {
            name:'application-store',
            
        }
    )
)
