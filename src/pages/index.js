import Input from "@/components/Input";
import Messages from "@/components/Messages";

export default function Home() {
  return (
    <div className="flex flex-col h-[90vh] max-h-[90vh]">
      <Messages />
      <Input />
    </div>
  );
}
