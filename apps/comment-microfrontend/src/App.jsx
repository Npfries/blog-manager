import { useEffect, useState } from "react";
import "./App.css";
import { Card, Text } from "@mantine/core";
import Comment from "./components/Comment";
import api from "./utils/api";
import CommentForm from "./components/CommentForm";
import createCommentGraph from "./utils/commentGraph";

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
    const result = createCommentGraph(unorderedComments);
    setComments(result);
  };

  const commentSaved = (comment) => {
    loadComments();
  };

  return (
    <Card mt={50}>
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
