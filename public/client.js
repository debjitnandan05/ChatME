const socket = io();

let name;
do {
    name = prompt("Please Enter Your Name : ")
} while (!name);



let textarea = document.querySelector("#textarea");
textarea.addEventListener('keyup',(Event)=>{
    if(Event.key === 'Enter'){
        sendMessage(Event.target.value);
    }
})

function sendMessage(message) {
    let msg = {
         user : name,
         message : message.trim()
    }

    //Append the message to the message area
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom();


    // send to server
    socket.emit('message',msg); // (event,object)
}

let messageArea = document.querySelector('.message__area')

function appendMessage(msg,type) {
    
    let mainDiv = document.createElement('div'); // create a new div
    let className = type; // find the type of the message outgoing /incoming
    mainDiv.classList.add(className,"message") // add the class to the new div


    // create markup
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    // add the markup to the maindiv
    mainDiv.innerHTML = markup;

    // append the mainDiv to messagearea
    messageArea.appendChild(mainDiv);
}

// Receive message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
    
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
