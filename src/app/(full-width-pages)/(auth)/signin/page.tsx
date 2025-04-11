import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartsy | Admin SignIn Page",
  description: "This is Cartsy Admin SignIn Page",
};

export default function SignIn() {
  return <SignInForm />;
}
