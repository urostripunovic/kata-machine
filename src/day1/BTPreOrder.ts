function search(node: BinaryNode<number> | null, path: number[]): number[] {
    if (!node) {
        return path;
    }

    //pre   
    path.push(node.value)
    //recurse
    search(node.left, path);
    search(node.right, path);
    //post
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return search(head, [])
}