import { TvMinimal, Plus, X, PanelLeft, PictureInPicture2 } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { useScreensState, useScreensDispatch } from '@/contexts/screens'
import { useMediaStreamScreen } from '@/hooks/use-media-stream-screen'

export function AppSidebar() {
  const { state } = useScreensState()
  const { setActiveScreen, setScreenTitle, removeScreen } = useScreensDispatch()
  const { addNewMediaStreamScreen } = useMediaStreamScreen()

  const sidebar = useSidebar()
  const isOpen = sidebar.isMobile ? sidebar.openMobile : sidebar.open

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={'Toggle sidebar'}
              onClick={isOpen ? void 0 : sidebar.toggleSidebar}
            >
              {isOpen ? <PictureInPicture2 /> : <PanelLeft />}
              <h1 className='font-semibold shrink-0'>Share Screens</h1>
            </SidebarMenuButton>
            <SidebarMenuAction title='Toggle sidebar' onClick={sidebar.toggleSidebar}>
              <PanelLeft />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Screens</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {state.items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.id === state.active}
                    onClick={() => setActiveScreen(item.id)}
                  >
                    <TvMinimal />
                    <input
                      type='text'
                      name='screen-title'
                      value={item.title}
                      className='text-sm bg-transparent border-b px-1'
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      onChange={(e) => {
                        setScreenTitle(item.id, e.target.value)
                      }}
                    />
                  </SidebarMenuButton>
                  <SidebarMenuAction onClick={() => removeScreen(item.id)}>
                    <X />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={'Add screen'} onClick={() => addNewMediaStreamScreen()}>
                  <Plus />
                  <span>Add</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
