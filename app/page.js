import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h2 className="text-3xl mb-4">
        {" "}
        Online Order Management System
      </h2>
      <Link
        href="/home/dashboard"
        className="text-blue-500"
      >
        View Dashboard
      </Link>
    </div>
  );
}
