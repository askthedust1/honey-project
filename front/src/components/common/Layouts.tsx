import ClientLayout from '@/components/UI/ClientLayout/ClientLayout';
import AdminLayout from '@/components/UI/AdminLayout/AdminLayout';
import NoLayout from '@/components/UI/NoLayout/NoLayout';

export const Layouts = {
  Main: ClientLayout,
  Admin: AdminLayout,
  None: NoLayout,
};
export type LayoutKeys = keyof typeof Layouts;
