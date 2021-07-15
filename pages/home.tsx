import { useState } from "react";
import { mapToValue } from "../utils/converter";
import { IItem } from "../utils/types";
import Head from "next/head";
import { getSearchData } from "../utils/search";
import { ItemComponent } from "../components/ItemComponent";
export function ItemProperty(props: {
	name: string;
	value: string | number;
	unit: string;
}): JSX.Element {
	return (
		<p className="text-sm p-1">
			<span className="font-bold">{props.name}</span> {props.value}{" "}
			{props.unit}
		</p>
	);
}

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const [amount, setAmount] = useState(100);
	const [results, setResults] = useState<IItem[]>([]);
	const [lastSearched, setLastSearched] = useState(Date.now());
	const [mode, setMode] = useState<"search"|"list">("search")
	//do a fetch reques to /compositon
	const fetchResults = async (searchTerm: string) => {
		// const json = await getSearchData(searchTerm);
		const response = await fetch("/api/composition?term=" + searchTerm);
		const text = await response.text();
		const json = JSON.parse(text, (key, value) => {
			// console.log(value)
			if (typeof value === "number") {
				return value;
			}
			return value;
		});
		setResults(
			json.map((r) => {
				//vitamin b12,
				r.vitc = mapToValue(r.vitc, amount);
				r.fapu = mapToValue(r.fapu, amount);
				r.vita = mapToValue(r.vita, amount);
				r.enerc = mapToValue(r.enerc, amount);
				r.protcnt = mapToValue(r.protcnt, amount);
				r.fatce = mapToValue(r.fatce, amount);
				r.choavldf = mapToValue(r.choavldf, amount);
				r.fibtg = mapToValue(r.fibtg, amount);
				r.ca = mapToValue(r.ca, amount);
				r.folsum = mapToValue(r.folsum, amount);
				r.na = mapToValue(r.na, amount);
				r.k = mapToValue(r.k, amount);
				// console.log(r)
				return r;
			})
		);
	};
	//when the search term changes, do a fetch of the results
	const onSearchTermChange = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		// setTimeout(() => {
		// 	const diff=(Date.now()-lastSearched)
		// 	console.log(diff)
		// 	if(diff>1000) {
		// 		fetchResults(searchTerm);
		// 		setLastSearched(Date.now())
		// 	}
		// 	// fetchResults(searchTerm);
		// }, 1000);
		fetchResults(searchTerm);
	};
	const onAmountChange = (amount: number) => {
		setAmount(amount);
	};
	return (
		<div className="p-2">
			<h1 className="text-2xl font-bold text-gray-600 text-center my-1">
				Nutritive Value Calculator
			</h1>
			<input
				placeholder="Search for food items ..."
				type="text"
				value={searchTerm}
				onChange={(e) => {
					onSearchTermChange(e.target.value);
				}}
				className="m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400 w-4/5 py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none  "
				id="search text"
			/>
			<p className="text-xs ml-2 text-gray-600">
				Weight of item in grams
			</p>
			<div className="flex flex-row">
				<input
					placeholder="amount in gram"
					type="number"
					value={amount}
					onChange={(e) => {
						onAmountChange(parseInt(e.target.value));
					}}
					className="m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400 w-20 py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none"
					id="amount"
				/>
				<button
					className="m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400 w-20 py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none "
					onClick={() => {
						fetchResults(searchTerm);
					}}
				>
					Calculate
				</button>
			</div>
			{/* <h1>Home</h1> */}
			{results.map((r, i) => (
				<ItemComponent key={i} r={r}/>
			))}
			<div className=" text-center mt-auto">
				<p className="text-gray-800">
					{" "}
					Made by{" "}
					<a
						href="https://github.com/YogPanjarale"
						className="text-gray-900"
					>
						@Yog Panjarale
					</a>
				</p>
			</div>
		</div>
	);
}
