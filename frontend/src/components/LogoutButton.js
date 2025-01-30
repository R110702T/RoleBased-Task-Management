"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return <button onClick={handleLogout}  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>;
}
