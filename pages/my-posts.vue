<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<PostCard
			v-for="post in filteredPosts"
			:key="post.post_id"
			:imageUrl="post.publicUrl"
			:type="post.type"
			:title="post.title"
			:text="post.text"
		/>
	</div>
</template>

<script setup>
	const user = useSupabaseUser();
	const fetchData = ref([]);
	const filteredPosts = ref([]);
	const supabase = useSupabaseClient();

	onMounted(async () => {
		const userEmail = user.value.email;
		try {
			const { data: postData, error } = await supabase
				.from('posts')
				.select()
				.eq('user_email', userEmail);
			if (error) {
				throw error;
			}

			fetchData.value = postData.map((post) => ({
				...post,
				publicUrl: post.image_url
					? JSON.parse(post.image_url).data.publicUrl
					: '',
			}));

			filteredPosts.value = fetchData.value;
		} catch (error) {
			console.error('Failed to fetch data:', error.message);
		}
	});
</script>
