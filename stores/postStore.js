import { defineStore } from 'pinia';

export const usePostStore = defineStore('postStore', {
	state: () => ({
		post: {
			post_id: null,
			user_email: '',
			imageUrl: '',
			type: '',
			title: '',
			text: '',
		},
	}),
	actions: {
		setPostData(postData) {
			this.post = postData;
		},
	},
});
