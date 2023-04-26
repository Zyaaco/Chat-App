import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Menu,
  Text,
  TextInput,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { UserContext } from "@/context/UserContext";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem(0),
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

const Navbar = () => {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  // const [authUser, setAuthUser] = useState(null);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     setAuthUser(session?.user);
  //   });
  // }, []);

  const { user } = useContext(UserContext);

  const router = useRouter();

  return (
    <div className={classes.header}>
      {user ? (
        <Flex className={classes.mainSection}>
          <Group position="left" sx={{ flexGrow: 1 }} mx={40}>
            <Link href="/">Logo</Link>
          </Group>
          <Menu
            width={260}
            position="right"
            mr={40}
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user.user_metadata?.image}
                    alt={user.user_metadata?.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.user_metadata?.name}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                onClick={() => {
                  router.push("/settings");
                }}
                icon={<IconSettings size="0.9rem" stroke={1.5} />}
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                onClick={async () => {
                  let { error } = await supabase.auth.signOut();
                  if (error) {
                    console.log(error);
                    return;
                  }
                }}
                icon={<IconLogout size="0.9rem" stroke={1.5} />}
              >
                Logout
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                color="red"
                icon={<IconTrash size="0.9rem" stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      ) : (
        <Flex className={classes.mainSection}>
          <Group position="left" sx={{ flexGrow: 1 }} mx={40}>
            <Link href="/">Logo</Link>
          </Group>
          <Group position="right" noWrap>
            <Button
              onClick={() => {
                router.push("/auth");
              }}
            >
              Log In
            </Button>
          </Group>
        </Flex>
      )}
    </div>
  );
};

export default Navbar;
