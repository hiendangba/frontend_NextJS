import { cookies } from "next/headers";
import UserClient from "@/components/app.userClient";
export default async function AdminPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  console.log("🍀 Cookie user:", userCookie);
  let user = null;
  try {
    if (userCookie && userCookie !== "[object Object]") {
      user = JSON.parse(userCookie);
    }
  } catch (error) {
    console.error("❌ Lỗi parse cookie:", error);
  }

  if (!user) {
    return <div>Chưa đăng nhập hoặc cookie lỗi!</div>;
  }
  return (
    <div>
      <UserClient id={String(user.id)} />
    </div>
  );
}
