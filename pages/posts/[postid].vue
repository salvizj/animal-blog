<template>
	<div
		class="bg-gradient-to-r from-stone-100 to-indigo-100 shadow-md overflow-hidden text-black mx-auto md:w-1/2"
	>
		<div class="p-4">
			<h2 class="md:text-3xl font-bold">{{ post.title }}</h2>
			<h3 class="text-black md:text-xl uppercase">
				Animal type: {{ post.type }}
			</h3>
			<img
				:src="post.imageUrl"
				alt="Post Image"
				class="w-full h-auto object-cover pt-10 pb-10"
			/>
			<p class="text-black-700 md:text-3xl">{{ post.text }}</p>
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
	const route = useRoute();
	const post = route.query;
</script>
