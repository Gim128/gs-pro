'use server';

import {fetchClient} from "@/lib/fetch-client";
import {Outlet, UserOutlet} from "@/types/Types";
import {revalidatePath} from "next/cache";

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
export const fetchAllBulkRequests = async ():Promise<Outlet[]> => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/bulk-request`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch request');
        }

        const result = await response.json();
        return result.data; // Resolve with the data
    } catch (e) {
        console.error('Error fetching outlets:', e);
        throw new Error(e.message || 'An error occurred while fetching requests'); // Reject with a proper error message
    }
};

export const updateBulkRequestStatus = async ({id, status}: {id: number, status: string}) => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/bulk-request/${id}/status?status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to update request status');
        }

        const result = await response.json();
        revalidatePath('dashboard/hd/stock/bulk-request')
        return result; // Resolve with the data
    } catch (e) {
        console.error('Error updating request status:', e);
        throw new Error(e.message || 'An error occurred while updating request status'); // Reject with a proper error message
    }
};

export const getOutletBulkRequests = async (outletId:number) => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/bulk-request/outlet/${outletId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch request');
        }

        const result = await response.json();
        return result.data; // Resolve with the data
    } catch (e) {
        console.error('Error updating request status:', e);
        throw new Error(e.message || 'An error occurred while updating request status'); // Reject with a proper error message
    }
};
export const addOutletTokenStatus = async (outletId:number,requestId:number,availableCount:number,path:string) => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/bulk-request/status?outletId=${outletId}&bulkRequestId=${requestId}&availableCount=${availableCount}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch request');
        }

        const result = await response.json();
        revalidatePath(path)
        return result; // Resolve with the data
    } catch (e) {
        console.error('Error updating request status:', e);
        throw new Error(e.message || 'An error occurred while updating request status'); // Reject with a proper error message
    }
};
