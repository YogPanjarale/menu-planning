import { useState } from "react";
import { mapToValue, toKclCalories } from "../utils/converter";
import { IItem } from "../utils/types";
import JSONb from 'json-bigint'
function ItemProperty(props:{name:string,value:string|number,unit:string}): JSX.Element {
	return (
		<p className="text-sm p-1">
			<span className="font-bold">{props.name}</span>{" "}
			{props.value} {props.unit}
		</p>
	);
}

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");
    const [amount, setAmount] = useState(100)
	const [results, setResults] = useState<IItem[]>([]);
	//do a fetch reques to /compositon
	const fetchResults = async (searchTerm: string) => {
		const response = await fetch("/api/composition?term=" + searchTerm);
		const text= await response.text();
		const json = JSON.parse(text);
		setResults(json.map(r => {
			//vitamin b12,
			r.vitc= mapToValue(r.vitc,amount);
			r.fapu=mapToValue(r.fapu,amount);
			r.vita = mapToValue(r.vita,amount);
            r.enerc= mapToValue(r.enerc,amount);
            r.protcnt=mapToValue(r.protcnt,amount);
            r.fatce=mapToValue(r.fatce,amount);
            r.choavldf=mapToValue(r.choavldf,amount);
            r.fibtg = mapToValue(r.fibtg, amount);
            console.log(r)
            return r
        }) );
       
	};
	//when the search term changes, do a fetch of the results
	const onSearchTermChange = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		fetchResults(searchTerm);
	};
    const onAmountChange = (amount: number) => {
        setAmount(amount);
    };
	return (
		<div className="p-2">
            <div>
			<input
            placeholder="Search for food items ..."
				type="text"
				value={searchTerm}
				onChange={(e) => {
					onSearchTermChange(e.target.value);
				}}
				className="m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400 w-4/12 py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none "
                id="search text"
			/>
			<input
            placeholder="amount in gma"
				type="number"
				value={amount}
				onChange={(e) => {
					onAmountChange(parseInt(e.target.value));
				}}
				className="m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400 w-4/12 py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none "
                id="search text"
			/>
			<button
			className="m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400 w-16 py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none "
			onClick={() => {fetchResults(searchTerm)}}
			>Search</button>
            </div>
			{/* <h1>Home</h1> */}
			{results.map((r,i) => (
				<div className="border-2 bg-gray-50 border-gray-200 p-2 m-2 flex flex-row" key={i}>
					<div>
						<p className="text-lg">{r.name}</p>
						<p className="text-xs">{r.grup}</p>
					</div>
					<div className="flex w-full flex-wrap mt-4 mb-8 content-center">
						<ItemProperty name='Calories' value={toKclCalories( r.enerc)} unit="Kcal"/>
                        <ItemProperty name="Protien" value={r.protcnt} unit="g"/>
                        <ItemProperty name="Total Fat" value={r.fatce} unit="g"/>
                        <ItemProperty name='Carbohydrate' value={r.choavldf}unit='g'/>
						<ItemProperty name='Dietary Fiber' value={r.fibtg} unit='g'/>
						<ItemProperty name='Vitamin A' value={(r.vita*1000000)} unit='ug'/>
						<ItemProperty name='Vitamin C' value={(r.vitc*1000)} unit='mg'/>
						<ItemProperty name='Iron' value={(r.fapu*10).toFixed(2)} unit='mg'/>
					</div>
				</div>
			))}
		</div>
	);
}
