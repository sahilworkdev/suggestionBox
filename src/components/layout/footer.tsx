
export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Suggestion Box. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {/* <Link href="#" className="hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Contact
          </Link> */}
            <p>{new Date().toLocaleString()}</p>
        </div>
      </div>
    </footer>
  );
}
