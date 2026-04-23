import Link from "next/link";

const NotLoggedIn = () => {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 px-6 py-5 text-sm text-muted-foreground">
      <p>
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>{" "}
        to bookmark the quotes that stay with you.
      </p>
    </div>
  );
};

export default NotLoggedIn;
