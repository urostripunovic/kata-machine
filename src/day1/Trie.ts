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

    }

    find(partial: string): string[] {
        const curr = this.getNode(partial);
        //traverse, push all the words that have the flag set to true
        return this.dfs(curr, [], partial);
    }

    private getNode(partial: string): TrieNode | undefined {
        let curr = this.head;

        for(const c of partial) {
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

        //Go through every character from the latest node
        for (let i = 0; i < curr.children.length; i++) {
            if (curr.children[i]) {
                const nextStr = str + curr.children[i].value;
                if (curr.children[i].isWord) {
                    res.push(nextStr);
                }
                //call recursively
                this.dfs(curr.children[i], res, nextStr);
            }
        }
        console.log(res)
        return res;
    }

    private idx(str: string): number {
        const zero = "a".charCodeAt(0);
        return str.charCodeAt(0) - zero;
    }
}