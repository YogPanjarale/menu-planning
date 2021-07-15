import { useState } from "react";
import { mapAmount, mapToValue } from "../utils/converter";
import { IItem, ListItem } from "../utils/types";
import Head from "next/head";
import { getSearchData } from "../utils/search";
import { ItemComponent } from "../components/ItemComponent";
import { EmptyItem } from "../utils/emptyItem";
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
	const [mode, setMode] = useState<"search" | "list">("search");
const [total, setTotal] = useState<ListItem>({amount:0, item:EmptyItem,itemName:""})
	const [list, setList] = useState<ListItem[]>([]);
	// const
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
				return mapAmount(r, amount);
			})
		);
	};
	//when the search term changes, do a fetch of the results
	const onSearchTermChange = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		fetchResults(searchTerm);
	};
	const onAmountChange = (amount: number) => {
		setAmount(amount);
	};
	const addItem = (item: IItem, amount: number) => {
		const has = list.some(
			(i) => i.itemName === item.name && i.amount === amount
		);
		if (!has) {
			list.push({ item, amount, itemName: item.name });
			setList(list);
		}
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
					className=" w-20 m-2 pl-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400  py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none "
					onClick={() => {
						fetchResults(searchTerm);
					}}
				>
					Calculate
				</button>
				<button
					className=" m-2 px-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400  py-2 text-left text-black-400 bg-transparent rounded-md focus:outline-none "
					onClick={() => {
						setMode(mode == "search" ? "list" : "search");
					}}
				>
					Mode: {mode}
				</button>
			</div>

			{mode == "search"
				? results.map((r, i) => {
						return (
							<ItemComponent
								key={i}
								r={r}
								onAdd={() => {
									addItem(r, amount);
									console.log("hello world");
								}}
							/>
						);
				  })
				: Array.from(list).map((r, i) => {
						return (
							<ItemComponent
								key={i}
								r={r.item}
								onAdd={() => {
									// console.log('hello world')
								}}
							/>
						);
				  })}
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
