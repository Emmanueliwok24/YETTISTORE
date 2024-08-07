import { DataType } from "@/app/(main)/store/[id]/page";

const StoreCard = ({
    
    stores
}: { stores: DataType[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {stores.map((store) => ( */}
            <div className="grid place-content-center rounded bg-gray-100 aspect-[4/5] p-6 sm:p-8 border border-blue-400">
                <div className="mx-auto max-w-md text-center lg:text-left">
                    <header>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Watches</h2>
                        <p className="mt-4 text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas rerum quam amet
                            provident nulla error!
                        </p>
                    </header>
                    <a
                        href="#"
                        className="mt-8 inline-block rounded border border-gray-900 bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none focus:ring"
                    >
                        Shop All
                    </a>
                </div>
            </div>
            {/* ))} */}
        </div>

    );
}

export default StoreCard;