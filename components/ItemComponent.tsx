import { toKclCalories } from "../utils/converter";
import { ItemProperty } from "../pages/home";
import { IItem } from "../utils/types";

export function ItemComponent(props:{r:IItem, onClick?:()=>void,amount?:number,action?:string}): JSX.Element {
	return (
		<div className="border-2 bg-gray-50 border-gray-200 p-2 m-2 flex flex-col rounded-lg">
			<div className="flex flex-row">
				<div>
					<p className="text-lg">{props.r.name}</p>
					<p className="text-xs">{props.r.grup}</p>
				</div>
					{props.amount?<p className="text-xs">{props.amount} g</p>:null}

				{props.onClick?
				<button className='m-2 px-1 border-2 transition duration-500 placeholder-black-400 focus:placeholder-transparent border-black-400  py-1 text-left text-black-400 bg-transparent rounded-md focus:outline-none' onClick={props.onClick}>
				{props.action}
				</button>:null
				}
			</div>
			<div className="flex w-full flex-wrap mt-4 mb-2 content-center">
				<ItemProperty
					name="Calories"
					value={toKclCalories(props.r.enerc)}
					unit="Kcal"
				/>
				<ItemProperty
					name="Protien"
					value={props.r.protcnt.toFixed(2)}
					unit="g"
				/>
				<ItemProperty
					name="Total Fat"
					value={props.r.fatce.toFixed(2)}
					unit="g"
				/>
				<ItemProperty
					name="Carbohydrate"
					value={props.r.choavldf.toFixed(2)}
					unit="g"
				/>
				<ItemProperty
					name="Dietary Fiber"
					value={props.r.fibtg.toFixed(2)}
					unit="g"
				/>
				<ItemProperty
					name="Vitamin A"
					value={Math.round(props.r.vita * 1000000)}
					unit="ug"
				/>
				<ItemProperty
					name="Vitamin C"
					value={(props.r.vitc * 1000).toFixed(2)}
					unit="mg"
				/>
				<ItemProperty
					name="Iron"
					value={(props.r.fapu * 10).toFixed(2)}
					unit="mg"
				/>
				<ItemProperty
					name="Calcium"
					value={(props.r.ca * 1000).toFixed(2)}
					unit="mg"
				/>
				<ItemProperty
					name="Folic Acid"
					value={(props.r.folsum * 1000000).toFixed(2)}
					unit="ug"
				/>
				<ItemProperty
					name="Soduim"
					value={(props.r.na * 1000).toFixed(2)}
					unit="mg"
				/>
				<ItemProperty
					name="Potassium"
					value={(props.r.k * 1000).toFixed(0)}
					unit="mg"
				/>
			</div>
		</div>
	);
}
