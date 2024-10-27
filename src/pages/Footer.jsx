/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6Gg0mjfQkaG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wSwJXLchFwT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Footer() {
  return (
    <footer className="bg-black/60 py-12 p-8  ">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 border-t-4 pt-5">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <DumbbellIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Fitness Gym</span>
          </Link>
          <p className="text-muted-foreground">
            Experience the ultimate fitness journey at our state-of-the-art gym.
            Unlock your full potential with our expert trainers and cutting-edge
            equipment.
          </p>
        </div>
        <div className="grid gap-2 px-9">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Classes
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline"
            prefetch={false}
          >
            Pricing
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold">Contact</h4>
          <p className="text-muted-foreground">
            123 Main Street, Anytown USA
            <br />
            Phone: (123) 456-7890
          </p>
          {/* <div className="flex gap-12">
            <Link
              href="#"
              className="text-muted-foreground hover:underline"
              prefetch={false}
            >
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:underline"
              prefetch={false}
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:underline"
              prefetch={false}
            >
              <InstagramIcon className="h-6 w-6" />
            </Link>
          </div> */}
          <div className="flex gap-12 ">
            <Link
              href="#"
              className="text-muted-foreground hover:text-blue-500 hover:bg-blue-100 hover:scale-110 hover:shadow-lg transition-all duration-300 p-2 rounded-full"
              prefetch={false}
            >
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-blue-500 hover:bg-blue-100 hover:scale-110 hover:shadow-lg transition-all duration-300 p-2 rounded-full"
              prefetch={false}
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-blue-500 hover:bg-blue-100 hover:scale-110 hover:shadow-lg transition-all duration-300 p-2 rounded-full"
              prefetch={false}
            >
              <InstagramIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold">Hours</h4>
          <p className="text-muted-foreground">
            Monday - Friday: 6am - 10pm
            <br />
            Saturday - Sunday: 8am - 8pm
            <br /> Monday - Friday: 6am - 10pm
            <br />
            Saturday - Sunday: 8am - 8pm
          </p>
        </div>
      </div>
      {/* <div className="container mx-auto px-4 mt-12 text-center text-[#ccc] text-sm">
        <p>Copyright © 2020 Fitgym All rights reserved</p>
        <div className="flex justify-center gap-4 mt-3">
          <Link
            href="#"
            className="text-[#ccc] hover:underline"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-[#ccc] hover:underline"
            prefetch={false}
          >
            Terms & Conditions
          </Link>
        </div>
      </div> */}
      <footer className="mt-3  flex flex-col gap-2 sm:flex-row py-3  w-full shrink-0 items-center  px-4 md:px-6 border-t-4 ">
        <p className="text-xs text-muted-foreground text-white">
          &copy; 2024 Fitness Gym. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-white"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-white"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </footer>
  );
}

function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
