type Node<T> = {
    val: T,
    prev?: Node<T>;
}
export default class Stack<T> {
    public length: number;
    private head?: Node<T>;    

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node: Node<T> = { val: item }
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }
        
        node.prev = this.head 
        this.head = node;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (this.length === 0) {
            const head = this.head;
            this.head = undefined;
            return head?.val;
        }
        
        const head = this.head;
        this.head = this.head?.prev
        head!.prev = undefined
        return head?.val;
    }
    peek(): T | undefined {
        return this.head?.val;
    }
}