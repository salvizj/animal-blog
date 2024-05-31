<template>
	<div class="flex justify-center py-10">
		<form
			class="bg-white shadow-md rounded-lg p-8 gap-8 justify-center items-center flex flex-col w-full md:w-3/4 md:flex-row"
			@submit.prevent="submitFilter"
			method="post"
		>
			<label class="text-xl font-semibold text-black">Animal Type</label>
			<input
				v-model="type"
				type="text"
				placeholder="Animal Type"
				class="p-3 border rounded-md text-gray-800"
			/>
			<label class="text-xl font-semibold text-black">Blog Title</label>
			<input
				v-model="title"
				type="text"
				placeholder="Title"
				class="p-3 border rounded-md text-gray-800"
			/>
			<button
				type="submit"
				class="bg-indigo-400 text-xl py-2 px-6 text-white rounded-md hover:bg-indigo-900 transition-colors duration-300"
			>
				Filter
			</button>
		</form>
	</div>
</template>

<script setup>
	const type = ref('');
	const title = ref('');

	const emit = defineEmits(['filter']);

	const submitFilter = () => {
		emit('filter', { type: type.value, title: title.value });
	};
</script>
