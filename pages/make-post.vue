<template>
	<PostForm />
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
</script>
