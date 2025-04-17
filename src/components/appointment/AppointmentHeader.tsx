interface AppointmentHeaderProps {
  title: string;
  subtitle: string;
}

export default function AppointmentHeader({ title, subtitle }: AppointmentHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
