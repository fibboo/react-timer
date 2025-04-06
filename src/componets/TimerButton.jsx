export default function TimerButton({onClick, children}) {
  return (
      <button
          className="
            bg-stone-300
            hover:bg-stone-400
            text-gray-900
            px-6 py-3
            rounded-2xl
            font-bold
            shadow-lg                    // объемная тень
            transition-transform         // плавная анимация
            duration-150                 // продолжительность анимации
            active:scale-95              // уменьшение кнопки при нажатии
            active:shadow-inner          // изменение тени (внутрь) при нажатии
          "
          onClick={onClick}
      >
        {children}
      </button>
  );

}