<template>
	<h2
		class="md:text-3xl text-xl text-black font-bold bg-gradient-to-r from-stone-100 to-indigo-100 p-4"
	>
		{{ post.title }}
	</h2>
	<div
		class="bg-gradient-to-r from-stone-100 to-indigo-100 shadow-md overflow-hidden text-black flex flex-col justify-center gap-10 p-4 md:flex-row"
	>
		<img
			:src="post.imageUrl"
			alt="Post Image"
			class="w-96 h-auto object-cover pt-10 pb-10"
		/>
		<div>
			<p class="text-black-700 text-xl md:text-3xl">{{ post.text }}</p>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
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
