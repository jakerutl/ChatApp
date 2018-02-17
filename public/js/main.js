(() => {
	const socket = io();

	var FADE_TIME = 150;

	let messageList = document.querySelector('ul'),
		newMessage = document.querySelector('li'),
		chatForm = document.querySelector('form'),
		nameInput = document.querySelector('.nickname'),
		chatMessage = chatForm.querySelector('.message'),
		typing = document.querySelector('#m'),
		textB = document.querySelector('.TextBox')
		nickName = null;

		function setNickname() {
			//debugger
			nickName = this.value;
			socket.emit('saveNickName', nickName);
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
	function handleNickname(){
		let Thisvalue = this.value;
		socket.emit('new user',Thisvalue);
	}

	function appendMessage(msg) {
		// debugger;
		textB.scrollTop +=300;
		let newMsg = document.createElement('li');
				newMsg.innerHTML = msg.message;
				messageList.appendChild(newMsg);
				setTimeout(function(){
					newMsg.classList.add('loadText');
				},200);
		// let newMsg = `<li class="loadText">${msg.message}</li>`;//message is an object
		// messageList.innerHTML += newMsg;//makes a list item and appends to container
	}

			function isTyping(){
				if(typing.value !==""){
					socket.emit('typing...', true);
				}else{
					socket.emit('typing...', false);
				}

			}

	var typingArea = document.querySelector('.typing');

	function currentlyTyping(data){
		if(data.isTyping){
			typingArea.innerHTML=data.user+" typing...";
		}else{
			typingArea.innerHTML="";
		}
	}

	function appendDiscMessage(msg) {
		// debugger;
		let newMsg = `<li>${msg}</li>`;//this does not include an object it's just a string
		messageList.innerHTML += newMsg;
	}

	typing.addEventListener('input', isTyping, false);
	nameInput.addEventListener('change', handleNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);//listneing from server
	socket.addEventListener('disconnect message', appendDiscMessage, false);//listneing from server
	socket.addEventListener('typing...',currentlyTyping,false);
	//socket events can be called whatever you want



})();
