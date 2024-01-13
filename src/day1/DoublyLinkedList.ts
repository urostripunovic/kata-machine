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
        if (!this.head) {
            this.head = new_head;
            this.tail = new_head;
        } else {
            new_head.next = this.head;
            this.head.prev = new_head;
            this.head = new_head;
        }
        this.length++;
    }
    
    insertAt(item: T, idx: number): void {
        if (idx > this.length) return;
        const new_node = new Node<T>(item);
        if (idx === 0) {
            new_node.next = this.head;
            this.head!.prev = new_node;
            this.head = new_node;
        } else {
            let current = this.head;
            //I want prev nodes next and curr nodes prev
            for (let i = 0; i < idx && current; i++) {
                current = current.next
            }
            new_node.next = current;
            new_node.prev = current?.prev;
            current!.prev!.next = new_node;
            current!.prev = new_node;
        }

        this.length++;
    }

    append(item: T): void {
        const new_node = new Node<T>(item);
        if (!this.head) {
            this.head = new_node;
            this.tail = new_node;
        } else{
            new_node.prev = this.tail;
            this.tail!.next = new_node;
            this.tail = new_node;
        } 
        this.length++;
    }

    remove(item: T): T | undefined {
        let current = this.head;
        while (current) {
            if (item === current.val) {
                if (!current.prev) {
                    this.head = current.next;
                } else {
                    current.prev.next = current.next;
                    if (current.next) {
                        current.next.prev = current.prev;
                    } else {
                        this.tail = current.prev;
                    }
                }
                this.length--;
                return current.val;
            }
            current = current.next;
        }
        return undefined
    }

    get(idx: number): T | undefined {
        //console.log(this.head)
        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current?.next;
        }
        return current?.val;
    }

    removeAt(idx: number): T | undefined {
        if (idx > this.length) return undefined;
        let current = this.head;

        if (idx === 0) {
            this.head = this.head?.next;
            if (this.head) {
                this.head.prev = undefined;
            } else {
                this.tail = undefined;
            }
        } else {
            for (let i = 0; i < idx; i++) {
                current = current?.next;
            }
            if (current) {
                if (current.prev) current.prev.next = current?.next;
                if (current.next) {
                    current.next.prev = current?.prev;
                } else {
                    this.tail = current.prev;
                }
            }
        }
        this.length--;
        return current?.val

    }
}