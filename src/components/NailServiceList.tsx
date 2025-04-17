import { Card } from "@/components/ui/card";

interface NailService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

const nailServices: NailService[] = [
  {
    id: "manicure",
    name: "Классический маникюр",
    description: "Обработка кутикулы, придание формы ногтям",
    price: "800 ₽",
    duration: "40 мин"
  },
  {
    id: "gel-polish",
    name: "Покрытие гель-лаком",
    description: "Долговременное покрытие с выравниванием",
    price: "1500 ₽",
    duration: "1 час"
  },
  {
    id: "nail-extension",
    name: "Наращивание ногтей",
    description: "Моделирование ногтей с дизайном на выбор",
    price: "2500 ₽",
    duration: "2 часа"
  }
];

export default function NailServiceList() {
  return (
    <div className="space-y-4">
      {nailServices.map((service) => (
        <Card key={service.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{service.price}</p>
              <p className="text-xs text-muted-foreground">{service.duration}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
