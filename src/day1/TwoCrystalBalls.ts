//Given two crystal balls that will break if dropped from high enough
//distance, determine the exact spot in which it will break in the most
//optimized way.
export default function two_crystal_balls(breaks: boolean[]): number {
    //This is the jump amount
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));    
    
    //This keeps track of the first crystal ball breaking point
    let i = jmpAmount;

    //This loop finds the first position for when the ball breaks
    while (i < breaks.length) {
        if (breaks[i]) break;
        i += jmpAmount;
    }

    //Apparently you can write a for loop like this as well, cool...
    //for (; i < breaks.length; i += jmpAmount) if (breaks[i]) break;

    //Jump to the last known previous position to see when the second ball breaks
    i -= jmpAmount;

    //Walk from the last known position towards when the first ball breaks
    //As we retrace our steps add those steps towards to total amount
    //There is a out of bounds condition 
    for (let j = 0; j <= jmpAmount && i < breaks.length; j++) {
        if (breaks[i+j]) return i+j;
    }

    return -1;
}