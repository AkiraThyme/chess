<template>
    <div class="chat-container">
        <div class="chat-box">
        <div v-for="(message, index) in messages" :key="index" :class="['chat-message', message.sender]">
            {{ message.text }}
        </div>
        </div>
        <div class="chat-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>
  
<script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import socket from '../../services/socket';

  export default {
    name: 'Chat',
    setup() {
      const messages = ref([]);
      const newMessage = ref('');
      const color = ref('');

      const sendMessage = () => {
        if (newMessage.value.trim() !== '') {
          socket.emit('chat message', { text: newMessage.value, sender: 'me' });
          messages.value.push({ text: `me: ${newMessage.value}`, sender: 'me' });
          newMessage.value = '';
        }
      };

      onMounted(() => {
        socket.on('chat message', (msg) => {
          messages.value.push({ text: `${msg.sender}: ${msg.text}`, sender: 'opponent' });
        });

        socket.on('assignColor', (data) => {
          color.value = data.color;
        });
      });

      return {
        messages,
        newMessage,
        sendMessage,
      };
    },
  };
</script>

  
<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #e8f0fe;
  }
  
  .chat-box {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background-color: #e3f2fd;
  }
  
  .chat-message {
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 15px;
    max-width: 70%;
  }
  
  .me {
    background-color: #1e88e5;
    color: white;
    align-self: flex-end;
    text-align: right;
  }
  
  .opponent {
    background-color: #e0e0e0;
    color: black;
    align-self: flex-start;
    text-align: left;
  }
  
  .chat-input {
    display: flex;
    gap: 5px;
    padding: 10px;
  }
  
  .chat-input input {
    flex-grow: 1;
    padding: 8px;
  }
  
  .chat-input button {
    padding: 8px 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .chat-input button:hover {
    background-color: #45a049;
  }
</style>
  