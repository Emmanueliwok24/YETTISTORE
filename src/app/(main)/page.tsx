import HomeStoreLink from "@/components/home-store-link";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = () => {
  return (

    <div className="mx-auto max-w-screen-xl text-center">
      <p id="normal">Please, kindly paste <b>Store Link</b> In the <b>URL bar</b> / <b>SEARCH bar correctly</b> and make sure you are registered as a buyer</p>
      <div className=" w-100">
        <HomeStoreLink />
      </div>
    </div>
  )
}

export default page;