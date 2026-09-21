import Link from "next/link";

export function BottomNav() {
  return (
    <nav className="site-bottom-nav" aria-label="Main navigation">
      <Link href="/" className="site-nav-item">
        <span className="site-nav-icon">⌂</span>
        <span>Stories</span>
      </Link>
      <Link href="/dictionary" className="site-nav-item">
        <span className="site-nav-icon">▱</span>
        <span>Dictionary</span>
      </Link>
      <button type="button" className="site-nav-item coming-soon" disabled>
        <span className="site-nav-icon">＋</span>
        <span>Soon</span>
      </button>
    </nav>
  );
}
