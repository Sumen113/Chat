import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {LogOut, Settings, UserIcon } from 'lucide-react';
import LogoutDialog from './logout-dialog';
import SettingsDialog from './settings-dialog';
import { useAuthContext } from '../context/auth-context';

const ProfileAvatar = () => {
    const { user, isLoading } = useAuthContext();
    if (!user || isLoading) return <div></div>;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    return (
        <div>
            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
            <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <p className="size-8 cursor-pointer border rounded-full bg-gradient-to-b border-orange-500 text-orange-400 from-orange-500/20 to-orange-500/30 grid place-items-center">
                        <UserIcon className="size-5" />
                        {/* <BadgeInfo className='size-5' /> */}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                        <Settings /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
                        <LogOut className="size-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProfileAvatar;
