<template>
	<div class="min-h-screen flex items-center justify-center">
		<div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
			<h1 class="text-2xl text-black font-semibold text-center mb-8">
				Welcome, {{ user.email }}
			</h1>
			<div class="mb-4">
				<label class="block mb-2 text-indigo-900">Email:</label>
				<input
					v-model="newEmail"
					type="email"
					class="w-full border text-black border-indigo-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
				/>
				<button
					@click="updateEmail"
					class="mt-2 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
				>
					Update Email
				</button>
			</div>
			<div class="mb-4">
				<label class="block mb-2 text-indigo-900">Password:</label>
				<input
					v-model="newPassword"
					type="password"
					class="w-full border text-black border-indigo-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
				/>
				<button
					@click="updatePassword"
					class="mt-2 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
				>
					Update Password
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	let newEmail = '';
	let newPassword = '';

	const updateEmail = async () => {
		if (newEmail.trim() === '') return;
		try {
			const { error } = await supabase.auth.updateUser({
				email: newEmail,
			});
			if (error) throw error;
			console.log('Email updated successfully');
		} catch (error) {
			console.error('Error updating email:', error.message);
		}
	};

	const updatePassword = async () => {
		if (newPassword.trim() === '') return;
		try {
			const { error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (error) throw error;
			console.log('Password updated successfully');
		} catch (error) {
			console.error('Error updating password:', error.message);
		}
	};
</script>
