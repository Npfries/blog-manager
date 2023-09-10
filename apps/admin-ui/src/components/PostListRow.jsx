import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PostForm from "./PostForm";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { slug } from "@blog-manager/utils";

const PostListRow = ({ post }) => {
  const [editPostOpened, { open: openEditPost, close: closeEditPost }] = useDisclosure(false);
  const navigate = useNavigate();

  const deletePost = async () => {
    await api.deletePost(post.uuid);
    navigate(0);
  };

  const PostLink = () => {
    const handle = slug.slugify(localStorage.getItem("handle"));
    const title = slug.slugify(post.title);
    const domain = "http://blog.localhost.com";
    const link = `${domain}/${handle}/${title}`;
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <Text>{link}</Text>
      </a>
    );
  };

  return (
    <>
      <Card>
        <Group position="apart" grow>
          <Text>{post.title}</Text>
          <PostLink></PostLink>
          <Group position="right" ml="lg">
            <Button variant="outline" color="yellow" mr="sm" onClick={openEditPost}>
              Edit
            </Button>
            <Button variant="outline" color="red" onClick={deletePost}>
              Delete
            </Button>
          </Group>
        </Group>
      </Card>
      <Modal
        opened={editPostOpened}
        onClose={closeEditPost}
        title="Edit Post"
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <PostForm uuid={post.uuid}></PostForm>
      </Modal>
    </>
  );
};

export default PostListRow;
