import React, { createContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  async function signIn(values) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      console.error(error);
      toast.error(error.message, {
        style: { background: "#222", color: "#fff" },
      });
      return;
    }
    router.push("/");
  }

  async function signUp(values) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
          image:
            "https://t4.ftcdn.net/jpg/04/62/63/65/360_F_462636502_9cDAYuyVvBY4qYJlHjW7vqar5HYS8h8x.jpg",
        },
      },
    });
    if (error) {
      console.log(error);
      return;
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
