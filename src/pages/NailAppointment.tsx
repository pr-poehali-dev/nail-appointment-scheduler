import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Nail, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import NailServiceList from "@/components/NailServiceList";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z.string().min(10, {
    message: "Пожалуйста, введите корректный номер телефона",
  }),
  date: z.date({
    required_error: "Пожалуйста, выберите дату",
  }),
  time: z.string({
    required_error: "Пожалуйста, выберите время",
  }),
  service: z.string({
    required_error: "Пожалуйста, выберите услугу",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NailAppointment() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      notes: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: "Запись успешно создана",
      description: `${values.name}, мы ждем вас ${format(values.date, "d MMMM", { locale: ru })} в ${values.time}`,
    });
    setIsSubmitted(true);
  }

  const availableTimes = [
    "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00"
  ];

  if (isSubmitted) {
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
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Создать новую запись
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">Запись на маникюр</h1>
          <p className="text-muted-foreground mb-6">
            Выберите удобную дату и время для вашей процедуры
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Заполните форму записи</CardTitle>
              <CardDescription>
                Заполните все необходимые поля, чтобы записаться на прием
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите ваше имя" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <Input placeholder="+7 (___) ___-__-__" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Дата</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ru })
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => 
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                              }
                              locale={ru}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Время</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите время" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Услуга</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите услугу" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manicure">Маникюр</SelectItem>
                            <SelectItem value="pedicure">Педикюр</SelectItem>
                            <SelectItem value="gel-polish">Гель-лак</SelectItem>
                            <SelectItem value="nail-extension">Наращивание</SelectItem>
                            <SelectItem value="nail-repair">Ремонт ногтей</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пожелания</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Дополнительные пожелания или комментарии"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Необязательно. Можете указать предпочтения по дизайну или другие пожелания.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Записаться
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-1/2">
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
        </div>
      </div>
    </div>
  );
}
