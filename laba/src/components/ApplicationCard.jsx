import React from 'react';
import { ChevronLeft, MapPin, Monitor, Calendar, AlertCircle } from 'lucide-react';

const ApplicationCard = () => {
  return (
    <div className="mb-6">
      {/* Хлебные крошки */}
      <a href="#" className="flex items-center text-[#0066B3] text-sm font-medium mb-3 hover:underline w-fit">
        <ChevronLeft className="w-4 h-4 mr-1" />
        К моим заявкам
      </a>
      
      <div className="text-xs text-slate-400 mb-1">Заявка № 01234 • Обновлено: 12.01.2026</div>
      <h1 className="text-2xl font-bold mb-1 text-slate-900">Заявка на практику</h1>
      <p className="text-slate-500 text-sm mb-6">Отслеживайте статус и выполняйте действия по заявке</p>

      {/* Белая карточка */}
      <div className="bg-white rounded-xl p-6 shadow-sm relative">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1 text-slate-900">Backend-разработчик</h2>
            <p className="text-slate-500 mb-4">ООО Програм</p>
            
            <div className="flex flex-wrap gap-2 text-sm text-slate-600">
              <span className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Владивосток
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                <Monitor className="w-3 h-3" /> Удалённо
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Весна 2026
              </span>
            </div>
            <div className="mt-4 text-sm text-slate-400">Дата подачи: 10.01.2026</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Требуют правок
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;