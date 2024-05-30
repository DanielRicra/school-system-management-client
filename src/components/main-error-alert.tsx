import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface MainErrorAlertProps {
  errorMessage: string;
}

export function MainErrorAlert({ errorMessage }: MainErrorAlertProps) {
  return (
    <Alert variant="destructive" className="max-w-[400px]">
      <ExclamationTriangleIcon className="h-4 w-4 dark:text-red-500" />
      <AlertTitle className="font-bold">Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
