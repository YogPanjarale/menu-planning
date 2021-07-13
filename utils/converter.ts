// function to convert joules to calories
// from https://github.com/jhollingworth/joules.js

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