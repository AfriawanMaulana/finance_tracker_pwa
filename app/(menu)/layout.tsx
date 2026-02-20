import BottomNavbar from "@/components/layout/BottomNavbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <main>{children}</main>
      <BottomNavbar />
    </section>
  );
}
