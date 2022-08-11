import GinaHenderson from '../images/GinaHenderson.jpg';
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
        'Hi! Welcome to my site!',
        'Thanks so much for stopping by.',
        'You can check out some of my work by opening any of the apps you see.',
        'Have fun, and feel free to look at my contact card to get in touch!',
    ];

    // append chat history to main box

    const chatHistory = [
        { // test
            isSent: true,
            text: 'This is a test message!',
        },
        { // test
            isSent: false,
            text: 'Did you mean "text message"?',
        },
        { // test
            isSent: true,
            text: 'NO. TEST message!',
        },
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
        console.log(chatHistory)
    }
    
    chatHistory.forEach((message) => {
        createMessageNode(message.text, message.isSent);
    })

    const sendMessage = () => {
        if (!chatInput.value) return;
        addMessage(chatInput.value, true);
        chatInput.value = '';
    }
    button.addEventListener('click', sendMessage)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        sendMessage();
    });
    const showIndicator = (message) => {
        // type 5 characters per second
        typingIndicator.classList.remove('hidden');
        scrollToBottom();
        let timeout;
        if (message.length <= 200) {
            timeout = 500;
        }
        if (message.length > 200 && message.length <= 500) {
            console.log('med');
            timeout = 2000;
        }
        if (message.length > 500) {
            console.log('long');
            timeout = 3000;
        }
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
        }, timeout);

        return timeout;
    };
    const receiveMessage = (text) => {
        setTimeout(() => addMessage(text), showIndicator(text));
    }

    const showIntro = () => {
        for (let i = 0; i < messages.length; i++) {
            ((round) => {
                setTimeout(() => receiveMessage(messages[i]), 1000 + (2000 * round))
            })(i);
        }
    }

    const getText = () => {
        return fetch(`https://jsonplaceholder.typicode.com/comments`)
            .then(resp => resp.json())
            .then(data => data[Math.floor(Math.random() * data.length)].body)
            .catch(err => console.log(err));
    }

    return {
        container,
        showIntro
    };
})()