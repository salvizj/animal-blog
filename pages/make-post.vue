<script setup>
	definePageMeta({
		middleware: ['auth'],
	});
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const router = useRouter();

	const title = ref(null);
	const text = ref(null);
	const imageUrl = ref(null);
	const imageFile = ref(null);
	const userId = ref(user.value?.id);

	const previewImage = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			imageUrl.value = URL.createObjectURL(file);
			imageFile.value = file;
		} else {
			imageUrl.value = null;
			imageFile.value = null;
		}
	};

	const submitPost = async () => {
		if (!title.value || !text.value || !imageFile.value) {
			alert('All fields are required!');
			return;
		}

		const storage = supabase.storage.from('posts');

		const imagePath = `user_${userId.value}/${imageFile.value.name}`;
		const { error } = await storage.upload(imagePath, imageFile.value);

		if (error) {
			console.error(error);
			alert('Failed to upload image.');
			return;
		}

		const publicURL = storage.getPublicUrl(imagePath);

		const { error: postError } = await supabase.from('posts').insert([
			{
				user_id: userId,
				title: title.value,
				text: text.value,
				image_url: publicURL,
			},
		]);

		if (postError) {
			console.error(postError);
			alert('Failed to create post.');
			router.push('/posts');
		}

		title.value = '';
		text.value = '';
		imageUrl.value = null;
		imageFile.value = null;

		alert('Post created successfully!');
		router.push('/posts');
	};
</script>

<template>
	<div class="max-w-lg mx-auto p-4">
		<h1 class="text-3xl font-bold mb-6 text-center">
			Create a Kitten Post
		</h1>
		<form @submit.prevent="submitPost" class="space-y-4">
			<div v-if="imageUrl" class="mb-4">
				<img
					:src="imageUrl"
					alt="Preview"
					class="w-full h-64 object-cover rounded"
				/>
			</div>

			<div>
				<label for="img" class="block text-xl mb-2">Image:</label>
				<input
					type="file"
					id="img"
					@change="previewImage"
					accept="image/*"
					class="block w-full text-lg p-2 border rounded"
				/>
			</div>

			<div>
				<label for="title" class="block text-xl mb-2">Title:</label>
				<input
					type="text"
					id="title"
					v-model="title"
					required
					class="block w-full text-2xl p-3 border rounded"
				/>
			</div>

			<div>
				<label for="text" class="block text-xl mb-2">Text:</label>
				<textarea
					id="text"
					v-model="text"
					rows="6"
					required
					class="block w-full text-2xl p-3 border rounded"
				></textarea>
			</div>

			<div class="text-center">
				<button
					type="submit"
					class="bg-blue-500 text-white text-lg py-2 px-4 rounded hover:bg-blue-600"
				>
					Submit Post
				</button>
			</div>
		</form>
	</div>
</template>
