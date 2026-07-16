"use client";
import { useState } from 'react'
import React from 'react'

const page = () => {
    const [loading, setloading] = useState(false);
    
    const handleblocking = async () => {
        setloading(true);
        await fetch("api/chat", { method: "POST" });
        setloading(false);
    };

    return (
        <div>
            <div className='flex justify-center itme-center mt-100'>
                <button disabled={loading} onClick={handleblocking} className="gradient-btn">{loading ? "Loading..." : "Blocking"}</button>
                <div>
                    <button className="gradient-btn">non-blocking</button>
                </div>
            </div>
        </div>
    )
}

export default page