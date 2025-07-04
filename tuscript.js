


// chat en vivo .................

// Mostrar/Ocultar el selector de emojis
document.getElementById('emojiButton').addEventListener('click', () => {
    const emojiPicker = document.getElementById('emojiPicker');
    emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
});

// Agregar emoji al campo de entrada
document.getElementById('emojiPicker').addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        const emoji = e.target.textContent;
        const chatInput = document.getElementById('chat-input');
        chatInput.value += emoji; // Agrega el emoji al campo de texto
        chatInput.focus(); // Devuelve el foco al campo de texto
        document.getElementById('emojiPicker').style.display = 'none'; // Cierra el selector
    }
});

// Cerrar el selector si se hace clic fuera
document.addEventListener('click', (e) => {
    const emojiPicker = document.getElementById('emojiPicker');
    if (!emojiPicker.contains(e.target) && e.target.id !== 'emojiButton') {
        emojiPicker.style.display = 'none';
    }
});// Abre el modal de chat
document.getElementById('chat-btn').onclick = function() {
    document.getElementById('chat-modal').classList.add('show');
};

// Cierra el modal de chat
function closeChatModal() {
    document.getElementById('chat-modal').classList.remove('show');
}

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBN9IUF9MGQOYmA5Xd7n_l0NyF_RmM_EBU",
    authDomain: "la-rielera.firebaseapp.com",
    projectId: "la-rielera",
    storageBucket: "la-rielera.firebasestorage.app",
    messagingSenderId: "500081422521",
    appId: "1:500081422521:web:54a659510f38c63ce56b68",
    measurementId: "G-D6LHZX81R5"
  };
  

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la colección de mensajes en Firestore
var chatRef = firebase.firestore().collection('chat');

// Enviar un mensaje
function sendMessage() {
    var message = document.getElementById('chat-input').value;
    if (message.trim() !== "") {
        chatRef.add({
            "message": message,
            "timestamp": firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('chat-input').value = '';
    }
}

// Mostrar mensajes en tiempo real
chatRef.orderBy('timestamp').onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === 'added') {
            var message = change.doc.data().message;
            var messageElement = document.createElement('div');
            messageElement.textContent = message;
            document.getElementById('chat-messages').appendChild(messageElement);
        }
    });
});

