<template>Email: {{ email }}</template>

<script setup>
	const user = useSupabaseUser();
	const email = user.value.email;
	console.log(user.value.email);
</script>
