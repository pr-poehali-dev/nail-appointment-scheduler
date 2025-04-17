import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

interface SuccessConfirmationProps {
  onReset: () => void;
}

export default function SuccessConfirmation({ onReset }: SuccessConfirmationProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center">Запись подтверждена</CardTitle>
          <CardDescription className="text-center">
            Благодарим за запись! Мы с нетерпением ждем встречи с вами.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onReset} className="w-full">
            Создать новую запись
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
