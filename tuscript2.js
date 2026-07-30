// ========================================== //
// SISTEMA DE NOTIFICACIONES MEJORADO        //
// ========================================== //

// Variables
let notificationInterval;
let isNotificationVisible = false;

// Función para mostrar notificación personalizada
function showCustomNotification(title, body, icon = '🎵', duration = 6000) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;

    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification-item';

    // Obtener hora actual
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    notification.innerHTML = `
        <div class="icon">${icon}</div>
        <div class="content">
            <div class="title">${title}</div>
            <div class="body">${body}</div>
            <div class="time">${timeStr}</div>
        </div>
        <button class="close-notif" onclick="this.closest('.notification-item').classList.add('hide'); setTimeout(() => this.closest('.notification-item').remove(), 500);">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Agregar al contenedor
    container.appendChild(notification);

    // Auto-cerrar después de la duración
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, duration);

    // Cerrar al hacer clic en la notificación (excepto en el botón cerrar)
    notification.addEventListener('click', function(e) {
        if (!e.target.closest('.close-notif')) {
            this.classList.add('hide');
            setTimeout(() => {
                if (this.parentNode) {
                    this.remove();
                }
            }, 500);
        }
    });
}

// Función para mostrar notificación de La Rielera.!! 📻<
function showRadioNotification() {
    const messages = [
        { body: '🎶 ¡Estás escuchandoLa Rielera.! 📻', icon: '🎵' },
        { body: '🎧 Disfruta de la mejor música', icon: '🎧' },
        { body: '🎵 Música 24/7 para ti', icon: '🎶' },
        { body: '📻 Conéctate con la mejor radio', icon: '✨' }
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    showCustomNotification('La Rielera.!! 📻', randomMsg.body, randomMsg.icon, 5000);
}

// ========================================== //
// NOTIFICACIONES DEL NAVEGADOR              //
// ========================================== //

// Verificar soporte de notificaciones nativas
if ('Notification' in window) {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            // Mostrar notificación personalizada al cargar
            setTimeout(() => {
                showRadioNotification();
            }, 2000);

            // Mostrar cada 5 minutos (300,000 ms)
            notificationInterval = setInterval(showRadioNotification, 300000);

            // También mostrar notificación nativa (para PC)
            function showNativeNotification() {
                const notificationOptions = {
                    body: '🎶 ¡Estás escuchando La Rielera.!',
                    icon: 'js/tren-de-juguete.png',
                    badge: 'js/tren-de-juguete.png',
                    silent: true,
                    requireInteraction: false,
                    tag: 'La Rielera',
                    data: {
                        url: window.location.href
                    }
                };

                try {
                    const notif = new Notification('📻 La Rielera', notificationOptions);

                    // Al hacer clic en la notificación nativa, mostrar la personalizada
                    notif.onclick = function() {
                        window.focus();
                        showRadioNotification();
                        this.close();
                    };
                } catch (e) {
                    // Si falla la notificación nativa, mostrar la personalizada
                    showRadioNotification();
                }
            }

            // Mostrar notificación nativa cada 10 minutos
            setInterval(showNativeNotification, 600000);

            console.log('✅ Notificaciones activadas');
        } else {
            // Si no hay permiso, mostrar notificaciones personalizadas de todos modos
            setTimeout(() => {
                showRadioNotification();
            }, 3000);

            setInterval(showRadioNotification, 300000);
            console.log('ℹ️ Notificaciones personalizadas activas');
        }
    });
} else {
    // Si el navegador no soporta notificaciones, usar las personalizadas
    setTimeout(() => {
        showRadioNotification();
    }, 3000);

    setInterval(showRadioNotification, 300000);
    console.log('ℹ️ Notificaciones personalizadas (sin soporte nativo)');
}

// ========================================== //
// FUNCIÓN PARA PROBAR NOTIFICACIONES        //
// ========================================== //

// Función global para probar notificaciones desde consola
function testNotification() {
    showRadioNotification();
    console.log('🔔 Notificación de prueba enviada');
}

// Hacer accesible globalmente
window.testNotification = testNotification;

console.log('📻 La Rielera - Notificaciones activas');
console.log('💡 Escribe "testNotification()" en consola para probar');

// ==========================================
// ROTACIÓN DE IMÁGENES DE PUBLICIDAD
// ==========================================
(function() {
    var images = document.querySelectorAll('#ad-images img');
    var totalImages = images.length;
    var currentIndex = 0;
    var interval;

    if (totalImages === 0) return;

    function showImage(index) {
        // Ocultar todas las imágenes
        images.forEach(function(img) {
            img.classList.remove('active');
            img.style.display = 'none';
        });

        // Mostrar la imagen seleccionada
        if (images[index]) {
            images[index].classList.add('active');
            images[index].style.display = 'block';
        }

        // Actualizar indicadores
        var dots = document.querySelectorAll('.ad-dot');
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextImage() {
        var next = (currentIndex + 1) % totalImages;
        showImage(next);
    }

    // Crear indicadores
    var indicatorsContainer = document.getElementById('adIndicators');
    if (indicatorsContainer) {
        for (var i = 0; i < totalImages; i++) {
            var dot = document.createElement('span');
            dot.className = 'ad-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                clearInterval(interval);
                showImage(index);
                interval = setInterval(nextImage, 5000);
            });
            indicatorsContainer.appendChild(dot);
        }
    }

    // Iniciar con la primera imagen
    if (images[0]) {
        images[0].classList.add('active');
        images[0].style.display = 'block';
    }

    // Iniciar el carrusel
    interval = setInterval(nextImage, 5000);

    // Pausar al hacer hover
    var container = document.getElementById('ad-images');
    if (container) {
        container.addEventListener('mouseenter', function() {
            clearInterval(interval);
        });
        container.addEventListener('mouseleave', function() {
            interval = setInterval(nextImage, 5000);
        });
    }
})();

// ==========================================
// RELOJ DIGITAL 12 HORAS (SIN SEGUNDOS)
// ==========================================
function updateClock() {
    const now = new Date();
    
    // Obtener hora en formato 12 horas
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convertir a formato 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 en lugar de 0
    
    // Formatear con 2 dígitos
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(now.getMinutes()).padStart(2, '0');
    
    // Actualizar elementos
    document.getElementById('clockHours').textContent = hoursStr;
    document.getElementById('clockMinutes').textContent = minutesStr;
    document.getElementById('clockAmPm').textContent = ampm;
    
    // Fecha
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById('clockDate').textContent = `${day}/${month}/${year}`;
}

// Actualizar cada minuto (no cada segundo)
updateClock();
setInterval(updateClock, 60000);

// ==========================================
// VERIFICAR CONEXIÓN A INTERNET
// ==========================================
const offlineMsg = document.getElementById('offline-message');

function checkConnection() {
    if (!navigator.onLine) {
        offlineMsg.style.display = 'flex';
    } else {
        offlineMsg.style.display = 'none';
    }
}

window.addEventListener('load', function() {
    checkConnection();
});

window.addEventListener('online', checkConnection);
window.addEventListener('offline', checkConnection);

// ==========================================
// CONFIGURACIÓN DEL REPRODUCTOR LUNARADIO
// ==========================================
$("#lunaradio").lunaradio({
    userinterface: "big",
    backgroundcolor: "",
    fontcolor: "#FFFFFF",
    hightlightcolor: "#0000ff",
    fontname: "Courier",
    googlefont: "Orbitron",
    fontratio: "0.4",
    radioname: ".:: La Rielera ::.",
    scroll: "🔴 TRANSMITIENDO EN VIVO",
    scroll: "true",
    coverimage: "js/LOGO.png",
    onlycoverimage: "False",
    coverstyle: "animated",
    usevisualizer: "real",
    visualizertype: "1",
    metadatatechnic: "php",
    ownmetadataurl: "",
    streamurl: "https://stream.zeno.fm/4e68b4cw24zuv",
    streamtype: "other",
    radiozenoid: "1m42oahahycvv",
    icecastmountpoint: "",
    shoutcastpath: "/stream",
    shoutcastid: "1",
    streamsuffix: "",
    radionomyid: "",
    radionomyapikey: "",
    radiojarid: "",
    radiocoid: "",
    itunestoken: "1000lIPN",
    metadatainterval: "15000",
    volume: "50",
    debug: "true",
    autoplay: "true"
});

// ==========================================
// EVENTOS DE LOS BOTONES FLOTANTES
// ==========================================
$("#comment-btn").click(function() {
    $("#comment-modal").addClass("show");
});

$("#info-btn").click(function() {
    $("#info-modal").addClass("show");
});

$("#contact-btn").click(function() {
    $("#contact-modal").addClass("show");
});

// ==========================================
// FUNCIONES PARA CERRAR MODALES
// ==========================================
function closeComments() {
    $("#comment-modal").removeClass("show");
}

function closeInfo() {
    $("#info-modal").removeClass("show");
}

function closeContact() {
    $("#contact-modal").removeClass("show");
}

function closeChatModal() {
    $("#chat-modal").removeClass("show");
}

// ==========================================
// ABRIR CHAT
// ==========================================
$("#chat-btn").click(function() {
    $("#chat-modal").addClass("show");
});

// ==========================================
// FUNCIÓN PARA ENVIAR MENSAJE DEL CHAT
// ==========================================
function sendMessage() {
    alert("Mensaje enviado");
    closeContact();
}

console.log("📻 https://stream.zeno.fm/4e68b4cw24zuv - La Voz de tus Sentidos");
