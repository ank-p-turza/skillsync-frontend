import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
}

export default function NavItem({ href='/', icon='fas fa-house', label='Home' }: Readonly<NavItemProps>) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href + '/');
    return (
        <li className="nav-item">
        <Link href={href} className={`nav-link ${isActive? 'active' : ''}`}>
            <i className={icon}></i>
            {label}
        </Link>
        </li>
    );
}