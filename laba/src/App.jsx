import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
// Импортируем обе страницы
import ApplicationsList from './components/ApplicationsList'; // Новая страница списка
import ApplicationCard from './components/ApplicationCard'; // Старая детальная страница
import NextStep from './components/NextStep';
import Comments from './components/Comments';
import Documents from './components/Documents';
import ApplicationInfo from './components/ApplicationInfo';
import StatusHistory from './components/StatusHistory';

function App() {
  // Состояние: 'list' (список) или 'detail' (детальная страница)
  const [page, setPage] = useState('list');

  return (
    <div className="min-h-screen bg-[#F2F4F7] font-sans text-slate-800 flex flex-col">
      <Header />
      
      {/* Контент меняется в зависимости от стейта */}
      <main className="flex-grow w-full">
        {page === 'list' ? (
          <div onClick={() => setPage('detail')} className="cursor-pointer">
             <ApplicationsList />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Кнопка назад */}
            <button onClick={() => setPage('list')} className="text-[#0066B3] mb-4 flex items-center gap-1 font-medium">
               ← Назад к списку
            </button>
            <ApplicationCard />
            <NextStep />
            <Comments />
            <Documents />
            <ApplicationInfo />
            <StatusHistory />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;