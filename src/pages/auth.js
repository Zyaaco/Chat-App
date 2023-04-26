import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";

import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";

function Signup(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const router = useRouter();
  const { user, signIn, signUp } = useContext(UserContext);

  useEffect(() => {
    // supabase.auth.onAuthStateChange((event, session) => {
    //   if (session) {
    //     router.push("/");
    //   }
    // });
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <Container mt={100}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500} mb={10}>
          {type === "register" ? "Sign Up" : "Log In"}
        </Text>

        <form
          onSubmit={form.onSubmit((e) => {
            type === "register" ? signUp(e) : signIn(e);
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
