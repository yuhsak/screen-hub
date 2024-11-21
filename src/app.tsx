import { ScreensProvider } from '@/contexts/screens'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { AppContent } from '@/components/app-content'

export function App() {
  return (
    <ScreensProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppContent />
        </SidebarInset>
      </SidebarProvider>
    </ScreensProvider>
  )
}
