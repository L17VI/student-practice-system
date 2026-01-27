import React from 'react';
import { FileText } from 'lucide-react';

const ApplicationInfo = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900">Данные заявки</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
           <div>
              <div className="text-xs text-slate-400 mb-1">Период</div>
              <div className="text-sm font-medium text-slate-800">Весна 2026</div>
           </div>
           <div>
              <div className="text-xs text-slate-400 mb-1">Формат</div>
              <div className="text-sm font-medium text-slate-800">Удалённо</div>
           </div>
        </div>

        <div className="mb-6">
            <div className="text-xs text-slate-400 mb-1">Контакты</div>
            <div className="text-sm font-medium text-slate-800">student@example.com</div>
        </div>

        <div>
           <div className="text-xs text-slate-400 mb-1">Комментарий студента</div>
           <div className="text-sm text-slate-700">Готов начать практику в любое удобное время. Имею опыт работы с Python и Node.js.</div>
        </div>
    </div>
  );
};

export default ApplicationInfo;