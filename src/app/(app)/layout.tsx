import ThemeSwitch from '@/components/ThemeSwitch';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeSwitch />
      {children}
    </div>
  );
}
