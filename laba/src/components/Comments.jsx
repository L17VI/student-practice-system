import React, { useState } from 'react'; // Добавили useState
import { MessageSquare, AlertCircle, Send } from 'lucide-react';

const Comments = () => {
  // 1. Создаем состояние для текста вопроса
  const [question, setQuestion] = useState("");
  // 2. Состояние для фокуса (чтобы менять рамку при клике)
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (question.trim()) {
      alert(`Ваш вопрос отправлен: ${question}`);
      setQuestion(""); // Очищаем поле после отправки
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-slate-400" />
        <h3 className="font-bold text-slate-900">Комментарий руководителя</h3>
      </div>

      {/* Оранжевый блок внимания */}
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2 text-orange-600 font-medium text-sm mb-1">
          <AlertCircle className="w-4 h-4 mt-0.5" /> Требуется исправить:
        </div>
        <p className="text-slate-700 text-sm pl-6">Пожалуйста, приложите письмо-подтверждение и уточните период практики.</p>
      </div>

      {/* Лента сообщений (статичная) */}
      <div className="space-y-6 pl-4 border-l-2 border-slate-100 mb-6">
         <div className="relative">
            <div className="text-sm text-slate-800 mb-1">Добрый день! Ваша заявка принята к рассмотрению. Ожидайте ответа в течение 3 рабочих дней.</div>
            <div className="text-xs text-slate-400">10.01.2026 • Руководитель практики</div>
         </div>
         <div className="relative">
            <div className="text-sm text-slate-800 mb-1">Пожалуйста, приложите письмо-подтверждение и уточните период практики.</div>
            <div className="text-xs text-slate-400">12.01.2026 • Руководитель практики</div>
         </div>
      </div>
      
      {/* Форма отправки с логикой */}
      <div className="mt-6 pt-6 border-t border-slate-100">
         <label htmlFor="user-question" className="font-medium text-sm mb-2 block text-slate-700">
           Вопрос руководителю
         </label>
         
         <textarea
           id="user-question"
           className={`w-full bg-slate-50 rounded-lg p-3 text-sm border transition-all outline-none resize-none h-24
            ${isFocused ? 'border-[#0066B3] bg-white ring-2 ring-blue-50' : 'border-slate-200 text-slate-600'}
           `}
           placeholder="Напишите ваш вопрос..."
           value={question}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
           onChange={(e) => setQuestion(e.target.value)}
         />

         <div className="mt-3 flex justify-end">
            <button 
              onClick={handleSend}
              disabled={!question.trim()} // Кнопка не нажмется, если пусто
              className={`px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
                ${question.trim() 
                  ? 'bg-[#0066B3] hover:bg-blue-700 text-white cursor-pointer shadow-md' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
              `}
            >
              <Send className="w-4 h-4" /> Отправить
            </button>
         </div>
      </div>
    </div>
  );
};

export default Comments;