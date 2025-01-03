import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { cn } from "@/lib/utils";
import "./Header.scss";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const isAuth = session;

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-b-2 shadow-lg py-3 px-5 md:px-10 lg:px-20">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* <img src="src\components\logo.svg" alt="Logo" className="w-8 h-8" /> */}
          <h1 className="text-lg font-bold tracking-wide font-sans">Survey Web</h1>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-5">
            <NavigationMenuItem>
              <Link href="/" passHref>
              <span className={cn(navigationMenuTriggerStyle(), "menu-item font-bold text-lg text-center hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:font-extrabold tracking-wide")}>
                  Home
                </span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/manage-form" passHref>
              <span className={cn(navigationMenuTriggerStyle(), "menu-item font-bold text-lg text-center hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:font-extrabold tracking-wide")}>
                 Manage Forms
                </span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/question" passHref>
              <span className={cn(navigationMenuTriggerStyle(), "menu-item font-bold text-lg text-center hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:font-extrabold tracking-wide")}>
              Survey
                </span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Account Section */}
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar>
                  <AvatarImage src={session.user.image || "/default-avatar.png"} />
                  <AvatarFallback>{session.user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm">{session.user.name || "User"}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-40 from-red-500 to-blue-500">
              {/* <DropdownMenuLabel>Your Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
