function find(curr: BinaryNode<number> | null, needle: number): boolean {
    if (!curr) return false;

    if (curr.value === needle) return true;

    if (curr.value < needle) return find(curr.right, needle);
    
    return find(curr.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return find(head, needle);
}