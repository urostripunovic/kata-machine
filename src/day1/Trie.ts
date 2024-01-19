type TrieNode = {
    value: string;
    isWord?: boolean;
    children: Array<TrieNode>;
}

export default class Trie {
    public head?: TrieNode;

    constructor() {
        this.head = { value: '', isWord: false, children: new Array(26) };
    }

    insert(item: string): void {        
        //loop through the word and insert each node as a child to the previous char in their corresponding index
        let curr = this.head as TrieNode;
        for (const c of item) {
            const idx = this.idx(c)
            if (curr?.children[idx]) {
                curr = curr.children[idx]
            } else {
                const newNode: TrieNode = { value: c, children: new Array(26) }
                curr.children[idx] = newNode;
                curr = newNode; 
            }
        }
        //set the word as true once the loop is done.
        curr.isWord = true;
    }

    delete(item: string): void {
        //a bit trickier, wikipedia has an example article
        this.deleteWord(item, this.head, 0)
    }

    private deleteWord(item: string, curr: TrieNode | undefined, depth: number): void {
        if (!curr) {
            return;
        }

        if (item.length === depth) {
            //console.log("before:",curr)
            if (curr.isWord) curr.isWord = false;
            if (!this.hasChildren(curr)) curr = undefined;
            //console.log("after:",curr)
            return;
        }

        //pre
        const idx = this.idx(item[depth]);
        depth++;
        //recursion
        this.deleteWord(item, curr.children[idx], depth)
        //post
        // delete the characters that are left behind
        if (!this.hasChildren(curr?.children[idx - 1]) && !curr?.isWord) {
            curr = undefined;
        }
    }

    private hasChildren(parent: TrieNode | undefined): boolean {
        for (const child in parent?.children) {
            if (child) {
                return true;
            }
        }
        return false;
    }

    find(partial: string): string[] {
        const curr = this.getNode(partial);
        //traverse, push all the words that have the flag set to true
        return this.dfs(curr, [], partial);
    }

    private getNode(item: string): TrieNode | undefined {
        if (!this.head) return undefined;

        let curr = this.head;
        for(const c of item) {
            const idx = this.idx(c);
            if (!curr?.children[idx]) {
                return undefined;
            }
            curr = curr.children[idx];
        }

        return curr;
    }

    private dfs(curr: TrieNode | undefined, res: string[], str: string): string[] {
        if (!curr) {
            return res;
        }

        if (curr.isWord) {
            res.push(str);
        }

        //Go through every character from the latest node
        for (let i in curr.children) {
            //pre
            const nextStr = str + curr.children[i].value;
            //call recursively
            this.dfs(curr.children[i], res, nextStr);
        }

        //post
        return res;
    }

    private idx(str: string): number {
        const zero = "a".charCodeAt(0);
        return str.charCodeAt(0) - zero;
    }
}