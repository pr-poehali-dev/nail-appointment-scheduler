import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NailServiceList from "@/components/NailServiceList";
import { Nail } from "lucide-react";

export default function ServiceInfoCard() {
  return (
    <>
      <div className="rounded-lg overflow-hidden mb-6">
        <img 
          src="/placeholder.svg" 
          alt="Маникюр"
          className="w-full h-[250px] object-cover"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Nail className="h-5 w-5" />
            <span>Наши услуги</span>
          </CardTitle>
          <CardDescription>
            Выберите подходящую вам услугу из нашего каталога
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NailServiceList />
        </CardContent>
      </Card>
    </>
  );
}
