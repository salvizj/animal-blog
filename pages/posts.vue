<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<PostCard
			v-for="post in fetchData"
			:key="post.id"
			:imageUrl="post.publicUrl"
			:type="post.type"
			:title="post.title"
			:text="post.text"
		/>
	</div>
</template>

<script setup>
	import PostCard from '~/components/PostCard.vue';

	const fetchData = ref([]);
	const supabase = useSupabaseClient();

	onMounted(async () => {
		try {
			const { data: postData, error } = await supabase
				.from('posts')
				.select();
			if (error) {
				throw error;
			}
			fetchData.value = postData.map((post) => ({
				...post,
				publicUrl: post.image_url
					? JSON.parse(post.image_url).data.publicUrl
					: '',
			}));
			console.log(fetchData.value);
		} catch (error) {
			console.error('Failed to fetch data:', error.message);
		}
	});
</script>
