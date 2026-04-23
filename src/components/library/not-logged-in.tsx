import { RocketIcon } from "lucide-react";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

const NotLoggedIn = () => {
  return (
    <Alert className="border-primary/30 bg-primary/5 text-foreground">
      <RocketIcon className="h-4 w-4 text-primary" />
      <AlertTitle>Bookmark the quotes that move you.</AlertTitle>
      <AlertDescription>
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign in
        </Link>{" "}
        to save favorites and build your own collection.
      </AlertDescription>
    </Alert>
  );
};

export default NotLoggedIn;
