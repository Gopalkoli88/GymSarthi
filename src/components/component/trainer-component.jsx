import { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {Link} from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function TrainerComponent() {
  const [theme, setTheme] = useState("light");
  return (
    <div
      className={`flex min-h-screen w-full ${
        theme === "dark" ? "bg-[#000] dark" : "bg-white"
      }`}
    >
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-[#000] dark:bg-[#000] sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              to="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <UserIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Trainer</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    theme === "dark"
                      ? "text-muted-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span className="sr-only">My Plans</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">My Plans</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    theme === "dark"
                      ? "text-muted-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <CircleCheckIcon className="h-5 w-5" />
                  <span className="sr-only">Task Management</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Task Management</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
          className={`sticky top-0 z-30 flex h-14 items-center gap-4 border-b ${
            theme === "dark" ? "bg-[#000] dark:bg-[#000]" : "bg-white"
          } px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <UserIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Trainer</span>
                </Link>
                <Link
                  to="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    theme === "dark" ? "text-foreground" : "text-foreground"
                  }`}
                  prefetch={false}
                >
                  <UserIcon className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  to="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    theme === "dark"
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  My Plans
                </Link>
                <Link
                  to="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    theme === "dark"
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  <CircleCheckIcon className="h-5 w-5" />
                  Task Management
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full animate-pulse"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <SunMoonIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main
          className={`grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ${
            theme === "dark" ? "bg-[#000]" : "bg-white"
          }`}
        >
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card
              className={`sm:col-span-2 border-[#333] animate-fade-in ${
                theme === "dark" ? "bg-[#000]" : "bg-white"
              }`}
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  Your Profile
                </CardTitle>
                <CardDescription
                  className={`max-w-lg text-balance leading-relaxed ${
                    theme === "dark" ? "text-[#999]" : "text-[#999]"
                  }`}
                >
                  View and manage your personal information as a trainer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Name:
                    </div>
                    <div
                      className={theme === "dark" ? "text-white" : "text-black"}
                    >
                      John Doe
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Email:
                    </div>
                    <div
                      className={theme === "dark" ? "text-white" : "text-black"}
                    >
                      john.doe@example.com
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Phone:
                    </div>
                    <div
                      className={theme === "dark" ? "text-white" : "text-black"}
                    >
                      +1 (555) 123-4567
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Expertise:
                    </div>
                    <div
                      className={theme === "dark" ? "text-white" : "text-black"}
                    >
                      Fitness, Nutrition, Wellness
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Experience:
                    </div>
                    <div
                      className={theme === "dark" ? "text-white" : "text-black"}
                    >
                      5 years
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={`${
                    theme === "dark"
                      ? "bg-[#333] text-white"
                      : "bg-[#333] text-white"
                  }`}
                >
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
            <Card
              className={`border-[#333] animate-fade-in ${
                theme === "dark" ? "bg-[#000]" : "bg-white"
              }`}
              x-chunk="dashboard-05-chunk-1"
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  My Plans
                </CardTitle>
                <CardDescription
                  className={`max-w-lg text-balance leading-relaxed ${
                    theme === "dark" ? "text-[#999]" : "text-[#999]"
                  }`}
                >
                  View and manage the plans you are responsible for.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div>
                      <div
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        Fitness Bootcamp
                      </div>
                      <div
                        className={`text-sm ${
                          theme === "dark" ? "text-[#999]" : "text-[#999]"
                        }`}
                      >
                        30 members, 12 weeks
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`${
                        theme === "dark"
                          ? "bg-[#333] text-white"
                          : "bg-[#333] text-white"
                      }`}
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div>
                      <div
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        Yoga for Beginners
                      </div>
                      <div
                        className={`text-sm ${
                          theme === "dark" ? "text-[#999]" : "text-[#999]"
                        }`}
                      >
                        15 members, 8 weeks
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`${
                        theme === "dark"
                          ? "bg-[#333] text-white"
                          : "bg-[#333] text-white"
                      }`}
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div>
                      <div
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        Nutrition Coaching
                      </div>
                      <div
                        className={`text-sm ${
                          theme === "dark" ? "text-[#999]" : "text-[#999]"
                        }`}
                      >
                        20 members, 6 months
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`${
                        theme === "dark"
                          ? "bg-[#333] text-white"
                          : "bg-[#333] text-white"
                      }`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className={`border-[#333] animate-fade-in ${
                theme === "dark" ? "bg-[#000]" : "bg-white"
              }`}
              x-chunk="dashboard-05-chunk-2"
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className={theme === "dark" ? "text-white" : "text-black"}
                >
                  Plan Details
                </CardTitle>
                <CardDescription
                  className={`max-w-lg text-balance leading-relaxed ${
                    theme === "dark" ? "text-[#999]" : "text-[#999]"
                  }`}
                >
                  View detailed information about the selected plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Plan Name:
                    </div>
                    <div
                      className={theme === "dark" ? "text-white" : "text-black"}
                    >
                      Fitness Bootcamp
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                    <div
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoonIcon(props) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunMoonIcon(props) {
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
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
