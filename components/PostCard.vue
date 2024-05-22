<template>
	<div class="bg-white rounded-lg shadow-lg overflow-hidden">
		<img
			:src="imageUrl"
			alt="Post Image"
			class="w-full h-64 object-cover"
		/>
		<div class="p-6 text-black">
			<h3 class="">{{ type }}</h3>
			<h2 class="text-xl font-bold mb-2">{{ title }}</h2>
			<p class="text-gray-700">{{ text }}</p>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		user_id: String,
		imageUrl: String,
		type: String,
		title: String,
		text: String,
	});
</script>
