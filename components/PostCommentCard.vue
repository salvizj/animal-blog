<template>
	<div
		class="comment-container bg-indigo-600 p-4 text-white shadow-xl rounded-lg mb-4"
	>
		<div
			class="flex flex-col md:flex-row items-center justify-between mb-4"
		>
			<div class="comment-info flex items-center">
				<p class="text-lg md:text-xl mr-2 font-semibold">
					{{ comment.user_email }}:
				</p>
				<p class="text-base md:text-lg">{{ comment.comment }}</p>
			</div>
			<div class="comment-actions flex items-center mt-2 md:mt-0">
				<p class="text-lg md:text-base mr-2">
					LIKES: {{ comment.likes }}
				</p>
				<button
					@click="toggleLike"
					:class="{ 'opacity-50 cursor-not-allowed': comment.liked }"
					class="like-button bg-transparent border border-indigo-100 text-white text-2xl md:text-2xl px-3 md:px-4 py-1 md:py-2 rounded-3xl hover:bg-indigo-600 hover:border-indigo-950 transition duration-300 ease-in-out"
				>
					&#8593;
				</button>
			</div>
		</div>
		<div class="border-t pt-2 text-sm text-white">
			{{ comment.created_at }}
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		comment: Object,
	});
	const supabase = useSupabaseClient();
	const likes = ref(props.comment.likes);
	const toggleLike = async () => {
		likes.value += 1;

		const { error } = await supabase
			.from('post-comments')
			.update({ likes: likes.value })
			.eq('comment_id', props.comment.comment_id);

		if (error) {
			console.error('Error updating likes:', error);
			likes.value -= 1;
		} else {
			props.comment.likes = likes.value;
		}
	};
</script>
