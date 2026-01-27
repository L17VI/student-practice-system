import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, Clock, AlertCircle, 
  CheckCircle2, XCircle, FileEdit, RotateCcw 
} from 'lucide-react';

const ApplicationsList = () => {
  const [activeTab, setActiveTab] = useState('Все');

  // Статистика сверху (из image_3d4b43.png)
  const stats = [
    { label: 'На рассмотрении', count: 2, icon: <Clock className="w-4 h-4 text-blue-500" /> },
    { label: 'Требуют правок', count: 1, icon: <AlertCircle className="w-4 h-4 text-orange-500" /> },
    { label: 'Приняты', count: 2, icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
    { label: 'Отклонены', count: 1, icon: <XCircle className="w-4 h-4 text-red-500" /> },
    { label: 'Черновики', count: 1, icon: <FileEdit className="w-4 h-4 text-slate-500" /> },
  ];

  const applications = [
    { id: 1, title: 'Backend-разработчик', company: 'ООО Програм', city: 'Владивосток', format: 'Удалённо', season: 'Весна', date: '12.01.2026', status: 'На рассмотрении', isNew: true },
    { id: 2, title: 'Пищевой инженер', company: 'ДВФУ', city: 'Владивосток', format: 'Очно', season: 'Лето', date: '11.01.2026', status: 'Требуют правок' },
    { id: 3, title: 'ML-разработчик', company: 'ООО ИскусствИнтел', city: 'Москва', format: 'Гибрид', season: 'Весна', date: '09.01.2026', status: 'Принята' },
    { id: 4, title: 'UX/UI-дизайнер', company: 'ООО Програм', city: 'Владивосток', format: 'Удалённо', season: 'Лето', date: '08.01.2026', status: 'Отклонена' },
    { id: 5, title: 'Frontend-разработчик', company: 'ООО Програм', city: 'Владивосток', format: 'Удалённо', season: 'Весна', date: '07.01.2026', status: 'Черновик' },
    { id: 6, title: 'Data Lab', company: 'ДВФУ / Партнер', city: 'Владивосток', format: 'Очно', season: 'Осень', date: '06.01.2026', status: 'Отозвана' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans bg-[#F8FAFC]">
      <h1 className="text-3xl font-bold mb-1 text-slate-900">Мои заявки</h1>
      <p className="text-slate-500 mb-8 text-sm">Отслеживайте статус заявок и взаимодействуйте с ними</p>

      {/* 1. Блок статистики (скриншот 1) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="bg-slate-50 p-2 rounded-xl">{stat.icon}</div>
            <div>
              <div className="text-lg font-bold text-slate-900">{stat.count}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold leading-tight">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Фильтры и сортировка (скриншот 2) */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {['Все', 'На рассмотрении', 'Требуют правок', 'Приняты', 'Отклонены', 'Черновики', 'Отозваны'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-[#0066B3] text-white shadow-md' 
                  : 'bg-[#EFF2F5] text-slate-600 hover:bg-[#E5E9ED]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#EFF2F5] px-4 py-2 rounded-xl text-sm text-slate-600">
            <span>Сортировка: <span className="font-bold text-slate-900">по обновлению</span></span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <button className="p-2 bg-[#EFF2F5] rounded-xl text-slate-500">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Поиск */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        <input 
          type="text" 
          placeholder="Поиск по названию практики или организации..." 
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-300"
        />
      </div>

      {/* 4. Список заявок */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white border border-slate-50 rounded-[32px] p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-slate-900">Практика: {app.title}</h3>
                  {app.isNew && <span className="bg-[#0066B3] text-[9px] text-white px-2 py-0.5 rounded-md font-black">НОВОЕ</span>}
                </div>
                <div className="text-slate-400 font-medium text-sm">{app.company}</div>
                <div className="flex gap-4 text-xs text-slate-300 pt-1">
                  <span>{app.city}</span> • <span>{app.format}</span> • <span>{app.season}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-5 w-full md:w-auto">
                <StatusBadge status={app.status} />

                {/* Кнопки (скриншот 3) */}
                {/* Контейнер для кнопок одинакового размера */}
                <div className="flex items-center gap-3">
                {/* Кнопка Отозвать (показывается для определенных статусов) */}
                {(app.status === 'На рассмотрении' || app.status === 'Черновик' || app.status === 'Отозвана') && (
                    <button 
                    className="w-36 py-2.5 bg-[#F1F3F5] text-[#868E96] text-sm font-bold rounded-2xl hover:bg-[#E9ECEF] transition-colors text-center"
                    >
                    Отозвать
                    </button>
                )}
                
                {/* Основная кнопка действия */}
                <button 
                    className={`w-36 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm text-center
                    ${app.status === 'Требуют правок' 
                        ? 'bg-[#0066B3] text-white hover:bg-blue-700' 
                        : 'bg-[#0066B3] text-white hover:bg-blue-700'
                    }`}
                >
                    {app.status === 'Требуют правок' ? 'Исправить' : 
                    app.status === 'Черновик' ? 'Продолжить' : 'Открыть'}
                </button>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-[11px] text-slate-300">Обновлено: {app.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Вспомогательный компонент для красивых статусов
const StatusBadge = ({ status }) => {
  const styles = {
    'На рассмотрении': 'bg-blue-50 text-blue-500 border-blue-100',
    'Требуют правок': 'bg-orange-50 text-orange-500 border-orange-100',
    'Принята': 'bg-green-50 text-green-500 border-green-100',
    'Отклонена': 'bg-red-50 text-red-500 border-red-100',
    'Черновик': 'bg-slate-50 text-slate-400 border-slate-100',
    'Отозвана': 'bg-slate-50 text-slate-400 border-slate-100',
  };

  const icons = {
    'На рассмотрении': <Clock className="w-3.5 h-3.5" />,
    'Требуют правок': <AlertCircle className="w-3.5 h-3.5" />,
    'Принята': <CheckCircle2 className="w-3.5 h-3.5" />,
    'Отозвана': <RotateCcw className="w-3.5 h-3.5" />,
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border flex items-center gap-2 ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

export default ApplicationsList;