import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, CircleX, Plus, CreditCard, Shield } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutGrid size={24} />
    },
    {
      href: '/assets',
      label: 'Assets',
      icon: <CircleX size={24} />
    },
    {
      href: '/buy',
      label: 'Kopen',
      icon: <Plus size={24} />
    },
    {
      href: '/payments',
      label: 'Betalingen',
      icon: <CreditCard size={24} />
    },
    {
      href: '/invest',
      label: 'Investeren',
      icon: <Shield size={24} />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 flex justify-around items-center h-16" style={{ paddingBottom: 'var(--safe-area-inset-bottom)' }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={`no-highlight flex flex-col items-center justify-center text-sm w-1/5 ${
              isActive ? 'text-[#5046e4]' : 'text-gray-500'
            }`}
          >
            <div className="mb-1">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
