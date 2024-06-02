<template>
	<div
		class="bg-gradient-to-r cursor-pointer from-stone-100 to-indigo-100 rounded-lg shadow-lg overflow-hidden border border-indigo-900 text-black transform transition-transform duration-200 hover:ring-8 hover:ring-indigo-300"
		@click="redirectToPost"
	>
		<img :src="imageUrl" alt="Post Image" class="w-full h-96" />
		<div class="p-6">
			<h3 class="text-black text-sm uppercase">{{ type }}</h3>
			<h2 class="text-xl font-bold mt-2 mb-4">{{ title }}</h2>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		post_id: Number,
		user_email: String,
		imageUrl: String,
		type: String,
		title: String,
		text: String,
	});
	const router = useRouter();

	const redirectToPost = () => {
		router.push(`/posts/${props.post_id}`);
	};
</script>
