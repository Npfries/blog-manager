import { Button, Card, Text } from "@mantine/core";
import CommentForm from "./CommentForm";
import { useState } from "react";
import api from "../utils/api";

const Comment = ({ comment, depth, onCommentSaved }) => {
  const [replying, setReplying] = useState(false);

  const commentSaved = (newComment) => {
    setReplying(false);
    if (typeof onCommentSaved === "function") {
      onCommentSaved(newComment);
    }
  };

  const commentDeleted = async () => {
    const response = await api.deleteComment(comment.id);
    if (typeof onCommentSaved === "function") {
      onCommentSaved(response);
    }
  };

  const childComments = (comment.children || []).map((comment, i) => {
    return <Comment key={i} comment={comment} depth={depth + 1} onCommentSaved={commentSaved} />;
  });

  const Buttons = () => {
    return (
      <>
        <Button compact variant="subtle" onClick={setReplying}>
          Reply
        </Button>
        <Button compact variant="subtle" color="yellow">
          Edit
        </Button>
        <Button compact variant="subtle" color="red" onClick={commentDeleted}>
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Card shadow="sm" p="xs" ml={depth * 25} mt="xs">
        <Text m={3} mb="xs">
          {comment.content || (
            <Text fs="italic" color="gray">
              comment deleted by user
            </Text>
          )}
        </Text>
        {comment.content !== "" ? <Buttons></Buttons> : null}
        {replying ? <CommentForm parentId={comment.id} postId={comment.postId} onCommentSaved={commentSaved}></CommentForm> : null}
      </Card>

      {childComments}
    </>
  );
};

export default Comment;

// function Comment({ comment }) {
//   const nestedComments = (comment.children || []).map((comment) => {
//     return <Comment comment={comment} />;
//   });

//   return (
//     <div key={comment.id}>
//       <span>{comment.text}</span>
//       <a href={comment.author.url}>{comment.author.name}</a>
//       {nestedComments}
//     </div>
//   );
// }
