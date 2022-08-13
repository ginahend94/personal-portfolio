import GinaHenderson from '../images/GinaHenderson.jpg';
import save from '../functions/save';
import load from '../functions/load';
import chatbot from '../functions/chatbot';
// import Notification from '../files/notification.wav';

export default (() => {
    const container = document.createElement('div');
    container.classList.add('chat', 'container');

    const header = document.createElement('header');
    const pic = new Image();
    pic.src = GinaHenderson;
    pic.alt = 'GH';
    const span = document.createElement('span');
    span.textContent = 'Gina Henderson';
    header.append(pic, span);

    const chatWindow = document.createElement('main');
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator', 'hidden');
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingIndicator.append(dot);
    }
    chatWindow.append(typingIndicator);

    const footer = document.createElement('footer');
    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.classList.add('chat-input');
    chatInput.placeholder = 'Message...';
    const button = document.createElement('button');
    button.classList.add('send');
    button.textContent = 'Send';
    footer.append(chatInput, button);

    container.append(header, chatWindow, footer);

    const messages = [
        'Hi! Welcome to my portfolio!',
        'Thanks so much for stopping by.',
        'You can check out some of my work by opening any of the apps you see.',
        'Have fun, and feel free to look at my contact card to get in touch!',
    ];

    // append chat history to main box

    const chatHistory = load('chatHistory') || [
        // { // test
        //     isSent: true,
        //     text: 'This is a test message!',
        // },
        // { // test
        //     isSent: false,
        //     text: 'Did you mean "text message"?',
        // },
        // { // test
        //     isSent: true,
        //     text: 'NO. TEST message!',
        // },
    ]

    const scrollToBottom = () => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    scrollToBottom()

    const createMessageNode = (text, isSent = false) => {
        const message = document.createElement('div');
        message.classList.add('message', isSent ? 'sent' : 'received');
        message.textContent = text;
        chatWindow.insertBefore(message, typingIndicator);
    }

    const addMessage = (text, isSent = false) => {
        createMessageNode(text, isSent);
        scrollToBottom();
        chatHistory.push({ isSent, text });
        save('chatHistory', chatHistory);
    }

    const sendMessage = () => {
        if (!chatInput.value) return;
        let send = chatInput.value;
        addMessage(chatInput.value, true);
        setTimeout(async () => receiveMessage(await chatbot(send)), 1000);
        // setTimeout(async () => chatbot(chatInput.value), 1000);
        chatInput.value = '';
        // TEST
    }
    button.addEventListener('click', sendMessage)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        sendMessage();
    });
    const showIndicator = (message) => {
        typingIndicator.classList.remove('hidden');
        scrollToBottom();
        let timeout;
        if (message.length <= 50) {
            timeout = 500;
        }
        if (message.length > 50 && message.length <= 200) {
            timeout = 2000;
        }
        if (message.length > 200) {
            console.log('long');
            timeout = 3000;
        }
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
        }, timeout);

        return timeout;
    };

    const notification = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-message-pop-alert-2354.mp3'); // TEMP

    const receiveMessage = (text) => {
        setTimeout(() => {
            addMessage(text);
            notification.play();
        }, showIndicator(text));
    }

    const showIntro = () => {
        for (let i = 0; i < messages.length; i++) {
            ((round) => {
                setTimeout(() => receiveMessage(messages[i]), 1000 + (2000 * round))
            })(i);
        }
    }
    const renderHistory = () => {
        chatHistory.forEach((message) => {
            createMessageNode(message.text, message.isSent);
            scrollToBottom();
        })
    }

    const getText = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        const data = await response.json();
        const obj = data[Math.floor(Math.random() * data.length)];
        return obj.body;
    }

    return {
        container,
        showIntro,
        renderHistory,
    };
})()