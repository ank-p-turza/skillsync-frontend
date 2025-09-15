'use client';
import Link from "next/link";
import Button from "@/components/ui/Button";
import NavItem from "@/components/ui/NavItem";
import { useState, useEffect } from "react";
import { checkAuthStatus } from "@/utils/auth";
import LoggedInNavigation from "./logged-in-navigation";

const navigationItems = [
  { href: "/courses", icon: "fas fa-book-open", label: "Courses" },
  { href: "/business", icon: "fas fa-briefcase", label: "Business" },
  { href: "/instructors", icon: "fas fa-chalkboard-teacher", label: "Instructors" },
  { href: "/about", icon: "fas fa-info-circle", label: "About" },
];

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await checkAuthStatus();
      setIsAuthenticated(authenticated);
    };
    
    checkAuth();
  }, []);

  // Show loading state or nothing while checking authentication
  if (isAuthenticated === null) {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/">
            <div className="nav-logo">
              <div className="logo-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h2>SkillSync</h2>
            </div>
          </Link>
        </div>
      </nav>
    );
  }

  // If authenticated, show the logged-in navigation
  if (isAuthenticated) {
    return <LoggedInNavigation />;
  }

  // If not authenticated, show the public navigation
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/">
          <div className="nav-logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h2>SkillSync</h2>
          </div>
        </Link>
        
        <ul className="nav-menu">
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>

        <div className="nav-buttons">
          <Link href="/login">
            <Button variant="ghost">
              <i className="fas fa-sign-in-alt"></i>{" "}
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary">
              <i className="fas fa-user-plus"></i>{" "}
              Sign Up
            </Button>
          </Link>
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