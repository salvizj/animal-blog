<template>
	<div
		class="relative bg-img mx-auto text-center min-h-screen flex flex-col justify-center bg-center"
	>
		<div class="absolute inset-0 bg-indigo-950 opacity-90"></div>
		<div class="relative z-10 p-8 container mx-auto">
			<h1 class="text-4xl md:text-6xl font-bold text-white">
				Place where you can post about funny things with your animals
			</h1>
			<p class="mt-4 md:mt-6 text-lg md:text-2xl text-gray-300">
				Share your funniest pet moments and enjoy the hilarious posts
				from our community!
			</p>
			<p class="pt-6 md:pt-8">
				<NuxtLink
					to="/posts"
					class="px-6 py-3 bg-indigo-400 text-white rounded-lg hover:bg-indigo-900 transition-colors duration-300"
					>Join the Fun</NuxtLink
				>
			</p>
		</div>
	</div>
</template>

<style scoped>
	.bg-img {
		background-image: url('cat-bg.jpg');
	}
</style>
