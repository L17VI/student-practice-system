import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

const NextStep = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
      <h3 className="font-bold mb-4 text-slate-900">Следующий шаг</h3>
      
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-4 flex items-start gap-3">
         <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
         <span className="text-slate-700 text-sm">Нужны правки: проверьте комментарий руководителя и обновите документы.</span>
      </div>
      
      <button className="bg-[#0066B3] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition duration-200">
        Исправить и отправить <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NextStep;