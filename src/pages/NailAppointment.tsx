import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { AppointmentFormValues } from "@/types/appointment";
import AppointmentHeader from "@/components/appointment/AppointmentHeader";
import AppointmentForm from "@/components/appointment/AppointmentForm";
import ServiceInfoCard from "@/components/appointment/ServiceInfoCard";
import SuccessConfirmation from "@/components/appointment/SuccessConfirmation";

export default function NailAppointment() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  function handleSubmitSuccess(values: AppointmentFormValues) {
    console.log(values);
    toast({
      title: "Запись успешно создана",
      description: `${values.name}, мы ждем вас ${format(values.date, "d MMMM", { locale: ru })} в ${values.time}`,
    });
    setIsSubmitted(true);
  }

  function handleReset() {
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return <SuccessConfirmation onReset={handleReset} />;
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <AppointmentHeader 
            title="Запись на маникюр"
            subtitle="Выберите удобную дату и время для вашей процедуры"
          />
          <AppointmentForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
        
        <div className="md:w-1/2">
          <ServiceInfoCard />
        </div>
      </div>
    </div>
  );
}
