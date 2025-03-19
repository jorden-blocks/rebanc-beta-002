import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "rebanc", 
  showMenu = true, 
  onMenuClick = () => {} 
}) => {
  return (
    <div className="h-14 bg-primary text-white flex items-center justify-between px-4 relative z-5">
      <div className="text-2xl font-bold tracking-tight">{title}</div>
      {showMenu && (
        <button 
          className="p-2 rounded-md hover:bg-white/10"
          onClick={onMenuClick}
        >
          <MoreHorizontal size={24} />
        </button>
      )}
    </div>
  );
};

export default Header;
