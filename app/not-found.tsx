import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Not Found | Gökhan Gündüz",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060b0f] flex flex-col justify-center p-10 text-sm">
      <p className="text-[#555] mb-2">
        <span className="text-[#00e5ff]">~</span> ❯ cd /404
      </p>
      <p className="text-[#ff5f57] mb-6">
        bash: /404: No such file or directory
      </p>
      <p className="text-[#555] mb-2">
        <span className="text-[#00e5ff]">~</span> ❯ cd ~
      </p>
      <Link href="/" className="text-[#00e5ff] hover:underline">
        → back to home
      </Link>
    </div>
  );
}
