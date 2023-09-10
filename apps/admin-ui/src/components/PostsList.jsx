import { useEffect, useState } from "react";
import api from "../utils/api";
import { Button, Card, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PostForm from "./PostForm";
import PostListRow from "./PostListRow";

const PostsList = () => {
  const [newPostOpened, { open: openNewPost, close: closeNewPost }] = useDisclosure(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    findPosts();
  }, []);

  const findPosts = async () => {
    const result = await api.findPosts();
    setPosts(result.body);
  };

  return (
    <>
      <Button onClick={openNewPost} mb="md">
        New Post
      </Button>
      <div>
        {posts.map((post, i) => (
          <PostListRow key={i} post={post}></PostListRow>
        ))}
      </div>

      <Modal
        opened={newPostOpened}
        onClose={closeNewPost}
        title="New Post"
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <PostForm></PostForm>
      </Modal>
    </>
  );
};

export default PostsList;
