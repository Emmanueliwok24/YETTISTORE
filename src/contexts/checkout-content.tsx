"use client"
import React, { useContext, ReactNode, useState } from "react"

const CheckoutDataContext = React.createContext({} as {
    data: CheckOutData;
    updateData: (arr: CheckOutData) => void
    clearData: () => void
})

export const useCheckOutContext = () => {
    return useContext(CheckoutDataContext)
}

interface CheckOutData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
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

    const clearData = () => {
        setData({} as CheckOutData)
    }
    return (
        <CheckoutDataContext.Provider value={{ data, updateData, clearData }}>
            {children}
        </CheckoutDataContext.Provider>
    )
}
