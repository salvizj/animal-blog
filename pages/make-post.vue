<template>
	<div>
		<PostForm />
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
</script>
