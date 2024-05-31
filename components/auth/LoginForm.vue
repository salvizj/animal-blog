<template>
	<form
		@submit.prevent="signIn"
		method="post"
		class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
	>
		<h1
			class="pb-6 font-semibold text-2xl md:text-2xl lg:text-3xl tracking-wider text-center text-black"
		>
			Login
		</h1>
		<div class="mb-4">
			<input
				type="email"
				placeholder="Email"
				v-model="email"
				class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 text-lg text-black"
			/>
		</div>
		<div class="mb-6">
			<input
				type="password"
				placeholder="Password"
				v-model="password"
				class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 text-lg text-black"
			/>
		</div>
		<button
			type="submit"
			class="w-full bg-indigo-800 text-white py-3 rounded-lg hover:bg-indigo-900 text-lg"
		>
			Login
		</button>
	</form>
</template>

<script setup>
	const authStore = useAuthStore();
	const client = useSupabaseClient();
	const router = useRouter();

	const email = ref('');
	const password = ref('');
	const errorsMsg = ref(null);

	const signIn = async () => {
		try {
			const { error } = await client.auth.signInWithPassword({
				email: email.value,
				password: password.value,
			});
			if (error) throw error;
			authStore.login();
			router.push('/');
		} catch (error) {
			errorsMsg.value = error.message;
		}
	};
</script>
