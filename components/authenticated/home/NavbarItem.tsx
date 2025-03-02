import useTheme from "@/components/hooks/useTheme";
import { usePathname, useRouter } from "next/navigation";

export default function NavbarItem({
  children,
  link,
  exact_path,
}: {
  children: React.ReactNode;
  link: string;
  exact_path?: boolean;
}) {
  const { mode } = useTheme();
  const pathName = usePathname();
  const router = useRouter();

  const isActive = exact_path ? pathName === link : pathName?.includes(link);

  return (
    <div
      onClick={() => router.push(link)}
      className={`${mode === "dark" ? (isActive ? "text-blue-600 font-extrabold" : "text-gray-100") : isActive ? "text-blue-600 font-extrabold" : "text-gray-800"} ${mode === "dark"} flex cursor-pointer text-lg items-center gap-1 font-semibold`}
    >
      {children}
    </div>
  );
}
