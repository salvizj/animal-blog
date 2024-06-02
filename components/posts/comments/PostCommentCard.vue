<template>
	<div>
		<div
			class="comment-container bg-indigo-600 p-4 text-white shadow-xl rounded-lg mb-4"
		>
			<div class="flex flex-col items-start justify-center mb-4 gap-4">
				<div class="comment-username md:mr-4 mb-2 md:mb-0">
					<p class="text-lg md:text-xl font-semibold">
						{{ comment.user_username }}:
					</p>
				</div>
				<div class="flex flex-col w-full">
					<p class="text-lg md:text-2xl md:mr-4">
						{{ comment.comment }}
					</p>
					<div
						class="flex gap-4 md:gap-2 md:justify-end justify-center flex-row md:mt-8 mt-4 items-center"
					>
						<button
							v-if="userIsLoggedIn"
							@click="toggleLike"
							class="like-button flex flex-row justify-center items-center bg-transparent border border-indigo-100 text-white text-lg md:text-xl px-3 md:px-4 py-3 md:py-2 rounded-full hover:bg-indigo-600 hover:border-indigo-950 transition duration-300 ease-in-out"
							style="flex-wrap: nowrap"
						>
							&#8593; Like
						</button>

						<p class="text-white text-xl">Likes: {{ likes }}</p>

						<button
							v-if="isCurrentUser && userIsLoggedIn"
							@click="deleteComment"
							class="delete-button text-white border py-3 md:py-2 px-3 md:px-4 hover:border-indigo-950 transition duration-300 ease-in-out rounded-full"
						>
							&#10005; Delete
						</button>
					</div>
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
	const user = useSupabaseUser();
	const userIsLoggedIn = user.value ? true : false;
	const userUsername = user.value ? user.value.user_metadata.username : null;
	const isCurrentUser = ref(userUsername === props.comment.user_username);
	const likes = ref(props.comment.likes);
	const checkIfLiked = async () => {
		try {
			const { data, error } = await supabase
				.from('liked_comments')
				.select('*')
				.eq('user_username', userUsername)
				.eq('comment_id', props.comment.comment_id);

			if (error) {
				throw error;
			}

			return data.length > 0;
		} catch (error) {
			console.error('Error checking if comment is liked:', error);
			return false;
		}
	};
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
