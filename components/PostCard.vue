<template>
	<div
		class="bg-white rounded-lg shadow-lg overflow-hidden border border-indigo-900 text-black"
	>
		<img
			:src="imageUrl"
			alt="Post Image"
			class="w-full h-48 object-cover"
		/>
		<div class="p-6">
			<h3 class="text-black text-sm uppercase">{{ type }}</h3>
			<h2 class="text-xl font-bold mt-2 mb-4">{{ title }}</h2>
			<p class="text-black">{{ text }}</p>
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
