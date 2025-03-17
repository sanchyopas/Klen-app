import { useEffect } from 'react';

const useAppHeight = () => {
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    // Устанавливаем начальное значение
    appHeight();

    // Добавляем обработчик события resize
    window.addEventListener('resize', appHeight);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);
};

export default useAppHeight;