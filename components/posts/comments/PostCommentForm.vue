<template>
	<form
		@submit.prevent="submitComment"
		class="bg-white md:p-4 p-3 rounded-lg shadow-md flex flex-wrap items-center w-full"
		method="post"
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
			class="ml-2 mt-2 md:mt-0 bg-indigo-500 text-lg md:text-xl text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
		>
			Comment
		</button>
		<button
			v-else
			type="button"
			class="ml-2 mt-2 md:mt-0 bg-indigo-500 text-sm md:text-xl text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
			@click="redirectToLogin"
		>
			Login
		</button>
	</form>
</template>

<script setup>
	const emit = defineEmits(['commentSubmitted']);
	const authStore = useAuthStore();
	const comment = ref('');
	const router = useRouter();
	const supabase = useSupabaseClient();

	const submitComment = async () => {
		const postId = router.currentRoute.value.params.postid;
		if (!authStore.isLoggedIn) {
			redirectToLogin();
			return;
		}
		const userUsername = useSupabaseUser().value.user_metadata.username;
		const { error } = await supabase.from('post-comments').insert([
			{
				comment: comment.value,
				post_id: postId,
				user_username: userUsername,
				created_at: new Date().toISOString().split('T')[0],
			},
		]);

		if (error) {
			console.error(error);
		} else {
			comment.value = '';
			alert('Comment submitted successfully!');
			emit('commentSubmitted');
		}
	};

	const redirectToLogin = () => {
		router.push({ path: '/login' });
	};
</script>
