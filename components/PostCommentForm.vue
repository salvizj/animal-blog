<template>
	<form
		@submit.prevent="submitComment"
		method="post"
		class="bg-white md:p-4 p-2 rounded-lg shadow-md flex items-center mt-4"
	>
		<input
			v-model="comment"
			type="text"
			placeholder="Write your comment..."
			class="flex-grow p-3 md:text-xl text-black border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
		/>
		<button
			v-if="authStore.isLoggedIn"
			type="submit"
			class="ml-2 bg-indigo-500 md:text-xl text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
		>
			Comment
		</button>
		<button
			v-else
			type="button"
			class="ml-2 bg-indigo-500 md:text-xl text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
			@click="redirectToLogin"
		>
			Login
		</button>
	</form>
	<div
		v-if="showNotification"
		class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out"
	>
		Comment submitted successfully!
	</div>
</template>

<script setup>
	const emit = defineEmits(['commentSubmitted']);
	const authStore = useAuthStore();
	const comment = ref('');
	const showNotification = ref(false);
	const router = useRouter();
	const userEmail = useSupabaseUser().value.email;
	const supabase = useSupabaseClient();

	const submitComment = async () => {
		const postId = router.currentRoute.value.params.postid;
		if (!authStore.isLoggedIn) {
			redirectToLogin();
			return;
		}
		const { error } = await supabase.from('post-comments').insert([
			{
				comment: comment.value,
				post_id: postId,
				user_email: userEmail,
				created_at: new Date().toISOString(),
			},
		]);

		if (error) {
			console.error(error);
		} else {
			comment.value = '';
			showNotification.value = true;
			setTimeout(() => {
				showNotification.value = false;
			}, 3000);
			emit('commentSubmitted');
		}
	};

	const redirectToLogin = () => {
		router.push({ path: '/login' });
	};
</script>
