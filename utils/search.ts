import { IItem } from "./types";

// a function which fetches data from /composion.json and return it as an object
export async function getSearchData(term: string) {
    let data=[] as IItem[];
    if(localStorage.getItem('data')==null){
        const composition = await fetch("/composition.json").then(response => response.json());
        localStorage.setItem('data', JSON.stringify(composition));
        const dataStr = localStorage.getItem('data');
        const dataObj = JSON.parse(dataStr, (key, value) => typeof value =='number'?value:value);
        for (const item of dataObj) {
            if (item.name.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                data.push(item);
            }
        }
    }else{
        const dataObj = JSON.parse(localStorage.getItem('data'), (key, value) => typeof value =='number'?value:value);
        for (const item of dataObj) {
            const compare = (a:string,b:string=term)=>a.replace(/\s+/g,' ').toLowerCase().indexOf(b.toLowerCase()) > -1;
            const doesName = compare(item.name);
            const doesLang = compare(item.lang);
            const doesGroup = compare(item.grup)
            if (doesName ||doesLang ||doesGroup) {
                data.push(item);
            }
        }
    }
    //sort data by name
    data.sort((a, b) => a.name.localeCompare(b.name));
    // console.log(data)
    return data;
}