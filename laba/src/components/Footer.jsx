import React from 'react';
import { Mail, Phone, MapPin, Search } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0066B3] text-white py-12">
       <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
             {/* Col 1 */}
             <div>
                <h4 className="font-bold mb-6">О сервисе</h4>
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs">П</div>
                   <span className="font-bold text-lg">ПрофиПрактик</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
                   Платформа для организации практики студентов. Находите практику, подавайте заявки и отслеживайте их статус в одном месте.
                </p>
             </div>

             {/* Col 2 */}
             <div>
                <h4 className="font-bold mb-6">Навигация</h4>
                <ul className="space-y-3 text-sm text-blue-100">
                   <li><a href="#" className="hover:text-white transition">Каталог практик</a></li>
                   <li><a href="#" className="hover:text-white transition">Мои заявки</a></li>
                   <li><a href="#" className="hover:text-white transition">Профиль</a></li>
                   <li><a href="#" className="hover:text-white transition">Помощь</a></li>
                </ul>
             </div>

             {/* Col 3 */}
             <div>
                <h4 className="font-bold mb-6">Контакты</h4>
                <ul className="space-y-4 text-sm text-blue-100">
                   <li className="flex items-center gap-3">
                      <Mail className="w-4 h-4" /> support@profipraktik.ru
                   </li>
                   <li className="flex items-center gap-3">
                      <Phone className="w-4 h-4" /> +7 (423) 123-45-67
                   </li>
                   <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-1" /> 
                      <span>690922, г. Владивосток,<br/>о. Русский, п. Аякс, 10</span>
                   </li>
                </ul>
             </div>
          </div>

          <div className="border-t border-blue-500 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-200">
             <div className="bg-[#004C85] rounded-lg px-4 py-2 flex items-center gap-2 w-full md:w-auto mb-4 md:mb-0">
                <Search className="w-4 h-4 text-blue-300" />
                {/* Имитация слайдера поиска */}
                <div className="w-24 h-1 bg-blue-300/30 rounded-full relative mx-2">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                </div>
                <Search className="w-4 h-4 text-white" />
             </div>
             <div>© 2026 ПрофиПрактик. Все права защищены.</div>
          </div>
       </div>
    </footer>
  );
};

export default Footer;