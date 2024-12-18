import { Bell, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Project, Notification } from '@/interfaces'

interface HeaderProps {
//   selectedProject: Project | null;
//   notifications: Notification[];
//   markNotificationAsRead: (id: number) => void;
//   markAllNotificationsAsRead: () => void;
}

export function Header({
//   selectedProject,
//   notifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead
}: HeaderProps) {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">All Projects</h2>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6 text-gray-500" />
              {/* {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )} */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-normal">
              <div className="flex justify-between items-center">
                <span className="font-bold">Notifications</span>
                {/* <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
                  Mark all as read
                </Button> */}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="flex items-start p-2">
                <Bell className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <div className="flex-grow">
                  <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'font-medium'}`}>
                    {notification.message}
                  </p>
                </div>
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </DropdownMenuItem>
            ))} */}
          </DropdownMenuContent>
        </DropdownMenu>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
