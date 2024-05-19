<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();
const authStore = useAuthStore();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  authStore.logout();
  router.push('/login');
  if (error) console.log(error);
}
</script>


<template>
  <div>
    <header class="bg-gradient-to-r from-gray-800 to-black p-6 shadow-md">
      <nav class="container mx-auto flex justify-between items-center">
        <ul class="flex space-x-4">
          <li>
            <NuxtLink
              to="/"
              class="text-white hover:text-gray-400 transition-colors duration-300"
            >Home</NuxtLink>
          </li>
          <li v-if="authStore.isLoggedIn">
            <NuxtLink
              to="/about"
              class="text-white hover:text-gray-400 transition-colors duration-300"
            >About</NuxtLink>
          </li>
        </ul>
        <ul class="flex space-x-4">
          <li v-if="!authStore.isLoggedIn">
            <NuxtLink
              to="/login"
              class="text-white hover:text-gray-400 transition-colors duration-300"
            >Login</NuxtLink>
          </li>
          <li v-if="!authStore.isLoggedIn">
            <NuxtLink
              to="/register"
              class="text-white hover:text-gray-400 transition-colors duration-300"
            >Register</NuxtLink>
          </li>
          <li v-if="authStore.isLoggedIn">
            <button
              @click="signOut"
              class="text-white hover:text-gray-400 transition-colors duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto p-6">
      <NuxtPage />
    </main>
  </div>
</template>
