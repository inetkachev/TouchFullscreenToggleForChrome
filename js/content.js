	// <a href="https://www.flaticon.com/free-icons/fullscreen" title="fullscreen icons">Fullscreen icons created by IYAHICON - Flaticon</a>
	
    let isFullscreen = document.fullscreenElement;
    let lastInteractionType = 'mouse';

    // Отслеживание типа последнего взаимодействия	
    document.addEventListener('mousedown', () => lastInteractionType = 'mouse');
    document.addEventListener('touchstart', () => lastInteractionType = 'touch');

    // Создание кнопки
    const button = document.createElement('button');
	//button.innerText = 'Toggle Fullscreen'; // Удалите этот текст, если будете использовать картинку
	//button.title = 'Toggle Fullscreen';
	button.style.position = 'fixed';
	button.style.bottom = '20px';
	button.style.right = '20px';
	button.style.zIndex = '1000';
	//button.style.borderRadius = '50%'; // Круглая форма
	button.style.backgroundColor = 'transparent'; // Установите фон прозрачным
	button.style.opacity = '0.5'; // Полупрозрачность
	button.style.width = '15vh'; // Ширина
	button.style.height = '15vh'; // Высота
	button.style.border = 'none'; // Убрать стандартную рамку
	//button.style.backgroundImage = 'url("icons/fullscreen512.png")'; // Путь к изображению
	//button.style.backgroundImage = chrome.runtime.getURL('icons/fullscreen512.png');
	button.style.backgroundImage = 'url("' + chrome.runtime.getURL('icons/fullscreen512.png') + '")';
	//button.style.backgroundImage = 'url("' + chrome.extension.getURL('icons/fullscreen512.png') + '")';
	button.style.backgroundSize = 'cover'; // Размер фона
	button.style.transition = 'opacity 0.5s'; // Анимация для плавности
    document.body.appendChild(button);

    // Функция для переключения полноэкранного режима
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            isFullscreen = true;
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            isFullscreen = false;
        }
    };

	// Функция для обновления видимости кнопки с анимацией
	const updateButtonVisibility = () => {
		const shouldBeVisible = isFullscreen || lastInteractionType === 'touch';

		// Проверяем, необходимо ли изменить состояние видимости
		if ((shouldBeVisible && button.style.visibility !== 'visible') || 
			(!shouldBeVisible && button.style.visibility !== 'hidden')) {
			
			if (shouldBeVisible) {
				setTimeout(() => {			
					// Показываем кнопку
					button.style.opacity = '0.5';
					button.style.visibility = 'visible';
					setTimeout(() => {
						// Чтоб не мозолила глаза, скрываем (в надежде что успеет нажать на нее)
						lastInteractionType = 'mouse'
						updateButtonVisibility();
					}, 1000); // 500 мс - продолжительность анимации opacity
				}, 500); // 500 мс - продолжительность анимации opacity
				
			} else {
				// Прячем кнопку с задержкой
				button.style.opacity = '0';
				setTimeout(() => {
					button.style.visibility = 'hidden';
				}, 500); // 500 мс - продолжительность анимации opacity
			}
		}
	};

    // События для переключения и обновления видимости кнопки
    button.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateButtonVisibility);
    document.addEventListener('mousemove', updateButtonVisibility);
    document.addEventListener('touchstart', updateButtonVisibility);
	
    // Инициализация видимости кнопки
    updateButtonVisibility();
	
