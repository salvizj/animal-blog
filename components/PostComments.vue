<template>
	<div>
		<PostCommentForm @comment-submitted="fetchComments" />

		<div
			class="flex flex-col items-center justify-center md:justify-center mt-8 md:items-end"
		>
			<p class="mb-2 text-xl">ORDER BY LIKES:</p>
			<div class="flex flex-row justify-center items-center">
				<button
					@click="orderByLikes('asc')"
					class="order-btn mr-2 text-4xl md:text-3x hover:text-indigo-600 transition duration-300 ease-in-out"
				>
					&#9650;
				</button>
				<button
					@click="orderByLikes('desc')"
					class="order-btn mr-2 text-4xl md:text-3x hover:text-indigo-600 transition duration-300 ease-in-out"
				>
					&#9660;
				</button>
			</div>
		</div>

		<div>
			<div v-if="loading" class="text-center mt-8">
				<p class="text-lg font-semibold">Loading comments...</p>
			</div>

			<div v-else-if="comments.length === 0" class="text-center mt-8">
				<p class="text-lg font-semibold">No comments yet.</p>
			</div>

			<div v-else class="mt-4">
				<PostCommentCard
					v-for="comment in comments"
					:key="comment.id"
					:comment="comment"
					class="mb-4"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	const comments = ref([]);
	const loading = ref(false);
	const supabase = useSupabaseClient();
	const sortOrder = ref('asc');

	const fetchComments = async () => {
		loading.value = true;
		const { data, error } = await supabase
			.from('post-comments')
			.select('*')
			.order('likes', { ascending: sortOrder.value === 'asc' });

		if (error) {
			console.error(error);
		} else {
			comments.value = data;
		}
		loading.value = false;
	};

	const orderByLikes = (order) => {
		sortOrder.value = order;
		fetchComments();
	};

	onMounted(() => {
		fetchComments();
	});
</script>
