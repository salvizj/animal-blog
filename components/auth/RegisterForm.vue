<template>
	<form
		@submit.prevent="signUp"
		class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
	>
		<h1
			class="pb-6 font-semibold text-2xl md:text-3xl tracking-wider text-center text-black"
		>
			Register
		</h1>
		<div class="mb-4">
			<input
				type="text"
				placeholder="Username"
				v-model="username"
				class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 text-lg text-black"
			/>
		</div>
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
			Register
		</button>
		<p v-if="errorsMsg" class="text-red-500 mt-4">{{ errorsMsg }}</p>
	</form>
</template>

<script setup>
	const router = useRouter();
	const client = useSupabaseClient();
	const username = ref('');
	const email = ref('');
	const password = ref('');
	const errorsMsg = ref(null);

	const signUp = async () => {
		try {
			const { data, error } = await client.auth.signUp({
				email: email.value,
				password: password.value,
				options: {
					data: {
						username: username.value,
					},
				},
			});
			if (error) throw error;
			router.push('/login');
		} catch (error) {
			errorsMsg.value = error.message;
		}
	};
</script>
