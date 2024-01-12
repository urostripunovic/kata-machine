class Node<T> {
    public val: T;
    public next?: Node<T>;
    public prev?: Node<T>;

    constructor(val: T) {
        this.val = val;
        this.next = undefined;
        this.prev = undefined;
    }
}

export default class DoublyLinkedList<T> {
    public length: number;
    public head?: Node<T>;
    

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    prepend(item: T): void {

    }
    
    insertAt(item: T, idx: number): void {

    }

    append(item: T): void {

    }

    remove(item: T): T | undefined {

    }

    get(idx: number): T | undefined {

    }

    removeAt(idx: number): T | undefined {

    }
}