<template>
	<div>
		<div
			class="comment-container bg-indigo-600 p-4 text-white shadow-xl rounded-lg mb-4"
		>
			<div
				class="flex flex-col md:flex-row items-center justify-between mb-4"
			>
				<div class="comment-info flex items-center">
					<p class="text-lg md:text-xl mr-2 font-semibold">
						{{ comment.user_username }}:
					</p>
					<p class="text-base md:text-lg">{{ comment.comment }}</p>
				</div>
				<div class="comment-actions flex items-center mt-2 md:mt-0">
					<p class="text-lg md:text-base mr-2">LIKES: {{ likes }}</p>
					<button
						@click="toggleLike"
						class="like-button bg-transparent border border-indigo-100 text-white text-2xl md:text-2xl px-3 md:px-4 py-1 md:py-2 rounded-3xl hover:bg-indigo-600 hover:border-indigo-950 transition duration-300 ease-in-out"
					>
						&#8593;
					</button>
					<button
						v-if="isCurrentUser"
						@click="deleteComment"
						class="delete-button ml-4 text-white border-2 py-2 px-3 hover:border-indigo-950 transition duration-300 ease-in-out"
					>
						&#10005;
					</button>
				</div>
			</div>
			<div class="border-t pt-2 text-sm text-white">
				{{ comment.created_at }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, ref, defineEmits } from 'vue';

	const props = defineProps({
		comment: Object,
	});
	const emits = defineEmits(['comment-deleted']);
	const supabase = useSupabaseClient();
	const userUsername = useSupabaseUser().value.user_metadata.username;
	const isCurrentUser = ref(userUsername === props.comment.user_username);
	const likes = ref(props.comment.likes);

	const toggleLike = async () => {
		const liked = await checkIfLiked();

		if (liked) {
			likes.value -= 1;

			try {
				await supabase
					.from('liked_comments')
					.delete()
					.eq('user_username', userUsername)
					.eq('comment_id', props.comment.comment_id);

				const { data: updatedPostComment, error: postCommentError } =
					await supabase
						.from('post-comments')
						.update({ likes: likes.value })
						.eq('comment_id', props.comment.comment_id);

				if (postCommentError) {
					throw postCommentError;
				}

				props.comment.likes = likes.value;
				props.comment.liked = false;
			} catch (error) {
				console.error('Error unliking comment:', error);
				likes.value += 1;
			}
		} else {
			likes.value += 1;

			try {
				const { data: likedComment, error: likedCommentError } =
					await supabase.from('liked_comments').insert([
						{
							comment_id: props.comment.comment_id,
							user_username: userUsername,
						},
					]);

				if (likedCommentError) {
					throw likedCommentError;
				}

				const { data: updatedPostComment, error: postCommentError } =
					await supabase
						.from('post-comments')
						.update({ likes: likes.value })
						.eq('comment_id', props.comment.comment_id);

				if (postCommentError) {
					throw postCommentError;
				}

				props.comment.likes = likes.value;
				props.comment.liked = true;
			} catch (error) {
				console.error('Error liking comment:', error);
				likes.value -= 1;
			}
		}
	};

	const deleteComment = async () => {
		try {
			await supabase
				.from('liked_comments')
				.delete()
				.eq('comment_id', props.comment.comment_id);

			await supabase
				.from('post-comments')
				.delete()
				.eq('comment_id', props.comment.comment_id);
		} catch (error) {
			console.error('Error deleting comment:', error);
		}
		alert('comment deleted successfully');
		emits('comment-deleted');
	};
</script>
