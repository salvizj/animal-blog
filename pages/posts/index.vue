<template>
	<PostFilterForm @filter="filterPosts" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<PostCard
			v-for="post in fetchData"
			:key="post.post_id"
			:post_id="post.post_id"
			:imageUrl="post.publicUrl"
			:type="post.type"
			:title="post.title"
			:text="post.text"
			:unused-text="post.text"
		/>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});

	const fetchData = ref([]);
	const supabase = useSupabaseClient();

	const fetchPosts = async (filters = {}) => {
		try {
			let query = supabase.from('posts').select();

			if (filters.type) {
				query = query.ilike('type', `%${filters.type}%`);
			}

			if (filters.title) {
				query = query.ilike('title', `%${filters.title}%`);
			}

			const { data: postData, error } = await query;
			if (error) {
				throw error;
			}

			fetchData.value = postData.map((post) => ({
				...post,
				publicUrl: post.image_url
					? JSON.parse(post.image_url).data.publicUrl
					: '',
			}));
		} catch (error) {
			console.error('Failed to fetch data:', error.message);
		}
	};

	const filterPosts = async (filters) => {
		await fetchPosts(filters);
	};

	onMounted(async () => {
		await fetchPosts();
	});
</script>
