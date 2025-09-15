'use client';
import Link from "next/link";
import Button from "@/components/ui/Button";
import NavItem from "@/components/ui/NavItem";
import { logout } from "@/utils/auth";

const loggedInNavigationItems = [
  { href: "/profile", icon: "fas fa-user", label: "Profile" },
  {href: "/courses", icon: "fas fa-book-open", label: "All Courses" },
  { href: "/enrolled-courses", icon: "fas fa-book-reader", label: "Enrolled Courses" },
  { href: "/notifications", icon: "fas fa-bell", label: "Notifications" },
];

export default function LoggedInNavigation() {
  const handleLogout = async () => {
    const success = await logout();
    if (!success) {
      // If logout fails, we could show an error message
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/dashboard">
          <div className="nav-logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h2>SkillSync</h2>
          </div>
        </Link>
        
        <ul className="nav-menu">
          {loggedInNavigationItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>

        <div className="nav-buttons">
          <Button variant="ghost" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>{" "}
            Logout
          </Button>
        </div>
        
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}