import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CountriesSelect = ({ userCheckoutInput }: {
    userCheckoutInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
    const { data, isLoading } = useQuery({
        queryKey: ["countries"],
        queryFn: async () => {
            const { data } = await axios.get("https://restcountries.com/v3.1/all");
            return data;
        }
    });


    return (
        <div className="mt-4">
            <label htmlFor="country" className="block px-2"> Country</label>
            {
                isLoading ? <p className="p-2 text-center text-indigo-600">Loading...</p> : (
                    <select id="country" name="country"
                        onChange={userCheckoutInput}
                        className="border block mt-2 w-full rounded p-2" defaultValue="1">
                        <option disabled value="1">-- Select --</option>
                        {
                            data.map((country: any) => (
                                <option key={country.cca2} value={country.name.common}>{country.name.common}</option>
                            ))
                        }
                    </select>
                )
            }
        </div>
    );
}

export default CountriesSelect;