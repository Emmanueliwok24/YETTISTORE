import Image from "next/image";
import { redirect } from "next/navigation";

const page = () => {
  return (

    <div className="mx-auto max-w-screen-xl text-center">
      <p id="normal">Please, kindly paste <b>Store Link</b> In the <b>URL bar</b> / <b>SEARCH bar</b></p>
      <div className=" w-100">
      <Image src='/url.png' width='1200' height='400' className="W-100 mt-5  mx-auto " alt="image"/>

      </div>
    </div>
  )
}

export default page;