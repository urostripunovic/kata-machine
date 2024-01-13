type Node<T> = {
    val: T;
    next?: Node<T>;
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const new_node: Node<T> = { val: item };
        if (!this.tail) {
            this.tail = this.head = new_node;
        }
        
        this.tail.next = new_node;
        this.tail = new_node;
        this.length++;
    }
    deque(): T | undefined {
        if (!this.head) return undefined;

        const current_head = this.head;
        this.head = this.head.next;
        current_head.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }

        this.length--;
        return current_head.val;
    }
    peek(): T | undefined {
        return this.head?.val;
    }
}