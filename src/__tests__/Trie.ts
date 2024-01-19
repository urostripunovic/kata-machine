import Trie from "@code/Trie";

test("Trie", function() {
    const trie = new Trie();
    trie.insert("foo");
    trie.insert("fool");
    trie.insert("foolish");
    trie.insert("bar");

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "fool",
        "foolish",
    ]);

    trie.delete("fool");

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "foolish",
    ]);


    trie.insert("fool");
    trie.delete("foolish");

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "fool",
    ]);

    trie.insert("foolish");
    expect(trie.find("fooli").sort()).toEqual([
        "foolish",
    ]);
});

