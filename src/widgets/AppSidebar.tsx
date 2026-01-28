import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarRail,
} from '@/shared/components/ui/sidebar';
import ControlPanel from '@/widgets/ControlPanel';
import { Button } from '@/shared/components/ui/button';
import { useSidebar } from '@/shared/components/ui/sidebarUtils';

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Control Panel</h2>
      </SidebarHeader>

      <SidebarContent>
        <ControlPanel/>
      </SidebarContent>

      <SidebarFooter>
        <Button variant="outline" className="w-full" onClick={toggleSidebar}>Close</Button>
      </SidebarFooter>

      <SidebarRail/>
    </Sidebar>
  );
};

export default AppSidebar;
