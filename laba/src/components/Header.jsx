import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Лого и меню */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#0066B3] rounded-full flex items-center justify-center text-white font-bold text-lg">П</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">ПрофиПрактик</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-[#0066B3] transition">Каталог</a>
            <a href="#" className="text-[#0066B3] font-semibold">Мои заявки</a>
            <a href="#" className="hover:text-[#0066B3] transition">Профиль</a>
          </nav>
        </div>

        {/* Иконки справа */}
        <div className="flex items-center gap-4 text-slate-400">
          <div className="relative cursor-pointer hover:text-slate-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#0066B3] rounded-full border border-white"></span>
          </div>
          <User className="w-5 h-5 cursor-pointer hover:text-slate-600" />
          <Search className="w-5 h-5 md:hidden cursor-pointer" /> 
        </div>
      </div>
    </header>
  );
};

export default Header;