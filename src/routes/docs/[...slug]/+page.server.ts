import type { PageServerLoad, EntryGenerator } from './$types';
import { error } from '@sveltejs/kit';
import { getDocBySlug, getAllDocSlugs } from '$lib/docs/content';
import { getAdjacentDocs } from '$lib/docs/navigation';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug || 'index';

	const doc = await getDocBySlug(slug);

	if (!doc) {
		throw error(404, 'Documentation page not found');
	}

	const adjacent = getAdjacentDocs(slug);

	return {
		content: doc.content,
		metadata: doc.metadata,
		slug,
		adjacent
	};
};

export const entries: EntryGenerator = async () => {
	const slugs = await getAllDocSlugs();
	return slugs.map((slug) => ({ slug: slug === 'index' ? '' : slug }));
};
