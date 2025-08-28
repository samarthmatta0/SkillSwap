import React from 'react';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
} from './ui/sidebar';
import { LogoLink } from './ui/logo';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Home,
  Search,
  User,
  Settings,
  Wallet,
  HelpCircle,
  LogOut,
  Bell,
  Calendar,
  MessageSquare,
  BarChart3,
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  PanelLeft
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user?: any;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Overview & activity'
  },
  {
    id: 'explore',
    label: 'Explore',
    icon: Search,
    description: 'Find skills & mentors'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    description: 'Your public profile'
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: Wallet,
    description: 'Credits & billing',
    badge: 'Pro'
  }
];

const quickActions = [
  {
    id: 'sessions',
    label: 'My Sessions',
    icon: Calendar,
    count: 3
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: MessageSquare,
    count: 12
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: Star,
    count: 8
  }
];

const resources = [
  {
    id: 'help',
    label: 'Help Center',
    icon: HelpCircle
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }
];

function SidebarHeader({ user, onNavigate }: { user?: any; onNavigate: (page: string) => void }) {
  return (
    <SidebarHeader className="border-b border-sidebar-border">
      <div className="flex items-center gap-3 px-2 py-3">
        <LogoLink onNavigate={onNavigate} size="sm" />
        <div className="flex-1 min-w-0">
          <h2 className="text-sidebar-foreground font-semibold text-sm truncate">
            SkillSwap
          </h2>
          <p className="text-sidebar-foreground/70 text-xs">
            Human-to-human learning
          </p>
        </div>
      </div>
    </SidebarHeader>
  );
}

function UserSection({ user, onLogout }: { user?: any; onLogout: () => void }) {
  const { state } = useSidebar();
  
  return (
    <SidebarFooter className="border-t border-sidebar-border">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-2 py-3">
                <div className="w-8 h-8 bg-skillswap-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                {state === 'expanded' && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sidebar-foreground font-medium text-sm truncate">
                      {user?.name || 'John Doe'}
                    </p>
                    <p className="text-sidebar-foreground/70 text-xs truncate">
                      {user?.email || 'john@example.com'}
                    </p>
                  </div>
                )}
              </div>
            </SidebarMenuItem>
            
            <SidebarSeparator />
            
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={onLogout}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarFooter>
  );
}

function AppSidebar({ 
  currentPage, 
  onNavigate, 
  onLogout, 
  user 
}: { 
  currentPage: string; 
  onNavigate: (page: string) => void; 
  onLogout: () => void; 
  user?: any; 
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader user={user} onNavigate={onNavigate} />
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.description}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.id}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(action.id)}
                    tooltip={action.label}
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                    {action.count && action.count > 0 && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        {action.count}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Resources */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {resources.map((resource) => (
                <SidebarMenuItem key={resource.id}>
                  <SidebarMenuButton
                    isActive={currentPage === resource.id}
                    onClick={() => onNavigate(resource.id)}
                    tooltip={resource.label}
                  >
                    <resource.icon className="w-4 h-4" />
                    <span>{resource.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <UserSection user={user} onLogout={onLogout} />
      <SidebarRail />
    </Sidebar>
  );
}

export default function DashboardLayout({ 
  children, 
  currentPage, 
  onNavigate, 
  onLogout, 
  user 
}: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-skillswap-neutral/30">
        <AppSidebar 
          currentPage={currentPage}
          onNavigate={onNavigate}
          onLogout={onLogout}
          user={user}
        />
        
        <SidebarInset className="flex-1">
          {/* Header with sidebar trigger */}
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-6">
            <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
            <div className="flex-1" />
            
            {/* Header actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => {
                  // Handle notifications
                }}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-skillswap-accent rounded-full" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 bg-skillswap-primary rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {user?.name || 'Profile'}
                </span>
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}