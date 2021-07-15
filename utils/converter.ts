// function to convert joules to calories
// from https://github.com/jhollingworth/joules.js

import { IItem } from "./types";

export function toKclCalories(kalJoules: number): number {
  return parseFloat((kalJoules / 4.184).toFixed(2));
}

export function mapToValue(amount: number,weight:number ){
  // console.log(weight)
    if (typeof amount !== 'number'){
        return null
    }
    const r=((weight*(amount/100)));
    if (r==NaN){
      return 0
    }

    return r;
}
export const mapAmount=(r:IItem,amount:number) => {
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
}