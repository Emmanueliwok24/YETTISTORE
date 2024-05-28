"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const HomeStoreLink = () => {
    const router = useRouter()
    const [storeLink, setStoreLink] = useState('') as [string, Function]
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (storeLink) {
            router.push(`/store/${storeLink}`)
        }
    }

    return (
        <form className="w-100 mt-5 mx-auto flex"
            onSubmit={handleFormSubmit}
        >
            <input type="text" className="block border-[#333] outline-none border w-4/5 mx-auto p-4" placeholder="Paste Store Link Here"
                defaultValue={storeLink}
                onChange={(e) => setStoreLink(e.target.value)}
            />
            <button className="bg-slate-900 text-white p-3 flex-1">Go</button>
        </form>
    )
}

export default HomeStoreLink

