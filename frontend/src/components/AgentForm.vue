<script setup lang="ts">
import { ref } from 'vue';
import type { Agent } from '../types/agent';
import { upsertAgent } from '../api/agent';

const agent = ref<Agent>({
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
});

const message = ref('');
const error = ref('');

const handleSubmit = async () => {
  message.value = '';
  error.value = '';
  try {
    const response = await upsertAgent(agent.value);
    message.value = `Agent ${response.data.firstName} ${response.data.lastName} saved successfully!`;
    agent.value = {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
    };
  } catch (err: any) {
    error.value = err.response?.data?.message || 'An error occurred.';
  }
};
</script>

<template>
  <div class="max-w-md mx-auto my-8 p-8 rounded-lg shadow-lg bg-white">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Property Agent Form</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label for="firstName" class="mb-1 font-semibold text-gray-700">First Name</label>
        <input id="firstName" v-model="agent.firstName" type="text" required
               class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex flex-col">
        <label for="lastName" class="mb-1 font-semibold text-gray-700">Last Name</label>
        <input id="lastName" v-model="agent.lastName" type="text" required
               class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex flex-col">
        <label for="email" class="mb-1 font-semibold text-gray-700">Email</label>
        <input id="email" v-model="agent.email" type="email" required
               class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex flex-col">
        <label for="mobileNumber" class="mb-1 font-semibold text-gray-700">Mobile Number</label>
        <input id="mobileNumber" v-model="agent.mobileNumber" type="text" required
               class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
       <div class="flex flex-col">
        <label for="id" class="mb-1 font-semibold text-gray-700">Agent ID (Optional)</label>
        <input id="id" v-model="agent.id" type="text" placeholder="Leave blank to create a new agent"
               class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button type="submit"
              class="p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-200">
        Save Agent
      </button>
    </form>
    <div v-if="message" class="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">{{ message }}</div>
    <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-center">{{ error }}</div>
  </div>
</template>