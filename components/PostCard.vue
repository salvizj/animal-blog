<template>
	<div
		class="bg-gradient-to-r from-stone-100 to-indigo-100 rounded-lg shadow-lg overflow-hidden border border-indigo-900 text-black transform transition-transform duration-200 hover:scale-105"
		@click="redirectToPost"
	>
		<img
			:src="imageUrl"
			alt="Post Image"
			class="w-full h-96 object-cover"
		/>
		<div class="p-6">
			<h3 class="text-black text-sm uppercase">{{ type }}</h3>
			<h2 class="text-xl font-bold mt-2 mb-4">{{ title }}</h2>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		id: Number,
		user_id: String,
		imageUrl: String,
		type: String,
		title: String,
		text: String,
	});

	const router = useRouter();

	const redirectToPost = () => {
		const postId = props.id;
		router.push({
			path: `/posts/${postId}`,
			query: {
				user_id: props.user_id,
				imageUrl: props.imageUrl,
				type: props.type,
				title: props.title,
				text: props.text,
			},
		});
	};
</script>
