	// <a href="https://www.flaticon.com/free-icons/fullscreen" title="fullscreen icons">Fullscreen icons created by IYAHICON - Flaticon</a>
	
    // Создание кнопки
    const button = document.createElement('button');
	//button.innerText = 'Toggle Fullscreen'; // Удалите этот текст, если будете использовать картинку
	//button.title = 'Toggle Fullscreen';
	button.style.position = 'fixed';
	button.style.bottom = '20px';
	button.style.right = '20px';
	button.style.zIndex = '1000';
	button.style.backgroundColor = 'transparent'; // Установите фон прозрачным
	button.style.opacity = '0.5'; // Полупрозрачность
	button.style.width = '15vh'; // Ширина
	button.style.height = '15vh'; // Высота
	button.style.border = 'none'; // Убрать стандартную рамку
	button.style.backgroundImage = 'url("' + chrome.runtime.getURL('icons/fullscreen512.png') + '")';
	button.style.backgroundSize = 'cover'; // Размер фона
	button.style.transition = 'opacity 0.5s'; // Анимация для плавности
	button.style.visibility = 'hidden';
    document.body.appendChild(button);

    // Функция для переключения полноэкранного режима
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };
	
	const hide = () => {
		
		//mouseup вызывается вместе с touchstart, так что скрываем с паузой
		setTimeout(() => {
			if (button.style.visibility == 'visible') {
				// Прячем кнопку с задержкой на анимацию
				button.style.opacity = '0';
				setTimeout(() => {
					button.style.visibility = 'hidden';
				}, 500); // 500 мс - продолжительность анимации opacity		
			
			}
		}, 1000);

	};
	
	// Функция для обновления видимости кнопки с анимацией
	const show = () => {

		// Проверяем, необходимо ли изменить состояние видимости
		if (button.style.visibility !== 'visible') {
			
			setTimeout(() => {
				button.style.opacity = '0.5';
				button.style.visibility = 'visible';			
			}, 500);
			
		}
	};

    // События для переключения и обновления видимости кнопки
    button.addEventListener('click', toggleFullscreen);
    document.addEventListener('mouseup', hide);
    document.addEventListener('touchstart', show);
