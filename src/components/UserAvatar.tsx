import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LogIn,
  LogOut,
  Settings,
  Shield,
  UserCircle,
  UserPlus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAppTranslation } from '../hooks/useAppTranslation';

const UserAvatar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useAppTranslation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };

  // Get user initials for fallback
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  // Get display name
  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || 'User';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='relative h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.avatar} alt='User avatar' />
            <AvatarFallback className='bg-blue-200 text-stone-600'>
              {isAuthenticated ? (
                getUserInitials()
              ) : (
                <UserCircle className='h-4 w-4' />
              )}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {getDisplayName()}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <UserCircle className='mr-2 h-4 w-4' />
              <span>{t('userAvatar.profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='mr-2 h-4 w-4' />
              <span>{t('userAvatar.settings')}</span>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  navigate('/admin');
                }}
              >
                <Shield className='mr-2 h-4 w-4' />
                <span>{t('userAvatar.admin')}</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer text-red-600 focus:text-red-600'
              onClick={handleLogout}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>{t('userAvatar.logout')}</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => navigate('/login')}
            >
              <LogIn className='mr-2 h-4 w-4' />
              <span>{t('appbar.login')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => navigate('/signup')}
            >
              <UserPlus className='mr-2 h-4 w-4' />
              <span>{t('appbar.signup')}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
