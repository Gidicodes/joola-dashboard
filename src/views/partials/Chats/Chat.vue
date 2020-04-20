<template>
  <section class="jo-chat">
    <div class="jo-chat-list">
      <b-list-group>
        <b-list-group-item
          v-for="chat in chats"
          :key="chat.id"
          @click="viewChat(chat.id)"
          :class="getActiveChat(chat.id)"
        >
          <div class="jo-chat-list-single">
            <img :src="chat.user.avatar_url" />
            <div>
              <p class="jo-chat-list-single-title">
                {{ chat.user.first_name }} {{ chat.user.last_name }}
              </p>
              <p class="jo-chat-list-single-content">
                {{ chat.last_message.message }}
              </p>
            </div>
            <span>{{ humanFormat(chat.last_message.created_at) }}</span>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="jo-chat-message">
      <div class="jo-chat-message-section">
        <div v-for="(messages, key) in chat_messages" :key="key" class="jo-chat-message-date-group">
            <span class="jo-chat-message-section-date">{{dateToFromNowDaily(key)}}</span>
          <div
            v-for="message in messages"
            :key="message.id"
            class="jo-chat-message-section-chat"
            :class="getMessageClass(message.author.uuid)">
            <img :src="message.author.avatar_url" alt />
            <div class="jo-chat-message-section-chat-name">
              <span>{{ message.author.first_name }}</span>
              <div class="jo-chat-message-section-chat-bubble">
                <p>{{ message.message }}</p>
                <span>{{ timeFormat(message.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="jo-chat-message-keypad">
        <div>
          <input
            class="jo-input-dark"
            type="text"
            v-model="user_message"
            @keyup.enter="sendMessage()"
          />
          <button class="btn btn-primary" @click="sendMessage()">Send</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { chat } from '@/services/chat.service';
import moment from 'moment';
export default {
  data() {
    return {
      chats: '',
      chat_messages: {},
      user_message: '',
      activeChat: null,
    };
  },
  mounted() {
    this.getChat();
  },
  methods: {
    getChat() {
      chat
        .getAll()
        .then(response => {
          this.chats = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getActiveChat(id){
        return id === this.activeChat ? 'active': '';
    },
    humanFormat(date) {
      return moment(date).fromNow(true);
    },
    viewChat(id) {
      chat.getChatHistory({ id: id }).then(response => {
        this.formatMessage(response.data);
      });
      this.activeChat = id;
    },
    formatMessage(data) {
      this.chat_messages = [];
      this.chat_messages = data;
    },
    isUser(uuid) {
      return uuid === this.$store.getters.GET_USER.uuid;
    },
    getMessageClass(uuid) {
      return this.isUser(uuid) == true ? 'sender' : 'receiver';
    },
    sendMessage() {
      let id = this.activeChat;
      let message = this.user_message;
      if (id == null) {
        this.$toastr.error('', 'Please select an active chat!', {
          timeOut: 5000,
        });
        return;
      }
      chat.postMessage({ id: id, message: message }).then(response => {
        let lastProperty;
        for (lastProperty in this.chat_messages);
        this.chat_messages[lastProperty].push({
          ...response.data,
          author: this.$store.getters.GET_USER,
          class: 'sender',
        });
      });
      this.user_message = '';
    },
    timeFormat(date){
        return moment(date).format("HH:mm");
    },
    dateToFromNowDaily( myDate ) {
    let fromNow = moment( myDate ).fromNow();
    return moment( myDate ).calendar( null, {
        lastWeek: '[Last] dddd',
        lastDay:  '[Yesterday]',
        sameDay:  '[Today]',
        nextDay:  '[Tomorrow]',
        nextWeek: 'dddd',
        sameElse: function () {
            return "[" + fromNow + "]";
        }
    });
    }
  },
};
</script>
