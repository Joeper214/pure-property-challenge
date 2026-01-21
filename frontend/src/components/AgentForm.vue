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

const handleClear = () => {
  agent.value = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  };
  message.value = '';
  error.value = '';
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-slate-800 mb-2">Property Agent Form</h1>
        <p class="text-slate-500 text-lg">Enter agent details below</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
          <!-- Name Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="firstName" class="mb-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                First Name
              </label>
              <input
                id="firstName"
                v-model="agent.firstName"
                type="text"
                required
                placeholder="Enter first name"
                class="px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>
            <div class="flex flex-col">
              <label for="lastName" class="mb-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Last Name
              </label>
              <input
                id="lastName"
                v-model="agent.lastName"
                type="text"
                required
                placeholder="Enter last name"
                class="px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <label for="email" class="mb-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Email Address
            </label>
            <input
              id="email"
              v-model="agent.email"
              type="email"
              required
              placeholder="agent@example.com"
              class="px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder:text-slate-400"
            />
          </div>

          <!-- Mobile Number -->
          <div class="flex flex-col">
            <label for="mobileNumber" class="mb-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              v-model="agent.mobileNumber"
              type="text"
              required
              placeholder="+1 (555) 000-0000"
              class="px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder:text-slate-400"
            />
          </div>

          <!-- Agent ID -->
          <div class="flex flex-col">
            <label for="id" class="mb-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Agent ID
              <span class="text-slate-400 font-normal normal-case ml-1">(Optional)</span>
            </label>
            <input
              id="id"
              v-model="agent.id"
              type="text"
              placeholder="Leave blank to create a new agent"
              class="px-5 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder:text-slate-400"
            />
          </div>

          <!-- Divider -->
          <div class="border-t border-slate-200 my-2"></div>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              class="flex-1 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Save Agent
            </button>
            <button
              type="button"
              @click="handleClear"
              class="flex-1 px-8 py-4 bg-slate-100 text-slate-700 text-lg font-semibold rounded-xl hover:bg-slate-200 active:bg-slate-300 transition-all duration-200 border-2 border-slate-200"
            >
              Clear Form
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div
          v-if="message"
          class="mt-6 p-5 bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-xl text-center text-lg font-medium"
        >
          {{ message }}
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="mt-6 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl text-center text-lg font-medium"
        >
          {{ error }}
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-slate-400 mt-6 text-sm">
        All fields marked are required unless specified as optional
      </p>
    </div>
  </div>
</template>
