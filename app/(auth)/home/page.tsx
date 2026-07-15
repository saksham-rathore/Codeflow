"use client";
import { useState } from 'react'
import React from 'react'

const page = () => {
    const handleblocking = async () => {
        await fetch("api/chat", { method: "POST" });
    }
    const [loading, setloading] = useState("")
    // setloading("false")
    return (
        <div>
            <button onClick={handleblocking} className="gradient-btn">Click Me</button>
        </div>
    )
}

export default page