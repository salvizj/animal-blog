<template>
	<div v-if="post" class="container mx-auto">
		<h2 class="md:text-3xl text-xl text-white font-bold p-4">
			{{ post.title }}
		</h2>
		<div
			class="overflow-hidden text-white flex flex-col gap-10 p-4 md:flex-row"
		>
			<img
				:src="post.publicUrl"
				alt="Post Image"
				class="w-96 h-auto object-cover pt-10 pb-10"
			/>
			<div>
				<p class="text-white-700 text-xl md:text-2xl">
					{{ post.text }}
				</p>
			</div>
		</div>
		<PostComments />
	</div>
	<div v-else>
		<p>Loading...</p>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	const postId = route.params.postid;

	const post = ref(null);
	const supabase = useSupabaseClient();

	const fetchPostById = async (postId) => {
		try {
			if (!postId) {
				throw new Error('Post ID is not defined');
			}

			const { data: postData, error } = await supabase
				.from('posts')
				.select()
				.eq('post_id', postId)
				.single();

			if (error) {
				throw error;
			}

			post.value = {
				...postData,
				publicUrl: postData.image_url
					? JSON.parse(postData.image_url).data.publicUrl
					: '',
			};
		} catch (error) {
			console.error('Failed to fetch post:', error.message);
		}
	};

	onMounted(async () => {
		await fetchPostById(postId);
	});
</script>
