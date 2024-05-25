<script setup lang="ts">
	const supabase = useSupabaseClient();
	const router = useRouter();
	const authStore = useAuthStore();

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		authStore.logout();
		router.push('/login');
		if (error) console.log(error);
	};
</script>

<template>
	<div>
		<header
			class="bg-gradient-to-r from-indigo-800 to-black p-4 md:p-6 shadow-md tracking-widest text-xl text-center"
		>
			<nav
				class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-5"
			>
				<ul
					class="flex flex-col gap-5 md:flex-row md:space-x-4 md:space-y-0"
				>
					<li>
						<NuxtLink to="/" class="hover:text-indigo-400"
							>Home</NuxtLink
						>
					</li>
					<li>
						<NuxtLink to="/about" class="hover:text-indigo-400"
							>About</NuxtLink
						>
					</li>
					<li>
						<NuxtLink to="/posts" class="hover:text-indigo-400"
							>Posts</NuxtLink
						>
					</li>
					<li v-if="authStore.isLoggedIn">
						<NuxtLink to="/my-posts" class="hover:text-indigo-400"
							>My posts</NuxtLink
						>
					</li>
					<li v-if="authStore.isLoggedIn">
						<NuxtLink to="/make-post" class="hover:text-indigo-400"
							>Make posts</NuxtLink
						>
					</li>
				</ul>
				<ul
					class="flex flex-col gap-5 md:flex-row md:space-x-4 md:space-y-0"
				>
					<li v-if="authStore.isLoggedIn">
						<NuxtLink to="/profile" class="hover:text-indigo-400"
							>Profile</NuxtLink
						>
					</li>
					<li v-if="!authStore.isLoggedIn">
						<NuxtLink to="/login" class="hover:text-indigo-400"
							>Login</NuxtLink
						>
					</li>
					<li v-if="!authStore.isLoggedIn">
						<NuxtLink to="/register" class="hover:text-indigo-400"
							>Register</NuxtLink
						>
					</li>
					<li v-if="authStore.isLoggedIn">
						<button @click="signOut" class="hover:text-indigo-400">
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</header>
		<main class="container mx-auto p-4 md:p-6">
			<NuxtPage />
		</main>
	</div>
</template>
