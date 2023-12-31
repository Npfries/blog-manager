import { Button, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import api from "../utils/api";

const CommentForm = ({ id, postId, parentId, onCommentSaved, initialContent }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState(initialContent);

  const saveComment = async () => {
    const result = id ? await api.updateComment(id, comment) : await api.addComment(postId, name, comment, parentId);

    if (typeof onCommentSaved === "function" && result.status === 200) {
      onCommentSaved(result.body);
    }
  };

  return (
    <>
      {id ? null : <TextInput label="Your Name" onChange={(e) => setName(e.target.value)}></TextInput>}
      <Textarea label="Comment" value={comment} onChange={(e) => setComment(e.target.value)}></Textarea>
      <Button compact mt="sm" mb="md" variant="subtle" onClick={saveComment}>
        Save
      </Button>
    </>
  );
};

export default CommentForm;
