import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VerifyForm from "./VerifyForm";

export default async function Verify() {
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;

  if (!email) {
    redirect("/signup");
  }

  return (
    <div style={{ maxWidth: "450px", margin: "150px auto 0", padding: "25px" }}>
      <h1
        style={{
          fontSize: "2.2rem",
          textAlign: "center",
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#1f2937",
        }}
      >
        Verify Email
      </h1>

  <VerifyForm email={email} />
    </div>
  );
}