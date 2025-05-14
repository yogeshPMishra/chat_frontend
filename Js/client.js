const socket = io('https://chatapp-node.onrender.com')
const form = document.getElementById('send-container')
const messageInput = document.getElementById('message-inp')
const messageContainer = document.querySelector('.container')
var audio = new Audio(`ting.mp3`);

const append = (message,position)=>{
   const messageElement = document.createElement('div')
   messageElement.innerText = message
   messageElement.classList.add('message')
   messageElement.classList.add(position)
   messageContainer.append(messageElement);
   if(position == "left"){
    audio.play()
   }
}

const username = prompt('Enter your username to join');

if(username && username !== null && username !== undefined ){
    socket.emit('new-user-joined',username) 

    socket.on('user-joined',(username)=>{
        append(`${username} joined the chat`,`left`)
    })

    socket.on('receive',(data) =>{
        append(`${data.name}: ${data.message}`,`left`)
    })

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message = messageInput.value;
        append(`You : ${message}`,'right');
        socket.emit('send',message)
        messageInput.value = ""
     })
    
    socket.on('left',(username) =>{
        if(username && username !== null && username !== undefined ){
            append(`${username} left the chat`, 'left')
        }
    })
}
else{
   alert("Username is required");
}




