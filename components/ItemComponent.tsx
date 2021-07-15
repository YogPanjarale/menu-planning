import { toKclCalories } from "../utils/converter";
import { ItemProperty } from "../pages/home";

export function ItemComponent(props) {
	return (
		<div className="border-2 bg-gray-50 border-gray-200 p-2 m-2 flex flex-col">
			<div>
				<p className="text-lg">{props.r.name}</p>
				<p className="text-xs">{props.r.grup}</p>
			</div>
			<div className="flex w-full flex-wrap mt-4 mb-8 content-center">
				<ItemProperty
					name="Calories"
					value={toKclCalories(props.r.enerc)}
					unit="Kcal" />
				<ItemProperty
					name="Protien"
					value={props.r.protcnt.toFixed(2)}
					unit="g" />
				<ItemProperty
					name="Total Fat"
					value={props.r.fatce.toFixed(2)}
					unit="g" />
				<ItemProperty
					name="Carbohydrate"
					value={props.r.choavldf.toFixed(2)}
					unit="g" />
				<ItemProperty
					name="Dietary Fiber"
					value={props.r.fibtg.toFixed(2)}
					unit="g" />
				<ItemProperty
					name="Vitamin A"
					value={Math.round(props.r.vita * 1000000)}
					unit="ug" />
				<ItemProperty
					name="Vitamin C"
					value={(props.r.vitc * 1000).toFixed(2)}
					unit="mg" />
				<ItemProperty
					name="Iron"
					value={(props.r.fapu * 10).toFixed(2)}
					unit="mg" />
				<ItemProperty
					name="Calcium"
					value={(props.r.ca * 1000).toFixed(2)}
					unit="mg" />
				<ItemProperty
					name="Folic Acid"
					value={(props.r.folsum * 1000000).toFixed(2)}
					unit="ug" />
				<ItemProperty
					name="Soduim"
					value={(props.r.na * 1000).toFixed(2)}
					unit="mg" />
				<ItemProperty
					name="Potassium"
					value={(props.r.k * 1000).toFixed(0)}
					unit="mg" />
			</div>
		</div>
	);
}