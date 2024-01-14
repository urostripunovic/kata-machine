export default class ArrayList<T> {
    public length: number;
    private arr: Array<T | undefined>;
  
    constructor(size: number) {
        this.length = 0;
        this.arr = new Array(size).fill(undefined);
    }


    private resizeArr(start: number = 0) {
        const newArr = new Array(Math.floor(this.arr.length*0.6));
        for (let i = start; i < this.length; i++) {
            newArr[i] = this.arr[i-1];
        }
        this.arr = newArr;
    }

    prepend(item: T): void {
        this.length++;
        if (this.length > this.arr.length) {
            this.resizeArr(1);
            this.arr[0] = item;
            return;
        }

        for (let i = this.length; i > 0; i--) {
            this.arr[i] = this.arr[i-1];
        }
        this.arr[0] = item;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error('Index out of bounds');
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === this.arr.length) {
            this.append(item);
            return;
        }

        this.length++;
        if (this.length > this.arr.length) {
            this.resizeArr();
            for (let i = idx + 1; i < this.length; i++) {
                this.arr[i] = this.arr[i-1];
            }
            this.arr[idx] = item;
            return;
        } 
            
        for (let i = this.length; i > idx; i--) {
            this.arr[i] = this.arr[i-1];
        }
        this.arr[idx] = item;
    }

    append(item: T): void {
        this.length++;
        if (this.length > this.arr.length) {
            this.resizeArr();
            this.arr[this.length - 1] = item;
            return;
        }

        this.arr[this.length - 1] = item;
    }

    remove(item: T): T | undefined {
        this.length = Math.max(0, this.length - 1);
        let removedItem: T | undefined = undefined
        let shift_point = 0;
        for (; shift_point < this.length; shift_point++) {
            if (this.arr[shift_point] === item) {
                removedItem = item;
                break;
            }
        }

        for (let i = shift_point; i < this.length - 1; i++) {
            this.arr[i] = this.arr[i + 1];
        }

        return removedItem;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) {
            throw new Error('Index out of bounds');
        }
        return this.arr[idx];
    }
    
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) throw new Error('Index out of bounds');
        
        this.length = Math.max(0, this.length - 1);
        let removedItem: T | undefined = this.arr[idx];

        for (let i = idx; i < this.length + 1; i++) {
            this.arr[i] = this.arr[i+1];
        }

        return removedItem;
    }
}