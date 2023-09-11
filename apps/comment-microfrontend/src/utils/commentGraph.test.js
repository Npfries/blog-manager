import createCommentGraph from "./commentGraph";

describe("createCommentGraph", () => {
  it("should nest a child comment", () => {
    const comments = [
      { id: 9, parentId: 3 },
      { id: 3, parentId: null },
    ];

    const graph = createCommentGraph(comments);

    const expectedParent = graph[0];
    const expectedChild = graph[0].children[0];

    expect(expectedParent.id).toEqual(3);
    expect(expectedChild.id).toEqual(9);
  });

  it("should not nest unrelated comments", () => {
    const comments = [
      { id: 7, parentId: null },
      { id: 5, parentId: null },
    ];

    const graph = createCommentGraph(comments);

    expect(graph[0].children).not.toBeDefined();
    expect(graph[1].children).not.toBeDefined();
  });
});
