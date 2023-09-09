import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PostForm from "./PostForm";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const PostListRow = ({ post }) => {
  const [editPostOpened, { open: openEditPost, close: closeEditPost }] = useDisclosure(false);
  const navigate = useNavigate();

  const deletePost = async () => {
    await api.deletePost(post.id);
    navigate(0);
  };

  return (
    <>
      <Card>
        <Group position="apart">
          <Text>{post.title}</Text>
          <Flex align="flex-end">
            <Button variant="outline" color="yellow" mr="sm" onClick={openEditPost}>
              Edit
            </Button>
            <Button variant="outline" color="red" onClick={deletePost}>
              Delete
            </Button>
          </Flex>
        </Group>
      </Card>
      <Modal
        opened={editPostOpened}
        onClose={closeEditPost}
        title="Edit Post"
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <PostForm id={post.id}></PostForm>
      </Modal>
    </>
  );
};

export default PostListRow;
