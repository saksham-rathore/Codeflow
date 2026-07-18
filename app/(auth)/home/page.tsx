"use client";
import { error } from 'console';
import { useState } from 'react'
import React from 'react'

const page = () => {
    const [loading, setloading] = useState(false);
    const [loading2, setloading2] = useState(false);

    const handleblocking = async () => {
        setloading(true);
        await fetch("api/blocking", { method: "POST" });
        setloading(false);
    };

    const handleblocking2 = async () => {
        setloading2(true);
        await fetch("api/background", { method: "POST" });
        setloading2(false);
    };

    const handleClientError = () => {
        throw new Error("Client error: Something Went Wrong in the browser!")
    };

    const handleApiError = async () => {
        await fetch("api/background", { method: "POST" });
    };

    const handleInggestError = async () => {
        await fetch("app/inngest")
    };

    return (
        <div>
            <div className='flex justify-center itme-center mt-100'>
                <button disabled={loading} onClick={handleblocking} className="gradient-btn">{loading ? "Loading..." : "Blocking"}</button>
            </div>
            <div className='flex justify-center itme-center mt-100'>
                <button disabled={loading} onClick={handleblocking2} className="gradient-btn">{loading2 ? "Loading..." : "background"}</button>
            </div>
            <div className='flex justify-center itme-center mt-100'>
                <button
                    onClick={handleClientError}
                    className='gradient-btn'>
                    Client Error
                </button>
            </div>
        </div>
    )
}

export default page