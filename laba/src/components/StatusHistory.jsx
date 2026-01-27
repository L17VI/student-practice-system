import React from 'react';
import { Clock } from 'lucide-react';

const StatusHistory = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900">История статусов</h3>
        </div>

        <div className="relative pl-2 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
           {/* Item 1 */}
           <div className="relative flex gap-4">
              <div className="w-5 h-5 rounded-full bg-slate-400 border-4 border-white z-10 shrink-0 mt-0.5 shadow-sm"></div>
              <div>
                 <div className="text-sm font-medium text-slate-700">Заявка создана</div>
                 <div className="text-xs text-slate-400">10.01.2026, 10:30</div>
              </div>
           </div>

           {/* Item 2 */}
           <div className="relative flex gap-4">
              <div className="w-5 h-5 rounded-full bg-[#0066B3] border-4 border-white z-10 shrink-0 mt-0.5 shadow-sm"></div>
              <div>
                 <div className="text-sm font-medium text-slate-700">На рассмотрении</div>
                 <div className="text-xs text-slate-400">10.01.2026, 10:32</div>
              </div>
           </div>

           {/* Item 3 */}
           <div className="relative flex gap-4">
              <div className="w-5 h-5 rounded-full bg-slate-400 border-4 border-white z-10 shrink-0 mt-0.5 shadow-sm"></div>
              <div>
                 <div className="text-sm font-medium text-slate-700">Комментарий руководителя</div>
                 <div className="text-xs text-slate-400">12.01.2026, 14:15</div>
              </div>
           </div>

           {/* Item 4 (Active) */}
           <div className="relative flex gap-4">
              <div className="w-5 h-5 rounded-full bg-orange-400 border-4 border-white z-10 shrink-0 mt-0.5 shadow-sm"></div>
              <div>
                 <div className="text-sm font-medium text-slate-700">Требуют правок</div>
                 <div className="text-xs text-slate-400">12.01.2026, 14:15</div>
              </div>
           </div>
        </div>
    </div>
  );
};

export default StatusHistory;