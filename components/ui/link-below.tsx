import Link from "next/link";

interface LinkBelowProps {
    descText? : string;
    linkText : string;
    href : string;
    variant? : 'first' | 'second';
}

export default function LinkBelow({descText, linkText, href, variant="first" }:Readonly<LinkBelowProps>){
    return(
        <p style={{ margin: "40px 0", color: "#666", fontSize: "20px" }}>
          {descText}
          <Link 
            href={href} 
            style={{ 
              color: `${variant === 'first'? '#007bff' : '#28a745'}`, 
              textDecoration: "underline", 
              fontWeight: "500" 
            }}
          >
            {linkText}
          </Link>
        </p>
    );
}