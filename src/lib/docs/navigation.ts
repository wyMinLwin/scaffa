import { getRawDocs } from './content';
import type { NavSection, NavItem, SectionMeta } from './types';

const sectionMeta = import.meta.glob('/content/docs/**/_meta.json', { eager: true, import: 'default' }) as Record<string, SectionMeta>;

export function generateNavigation(): NavSection[] {
	const docs = getRawDocs();
	const sections: Map<string, NavItem[]> = new Map();

	for (const doc of docs) {
		const parts = doc.slug.split('/');
		const sectionKey = parts.length > 1 ? parts[0] : 'getting-started';

		if (!sections.has(sectionKey)) {
			sections.set(sectionKey, []);
		}

		const path = doc.slug === 'index' ? '/docs' : `/docs/${doc.slug}`;

		sections.get(sectionKey)!.push({
			title: doc.metadata.title || formatTitle(doc.slug),
			path,
			order: doc.metadata.order ?? 999,
			isVisible: doc.metadata.visible !== false
		});
	}

	const result: NavSection[] = [];

	for (const [key, items] of sections) {
		const meta = getSectionMeta(key);
		result.push({
			group: meta?.title || formatTitle(key),
			order: meta?.order ?? 999,
			items: items.sort((a, b) => a.order - b.order)
		});
	}

	return result.sort((a, b) => a.order - b.order);
}

function getSectionMeta(sectionKey: string): SectionMeta | undefined {
	const path = `/content/docs/${sectionKey}/_meta.json`;
	return sectionMeta[path];
}

function formatTitle(slug: string): string {
	const name = slug.split('/').pop() || slug || 'Getting Started';
	return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getAdjacentDocs(currentSlug: string): {
	previous: NavItem | null;
	next: NavItem | null;
} {
	const nav = generateNavigation();
	const allItems = nav.flatMap((section) => section.items.filter((item) => item.isVisible));

	const currentPath = currentSlug === 'index' ? '/docs' : `/docs/${currentSlug}`;
	const currentIndex = allItems.findIndex((item) => item.path === currentPath);

	return {
		previous: currentIndex > 0 ? allItems[currentIndex - 1] : null,
		next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null
	};
}
