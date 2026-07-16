"use client";
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
        setloading(true);
        await fetch("api/background", { method: "POST" });
        setloading(false);
    };

    return (
        <div>
            <div className='flex justify-center itme-center mt-100'>
                <button disabled={loading} onClick={handleblocking} className="gradient-btn">{loading ? "Loading..." : "Blocking"}</button>
                <button disabled={loading} onClick={handleblocking2} className="gradient-btn">{loading ? "Loading..." : "background"}</button>
            </div>
        </div>
    )
}

export default page