import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-purple-500 py-12 w-full text-white text-center text-lg">
      Made by{" "}
      <Link
        href="https://ilkay-mehmet-bora-cv-website.vercel.app/"
        className="text-white underline font-bold"
      >
        İlkay Mehmet Bora
      </Link>{" "}
      
    </footer>
  );
}
