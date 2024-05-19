<script setup lang="ts">

definePageMeta({
  middleware: ["auth"],
});
const authStore = useAuthStore();
const client = useSupabaseClient();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorsMsg = ref<string | null>(null);

const SignIn = async () => {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    authStore.login(); 
    router.push("/success");
  } catch (error: any) {
    errorsMsg.value = error.message;
  }
}
</script>
<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="SignIn"
      method="post"
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <h1 class="p-2 flex flex-wrap content-center">Login</h1>
      <div class="mb-4">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-6">
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  </div>
</template>
