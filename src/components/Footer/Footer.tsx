import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A2238] py-3 flex flex-col items-center justify-center">
      <div className="mt-4 w-full flex flex-col items-center justify-center">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link href="/about" className="text-[#FF6A3D] hover:text-orange-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-[#FF6A3D] hover:text-orange-500 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-[#FF6A3D] hover:text-orange-500 transition">
              Privacy Policy
            </Link>
          </li>
        </ul>
        <p className="text-white text-sm text-center mt-4">
          &copy; {new Date().getFullYear()} Great design with high quality. All Rights Reserved.
        </p>
      </div>      
    </footer>
  );
}
