"use client"
import ButtonAuth from "@/components/ButtonAuth";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const traduction = useTranslations("Navbar");
  return (
    <div>
      <h1>{traduction("home")}</h1>
      <ButtonAuth />
    </div>
  );
};
export default HomePage;