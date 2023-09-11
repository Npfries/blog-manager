const createCommentGraph = (commentList) => {
  const map = {};

  commentList.forEach((comment) => (map[comment.id] = comment));

  commentList.forEach((comment) => {
    if (comment.parentId !== null) {
      const parent = map[comment.parentId];

      if (parent.children === undefined) parent.children = [];
      parent.children.push(comment);
    }
  });

  const result = commentList.filter((comment) => comment.parentId === null);

  return result;
};

export default createCommentGraph;
