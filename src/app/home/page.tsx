"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import React from 'react'

const page = () => {
    const triggerError = () => {
        throw new Error("something went wrong!")
    }
    return (
        <button onClick={triggerError}>
            client Error
        </button>
    )
}

export default page