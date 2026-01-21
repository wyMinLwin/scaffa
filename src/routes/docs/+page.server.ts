import type { PageServerLoad } from './$types';
import { getDocBySlug } from '$lib/docs/content';
import { getAdjacentDocs } from '$lib/docs/navigation';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const doc = await getDocBySlug('index');

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	const adjacent = getAdjacentDocs('index');

	return {
		content: doc.content,
		metadata: doc.metadata,
		slug: 'index',
		adjacent
	};
};
