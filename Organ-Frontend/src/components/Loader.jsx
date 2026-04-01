import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
