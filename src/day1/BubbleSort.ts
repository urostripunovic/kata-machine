export default function bubble_sort(arr: number[]): void {
    //My own implementation
    /*let len = arr.length;
    for (let i = 0; i < len; i++) {
        const v = arr[i];
        if (v < arr[i+1]) continue;
        //Forgot the i part, didn't know how to make len shorter 
        //but it becomes shorter 'cos of i ano not the swap 
        for (let j = i; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                const temp = arr[j+1];
                arr[j+1] = arr[j]
                arr[j] = temp;
            }
        }
    }*/
    //Prime implementation
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                const temp = arr[j+1];
                arr[j+1] = arr[j]
                arr[j] = temp;
            }
        }
    }
}