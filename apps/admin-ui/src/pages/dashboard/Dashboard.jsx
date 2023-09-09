import { AppShell, Navbar, Header } from "@mantine/core";
import AppHeader from "../../components/AppHeader";
import AppNavbar from "../../components/AppNavbar";
import PostsList from "../../components/PostsList";

const Dashboard = () => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <AppNavbar></AppNavbar>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <AppHeader></AppHeader>
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <PostsList></PostsList>
    </AppShell>
  );
};

export default Dashboard;
