import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar.tsx';
import AppSidebar from '@/widgets/AppSidebar.tsx';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="w-full h-dvh">

    <SidebarProvider>
      <AppSidebar/>
      <main className="flex flex-col w-full">
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  </div>
);

export default Layout;
