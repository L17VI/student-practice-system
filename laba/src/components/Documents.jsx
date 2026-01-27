import React from 'react';
import { FileText, Download, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

const Documents = () => {
  return (
    <>
      {/* Секция: Мои документы */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-900">Мои документы по заявке</h3>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3 mb-6 text-sm text-slate-700 flex items-center gap-2">
           <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
           <span>Добавьте недостающие документы и нажмите «Исправить и отправить».</span>
        </div>

        <div className="space-y-3">
          {/* Резюме */}
          <DocumentItem 
            title="Резюме.pdf" 
            status="Загружено" 
            statusColor="text-green-600"
            icon={<CheckCircle2 className="w-3 h-3"/>}
            actionText="Заменить"
          />
          {/* Портфолио */}
          <DocumentItem 
            title="Портфолио.pdf" 
            status="Загружено" 
            statusColor="text-green-600"
            icon={<CheckCircle2 className="w-3 h-3"/>}
            actionText="Заменить"
          />
          {/* Письмо (Проблема) */}
          <div className="border border-orange-200 bg-orange-50/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-orange-100 rounded-lg"><FileText className="w-5 h-5 text-orange-500" /></div>
               <div>
                  <div className="text-sm font-medium text-slate-800">Письмо-подтверждение.pdf</div>
                  <div className="text-xs text-orange-500 font-medium">Не загружено</div>
               </div>
            </div>
            <button className="bg-[#0066B3] hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-1 transition">
               <Download className="w-3 h-3" /> Загрузить
            </button>
          </div>

           {/* GitHub */}
           <div className="border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-slate-50 rounded-lg"><FileText className="w-5 h-5 text-slate-400" /></div>
               <div>
                  <div className="text-sm font-medium text-slate-800">GitHub</div>
                  <div className="text-xs text-[#0066B3] cursor-pointer hover:underline">Ссылка</div>
               </div>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
               <ExternalLink className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
               <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg transition">Изменить</button>
            </div>
          </div>
        </div>
      </div>

      {/* Секция: Документы практики */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Документы практики</h3>
            </div>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 transition">
              <Download className="w-3 h-3"/> Скачать всё
            </button>
         </div>
         
         <div className="bg-slate-50 rounded-xl p-1 space-y-1">
            {['Договор (шаблон).docx', 'Направление на практику.pdf', 'Дневник практики (шаблон).docx', 'Отчёт по практике (шаблон).docx'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-white rounded-lg transition group cursor-pointer">
                 <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{doc}</span>
                 </div>
                 <Download className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
              </div>
            ))}
         </div>
         <div className="mt-3 text-xs text-slate-400">Шаблоны можно скачать заранее. Подписание ЭЦП появится позже.</div>
      </div>
    </>
  );
};

// Вспомогательный мини-компонент для этого файла
const DocumentItem = ({ title, status, statusColor, icon, actionText }) => (
  <div className="border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div className="flex items-center gap-3">
       <div className="p-2 bg-slate-50 rounded-lg"><FileText className="w-5 h-5 text-slate-400" /></div>
       <div>
          <div className="text-sm font-medium text-slate-800">{title}</div>
          <div className={`text-xs ${statusColor} flex items-center gap-1`}>{icon} {status}</div>
       </div>
    </div>
    <div className="flex items-center gap-3 sm:justify-end">
       <Download className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
       <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg transition">{actionText}</button>
    </div>
  </div>
);

export default Documents;