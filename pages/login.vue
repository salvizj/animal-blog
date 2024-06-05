<template>
	<div class="flex justify-center items-center min-h-screen">
		<LoginForm />
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
</script>
