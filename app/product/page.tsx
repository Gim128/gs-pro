import React from 'react';
import {fetchClient} from "@/lib/fetch-client";

const Page = async () => {
    let result = [];
    try {
        let response = await fetchClient(`${process.env.API_SERVER_BASE_URL}/product`, {
            method: "GET"
        });
        if (response.ok)
            result = await response.json();
    } catch (e) {
        console.log(e)
    }
    console.log(result);
    return (
        <div>
            this is product page
        </div>
    );
};

export default Page;
