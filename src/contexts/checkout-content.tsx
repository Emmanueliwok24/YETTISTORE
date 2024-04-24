"use client"
import React, { useContext, ReactNode, useState } from "react"

const CheckoutDataContext = React.createContext({} as {
    data: CheckOutData;
    updateData: (arr: CheckOutData) => void
})

export const useCheckOutContext = () => {
    return useContext(CheckoutDataContext)
}

interface CheckOutData {
    name: string;
    email: string;
    phone: string;
    address: string;
    state: string,
    country: string;
}

export const CheckOutDataProvider = ({ children }: {
    children: ReactNode
}) => {
    const [data, setData] = useState({} as CheckOutData)
    const updateData = (arr: CheckOutData) => {
        setData(arr)
    }
    return (
        <CheckoutDataContext.Provider value={{ data, updateData }}>
            {children}
        </CheckoutDataContext.Provider>
    )
}
