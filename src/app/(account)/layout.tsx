import { Footer } from "#/components/shared/Footer";
import { cn } from "#/lib/cn";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={cn("overflow-hidden")}>{children}</div>
      <Footer />
    </>
  );
}
