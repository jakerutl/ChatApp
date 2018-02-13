(() => {
	const socket = io();

	var FADE_TIME = 150;

	let messageList = document.querySelector('ul'),
		newMessage = document.querySelector('li'),
		chatForm = document.querySelector('form'),
		nameInput = document.querySelector('.nickname'),
		chatMessage = chatForm.querySelector('.message'),
		nickName = null;

		function setNickname() {
			//debugger
			nickName = this.value;
		}

	function handleSendMessage(e) {
		e.preventDefault();//block the default behaviour of the parent (page refresh)
		// debugger;
		nickName = (nickName && nickName.length > 0) ? nickName : 'User';
		msg = `${nickName} Says: ${chatMessage.value}`;

		socket.emit('chat message', msg);
		chatMessage.value = "";
		return false;
	}

	function appendMessage(msg) {
		// debugger;
		let newMsg = document.createElement('li');
				newMsg.innerHTML = msg.message;
				messageList.appendChild(newMsg);
				setTimeout(function(){
					newMsg.classList.add('loadText');
				},200);
		// let newMsg = `<li class="loadText">${msg.message}</li>`;//message is an object
		// messageList.innerHTML += newMsg;//makes a list item and appends to container

	}

	function appendDiscMessage(msg) {
		// debugger;
		let newMsg = `<li>${msg}</li>`;//this does not include an object it's just a string
		messageList.innerHTML += newMsg;
	}



	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);//listneing from server
	socket.addEventListener('disconnect message', appendDiscMessage, false);//listneing from server
	//socket events can be called whatever you want



})();
