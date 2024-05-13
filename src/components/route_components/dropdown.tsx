"use client"

import { LucideCheck, LucideEdit } from "lucide-react";
import Link from "next/link";
import { useState } from "react"
import { toast } from "sonner";

interface DropDownProps {
    disabled?: boolean;
    title: string;
    content: React.ReactNode
    enabled?: boolean
    edit: string
}

const DropDown = ({ disabled, title, content, enabled, edit }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(enabled)

    const OpenDropDown = () => {
        if (disabled) return
        setIsOpen(!isOpen)
    }

    return (
        <div className="border-b border-gray-500">
            <div className="cursor-pointer p-6"
                onClick={OpenDropDown}
            >
                <h3 className={`font-semibold select-none flex items-center gap-3 ${disabled ? "text-gray-400" : "text-white"}`}>
                    {disabled && <LucideCheck />}
                    {title}
                    {edit && <Link href={edit} className="text-gray-500 ml-auto">
                        <LucideEdit size={20} />
                    </Link>}
                </h3>
            </div>
            <div className={`duration-300 ease-in-out overflow-hidden px-6  ${isOpen ? "h-auto py-6" : "h-0"}`}>
                {
                    content
                }
            </div>
        </div >
    )
}

export default DropDown;