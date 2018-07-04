import $ from 'jquery';
import Vue from 'vue';
import App from './App.vue';

$(document).ready(() => new Vue(App).$mount('#app'));
