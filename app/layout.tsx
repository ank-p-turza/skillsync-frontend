import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./layout-styles.css";
import Link from "next/link";
import Navigation from "./navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSync",
  description: "Transform Your Future Through Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Navigation />
        
        {children}

        <footer className="footer">
        <div className="container">
            <div className="footer-main">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="logo-icon">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <h3>SkillSync</h3>
                    </div>
                    <p>Empowering learners worldwide with quality education and professional development opportunities. Join millions who trust SkillSync for their learning journey.</p>
                    <div className="social-links">
                        <Link href="#" className="social-link">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link href="#" className="social-link">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link href="#" className="social-link">
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link href="#" className="social-link">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link href="#" className="social-link">
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="footer-section">
                        <h4>Popular Courses</h4>
                        <ul>
                            <li><Link href="#">Web Development</Link></li>
                            <li><Link href="#">Data Science</Link></li>
                            <li><Link href="#">UI/UX Design</Link></li>
                            <li><Link href="#">Digital Marketing</Link></li>
                            <li><Link href="#">Machine Learning</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>For Students</h4>
                        <ul>
                            <li><Link href="#">Browse Courses</Link></li>
                            <li><Link href="#">Student Resources</Link></li>
                            <li><Link href="#">Certification</Link></li>
                            <li><Link href="#">Mobile App</Link></li>
                            <li><Link href="#">Study Groups</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>For Instructors</h4>
                        <ul>
                            <li><Link href="#">Teach on SkillSync</Link></li>
                            <li><Link href="#">Instructor Guidelines</Link></li>
                            <li><Link href="#">Success Stories</Link></li>
                            <li><Link href="#">Marketing Resources</Link></li>
                            <li><Link href="#">Community</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Support</h4>
                        <ul>
                            <li><Link href="#">Help Center</Link></li>
                            <li><Link href="#">Contact Support</Link></li>
                            <li><Link href="#">Course Refunds</Link></li>
                            <li><Link href="#">Technical Issues</Link></li>
                            <li><Link href="#">Accessibility</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><Link href="#">About Us</Link></li>
                            <li><Link href="#">Careers</Link></li>
                            <li><Link href="#">Press & Media</Link></li>
                            <li><Link href="#">Partnerships</Link></li>
                            <li><Link href="#">Affiliate Program</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-left">
                    <p>&copy; 2025 SkillSync, Inc. All rights reserved.</p>
                    <div className="footer-policies">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                        <Link href="#">Cookie Settings</Link>
                    </div>
                </div>
                <div className="footer-bottom-right">
                    <div className="language-selector">
                        <i className="fas fa-globe"></i>
                        <select>
                            <option>English</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </footer>
      </body>
    </html>
  );
}
