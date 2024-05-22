import { Post } from '~/types';
export default class PostService {
	private supabase = useSupabaseClient();

	async getAllPosts(): Promise<Post[]> {
		const { data, error } = await this.supabase.from('posts').select();

		if (error) {
			console.error(error);
			return [];
		}

		return data || [];
	}
}
