<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
</script>

<template>
	<div class="max-w-3xl mx-auto px-4 py-8 container">
		<h1 class="text-3xl font-bold mb-4">About Us</h1>
		<p class="text-lg mb-4">
			Welcome to our blog! We are passionate about sharing stories,
			insights, and tips about animals and pets. Our mission is to create
			a community where animal lovers can come together to celebrate the
			joy and companionship that animals bring into our lives.
		</p>
		<p class="text-lg mb-4">
			Our team consists of dedicated writers, photographers, and animal
			enthusiasts who are committed to delivering high-quality content
			that entertains, educates, and inspires our readers. Whether you're
			a seasoned pet owner or just considering getting a furry friend,
			we've got something for everyone.
		</p>
		<p class="text-lg mb-4">
			We believe in the power of animals to uplift our spirits, bring us
			laughter, and teach us valuable lessons about love, empathy, and
			responsibility. Join us on this journey as we explore the wonderful
			world of animals and share our adventures with you!
		</p>
	</div>
</template>
