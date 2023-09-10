import { useEffect, useState } from "react";
import "./App.css";
import { Card, Text } from "@mantine/core";
import Comment from "./components/Comment";
import api from "./utils/api";
import CommentForm from "./components/CommentForm";

const App = () => {
  const [comments, setComments] = useState([]);
  const params = new URL(document.location).searchParams;
  // "test" should only be provided to non-prod environments, used for developing the comment ui in isolation from the rest of the app
  const postId = params.get("id") || "test";

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const response = await api.findComments(postId);
    /**
     * @type {{id: string, parentId: string}[]}
     */

    console.log(response.body);
    orderComments(response.body);
  };

  const orderComments = (unorderedComments) => {
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

    const result = createCommentGraph(unorderedComments);
    console.log(result);
    setComments(result);
  };

  const commentSaved = (comment) => {
    loadComments();
  };

  return (
    <Card mt="lg">
      <Text fz="lg" fw={500} mb="md">
        Comments
      </Text>
      <CommentForm postId={postId} onCommentSaved={commentSaved}></CommentForm>

      {comments.map((comment, i) => {
        return <Comment key={i} comment={comment} depth={0} onCommentSaved={commentSaved}></Comment>;
      })}
    </Card>
  );
};

export default App;
