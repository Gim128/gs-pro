'use server'

import {fetchClient} from "@/lib/fetch-client";

export const fetchAllEmployees = async () => {
    try {
        const response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/v1/employee`, {
            method: "GET",
        });

        console.log(response,'this is response')
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errorMessage || 'Failed to fetch Employees');
        }

        const result = await response.json();
        console.log(result, 'Result');
        return result;
    } catch (e) {
        console.error('Error fetching districts:', e);
        throw new Error(e.message || 'An error occurred while fetching Employees');
    }
};
