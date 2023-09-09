import { Button, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const PostForm = ({ id }) => {
  const isNew = id === undefined || id === null;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNew) loadPost();
  }, []);

  const loadPost = async () => {
    const result = await api.findPost(id);
    if (result.status === 200) {
      setTitle(result.body.title);
      setContent(result.body.content);
    }
  };

  const save = async () => {
    if (isNew) {
      await api.createPost(title, content);
      navigate(0);
    } else {
      await api.updatePost(id, title, content);
      navigate(0);
    }
  };

  return (
    <>
      <TextInput
        label="Title"
        placeholder="My Blog Post"
        onChange={(event) => setTitle(event.currentTarget.value)}
        value={title}
      ></TextInput>
      <Textarea
        autosize
        maxRows={30}
        label="Content"
        placeholder="So, what happened was..."
        onChange={(event) => setContent(event.currentTarget.value)}
        value={content}
      ></Textarea>
      <Button onClick={save} mt="md">
        {isNew ? "Create Post" : "Save Edits"}
      </Button>
    </>
  );
};

export default PostForm;
