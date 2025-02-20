'use server';

import {fetchClient} from "@/lib/fetch-client";
import {Outlet, UserOutlet} from "@/types/Types";

export const fetchAllOutlets = async ():Promise<Outlet[]> => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/outlets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch outlets');
        }

        const result = await response.json();
        return result.data; // Resolve with the data
    } catch (e) {
        console.error('Error fetching outlets:', e);
        throw new Error(e.message || 'An error occurred while fetching outlets'); // Reject with a proper error message
    }
};
export const fetchAllDistricts = async () => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/districts`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch districts');
        }

        const result = await response.json();
        console.log(result, 'Result');
        return result.data;
    } catch (e) {
        console.error('Error fetching districts:', e);
        throw new Error(e.message || 'An error occurred while fetching districts');
    }
};
export const createNewOutlet = async (payload) => {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/outlet-create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to create the outlet');
        }
};
export const fetchAllOutletsByUser = async (userId:number):Promise<UserOutlet[]> => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/user-outlet/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch outlets');
        }

        const result = await response.json();
        return result.data; // Resolve with the data
    } catch (e) {
        console.error('Error fetching outlets:', e);
        throw new Error(e.message || 'An error occurred while fetching outlets'); // Reject with a proper error message
    }
};
export const requestNewBulk = async (data):Promise<UserOutlet[]> => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/bulk-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to request new bulk');
        }

        const result = await response.json();
        return result.data; // Resolve with the data
    } catch (e) {
        console.error('Error requesting new bulk :', e);
        throw new Error(e.message || 'An error occurred while requesting a new bulk'); // Reject with a proper error message
    }
};
