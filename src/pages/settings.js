import { useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input, Button, Avatar } from "@mantine/core";
import { UserContext } from "@/context/UserContext";

const AccountSettings = () => {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user?.user_metadata?.name ?? "");
  const [image, setImage] = useState(user?.user_metadata?.image ?? "");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.updateUser({
      data: { name: username, image },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <Avatar src={image} size="xl" />
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        <Input
          label="Image URL"
          value={image}
          onChange={handleImageChange}
          placeholder="Enter the URL for your profile picture"
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default AccountSettings;
