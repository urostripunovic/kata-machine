class Node<T> {
    public val: T;
    public next?: Node<T>;

    constructor(val: T) {
        this.val = val;
        this.next = undefined;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    public head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const newHead = new Node<T>(item);

        if(!this.head) {
            this.head = newHead;
        } else {
            newHead.next = this.head;
            this.head = newHead;
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) return;

        let current = this.head;
        let i = 0;
        while (i <= idx) {
            if (i === idx) {
                const newNode = new Node<T>(item);
                newNode.next = current?.next;
                current!.next = newNode;
                this.length++;
            }
            current = current?.next; 
            i++;
        }
    }

    append(item: T): void {
        const newNode = new Node<T>(item);
        if (!this.head) {
            this.head = newNode
        } else {
            let current = this.head;
            while (current?.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        if (this.head?.val === item) {
            const removedValue = this.head.val;
            this.head = this.head.next;
            this.length--;
            return removedValue;
        }

        let current = this.head;
        let prev: Node<T> | undefined = undefined;
        while (current) {
            if (current.val === item) {
                prev!.next = current.next;
                current.next = undefined;
                this.length--;
                return current.val;
            }
    
            prev = current;
            current = current.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx > this.length) return undefined;

        let current = this.head;
        let i = 0;
        while(i < idx) {
            current = current?.next;
            i++;
        }
        return current?.val;
    }

    removeAt(idx: number): T | undefined {
        if (idx > this.length) return undefined;

        let current = this.head;
        let prev: Node<T> | undefined = undefined;
        let i = 0;
        if (idx === 0) {
            this.head = this.head?.next;
        } else {
            while (i < idx) {
                prev = current;
                current = current?.next;
                i++
            }
            prev!.next = current?.next;
            current!.next = undefined;
        }
        this.length--;
        return current?.val;
    }
}