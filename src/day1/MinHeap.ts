export default class MinHeap {
    public length: number;
    private data: number[];
    

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) return -1;

        const out = this.data[0];
        if (this.length === 1) {
            this.length--;
            this.data = [];
            return out;
        }

        this.length--;

        //const deleted_item = this.data[0];
        //const last_item = this.data.pop() as number;
        //this.data[0] = last_item;
        this.data[0] = this.data[this.length];

        this.heapifyDown(0);
        
        return out;
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }

        const leftIndex = this.leftChild(idx);
        const rightIndex = this.rightChild(idx);

        if (leftIndex >= this.length) return;        
        if (rightIndex >= this.length) return;
        
        const leftChildValue = this.data[leftIndex];
        const rightChildValue = this.data[rightIndex];
        const currentValue = this.data[idx];

        if (leftChildValue > rightChildValue && currentValue > rightChildValue) {
            this.swap(idx, rightIndex)
            this.heapifyDown(rightIndex);
        } else if (rightChildValue > leftChildValue && currentValue > leftChildValue) {
            this.swap(idx, leftIndex)
            this.heapifyDown(leftIndex);
        }

        //iterative approach
        /*for (let i = idx; i < this.length;) {
            const leftIndex = this.leftChild(i);
            const rightIndex = this.rightChild(i);

            if (leftIndex >= this.length) break;
            if (rightIndex >= this.length) break;

            const leftChildValue = this.data[leftIndex];
            const rightChildValue = this.data[rightIndex];
            const currentValue = this.data[i];

            if (leftChildValue < rightChildValue && currentValue > leftChildValue) {
                this.swap(i, leftIndex)
                i = leftIndex;
            } else if (rightChildValue < leftChildValue && currentValue > rightChildValue) {
                this.swap(i, rightIndex);
                i = rightIndex
            }
        }*/
    }

    private heapifyUp(idx: number): void {
        //iterative approach to heapifyUp
        /*if(idx === 0) return;

        for (let i = idx; i > 0; i--) {
            const parentIdx = Math.floor((i-1)/2)

            if (this.data[i] >= this.data[parentIdx]) break;
            
            this.swap(i, parentIdx);
            i = parentIdx;
        }*/

        if (idx === 0) return;
        
        const parent = this.parent(idx);
        const parentValue = this.data[parent];
        const currentValue = this.data[idx];

        if (parentValue > currentValue) {
            this.swap(idx, parent)
            this.heapifyUp(parent);
        }
    }
    
    private swap(index1: number, index2: number): void {
        [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]]
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1)/2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}