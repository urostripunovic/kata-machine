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
    public tail?: Node<T>;
    

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const new_head = new Node<T>(item);
        this.length++;
        if (!this.head) {
            this.head = this.tail = new_head;
            return
        }
        new_head.next = this.head;
        this.head.prev = new_head;
        this.head = new_head;

    }
    
    insertAt(item: T, idx: number): void {
        if (idx > this.length) { 
            throw new Error('idx is longer than the list itself')
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item)
            return;
        }
        
        let current = this.getAt(idx);;
        this.length++;

        const new_node = new Node<T>(item);
        new_node.next = current;
        new_node.prev = current?.prev;
        current!.prev = new_node;
        
        if (new_node?.prev) {
            new_node.prev.next = new_node;
        }

    }

    append(item: T): void {
        const new_node = new Node<T>(item);
        this.length++;

        if (!this.tail) {
            this.head = this.tail = new_node;
            return;
        } 
        new_node.prev = this.tail;
        this.tail!.next = new_node;
        
        this.tail = new_node;
    }

    remove(item: T): T | undefined {
        let current = this.head;
        for (let i = 0; i < this.length && current; i++) {
            if (current.val === item) break;
            current = current.next
        }

        if (!current) return undefined;
        
        return this.removeNode(current);
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.val;
    }
    
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        if (!node) return undefined;

        return this.removeNode(node)
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const out = this.head?.val
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        
        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined

        return node.val;
    }

    private getAt(idx: number): Node<T>  | undefined {
        let current = this.head;
        for (let i = 0; i < idx && current; i++) {
            current = current?.next;
        }
        return current;
    }
}