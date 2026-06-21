import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Dashboard | DocAppoint",
  description: "Manage your doctor appointments and view your profile.",
};

export default function DashboardLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
