<template>
	<div class="container mx-auto">
		<PostForm />
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
</script>
