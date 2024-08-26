import HomeStoreLink from "@/components/home-store-link";
import Image from "next/image";
import { redirect } from "next/navigation";


const page = () => {
  return (

    <div className="mx-auto max-w-screen-xl text-center grid">
      <p id="normal">Please, kindly paste <b>Store Name</b> In the <b>Search bar correctly</b> | <b>and make sure you are registered as a buyer</b></p>
      <div className=" w-100">
        <HomeStoreLink />
      </div>
    </div>
  )
}

export default page;