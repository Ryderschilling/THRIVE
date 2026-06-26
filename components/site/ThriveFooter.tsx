import Link from "next/link";

export default function ThriveFooter() {
  return (
    <footer className="th-footer">
      <div className="th-wrap">
        <div className="th-footer-grid">
          <div>
            <div className="th-footer-brand">
              THRIVE<span>·30A</span>
            </div>
            <p className="th-footer-tag">
              A ministry and growth ecosystem for Christian businessmen on the
              30A coast of Florida.
            </p>
          </div>
          <div className="th-footer-col">
            <h4>Navigate</h4>
            <Link href="/#community">Community</Link>
            <Link href="/#coaching">Coaching</Link>
            <Link href="/events">Events</Link>
          </div>
          <div className="th-footer-col">
            <h4>Connect</h4>
            <Link href="/#connect">Newsletter</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Skool</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className="th-footer-col">
            <h4>Located</h4>
            <Link href="#">Santa Rosa Beach, FL</Link>
            <Link href="#">30A · Emerald Coast</Link>
            <Link href="#">30.2769° N</Link>
            <Link href="#">86.0080° W</Link>
          </div>
        </div>

        <div className="th-footer-bottom">
          <span>© 2026 THRIVE 30A · All rights reserved</span>
          <span>Santa Rosa Beach, FL · Emerald Coast</span>
        </div>
      </div>
    </footer>
  );
}
