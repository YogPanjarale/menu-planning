import { NextApiRequest, NextApiResponse } from "next";
import compositions from "@ifct2017/compositions";
(async () => {
	await compositions.load();
	console.log("Composition Loaded");
})();
export default function compositionAPI(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const term:string = req.query.term as string ??"";
	if (term.length<=1){
		return res.status(200).json([])
	}
    // console.log(req.query)
	res.status(200).json(compositions(term));
}
