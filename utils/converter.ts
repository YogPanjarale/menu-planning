// function to convert joules to calories
// from https://github.com/jhollingworth/joules.js

export function toKclCalories(kalJoules: number): number {
  return parseFloat((kalJoules / 4.184).toFixed(2));
}

export function mapToValue(amount: number,weight:number ){
    if (typeof amount !== 'number'){
        return null
    }
    const r=parseFloat((weight*(amount/100)).toFixed(2));
    if (r==NaN){
      return 0
    }

    return r;
}