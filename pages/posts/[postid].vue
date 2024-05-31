<template>
	<h2 class="md:text-3xl text-xl text-white font-bold p-4">
		{{ post.title }}
	</h2>
	<div
		class="overflow-hidden text-white flex flex-col gap-10 p-4 md:flex-row"
	>
		<img
			:src="post.imageUrl"
			alt="Post Image"
			class="w-96 h-auto object-cover pt-10 pb-10"
		/>
		<div>
			<p class="text-white-700 text-xl md:text-2xl">{{ post.text }}</p>
		</div>
	</div>
	<PostComments />
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
	const route = useRoute();
	const post = route.query;
</script>
