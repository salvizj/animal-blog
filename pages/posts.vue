<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<PostCard
			v-for="post in postsData"
			:key="post.id"
			:imageUrl="getStorageImageUrl(post.userId)"
			:title="post.title"
			:text="post.text"
		/>
	</div>
</template>

<script setup>
	import PostCard from '~/components/PostCard.vue';

	const postsData = ref([]);
	const supabase = useSupabaseClient();

	// Function to get the storage image URL for a specific user ID
	const getStorageImageUrl = (userId) => {
		return `posts/${userId}/image.jpg`;
	};

	onMounted(async () => {
		try {
			// Fetch data from the regular table 'posts'
			const { data: postData } = await supabase.from('posts').select();
			postsData.value = postData;
		} catch (error) {
			console.error('Failed to fetch data:', error.message);
		}
	});
</script>
