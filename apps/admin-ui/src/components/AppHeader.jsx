import { useEffect, useState } from "react";
import api from "../utils/api";
import LogoutButton from "./LogoutButton";
import { Flex, Group, Text } from "@mantine/core";

const AppHeader = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const result = await api.me();
    console.log(result);
    setUser(result.body);
  };
  return (
    <Group position="apart">
      <Flex justify="flex-start" align="center">
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          fz="xl"
          fw={700}
          ml="xs"
          mt={5}
        >
          Blog Admin
        </Text>
      </Flex>
      <Flex justify="flex-end" align="center">
        <Text mr="lg">{user.name}</Text>
        <LogoutButton />
      </Flex>
    </Group>
  );
};

export default AppHeader;
