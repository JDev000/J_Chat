const chatBody = document.querySelector('.chat-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const openaiApiKey = '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';

const generateChatbotResponse = async (userMessage) => {
  const prompt = `User: ${userMessage}\nChatbot: `;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 50,
      temperature: 0.5,
      n: 1,
      stop: '\n'
    })
  };
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', requestOptions);
  const data = await response.json();
  const chatbotResponse = data.choices[0].text.trim();
  return chatbotResponse;
};

sendButton.addEventListener('click', async () => {
  const userMessage = userInput.value;
  if (userMessage) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('user-message');
    const messageText = document.createElement('div');
    messageText.classList.add('chat-message-text');
    messageText.textContent = userMessage;
    messageContainer.appendChild(messageText);
    chatBody.appendChild(messageContainer);
    userInput.value = '';

    const chatbotMessage = document.createElement('div');
    chatbotMessage.classList.add('chat-message');
    const chatbotMessageText = document.createElement('div');
    chatbotMessageText.classList.add('chat-message-text');
    chatbotMessage.appendChild(chatbotMessageText);
    chatBody.appendChild(chatbotMessage);

    chatbotMessageText.textContent = 'Nag-iisip...';
    const chatbotResponse = await generateChatbotResponse(userMessage);
    chatbotMessageText.textContent = chatbotResponse;

    const chatbotMessageIcon = document.createElement('img');
    chatbotMessageIcon.src = 'https://scontent.fmnl9-1.fna.fbcdn.net/v/t39.30808-6/271743890_645808149937828_1002674829048552747_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGVihF6VylCXr4ccOsHHB_hKhTYZSXI0H4qFNhlJcjQfsA6jzE6medXH_p1yBdSGckvDl32imX_mGSRdGAfbSUX&_nc_ohc=GNNIsFKZdvkAX9hFS2L&_nc_zt=23&_nc_ht=scontent.fmnl9-1.fna&oh=00_AfBiaiMmAXXsMFb2Uj-5QDLyuSKAVZhOeSQ0VqMVB6OKOw&oe=6402BCB3'; // replace with your image URL
    chatbotMessageIcon.alt = 'Chatbot icon';
    chatbotMessageIcon.classList.add('chat-message-icon');
    chatbotMessageIcon.style.width = '32px'; // adjust the size as needed
    chatbotMessageIcon.style.height = '32px'; // adjust the size as needed
    chatbotMessageIcon.style.borderRadius = '999px';
    chatbotMessageIcon.style.marginRight = '4px'
    chatbotMessage.insertBefore(chatbotMessageIcon, chatbotMessageText);
  }
});
