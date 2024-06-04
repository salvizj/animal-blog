<template>
	<div
		class="flex justify-center items-center min-h-screen container mx-auto"
	>
		<LoginForm />
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
</script>
