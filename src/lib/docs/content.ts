import matter from 'gray-matter';
import { marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import type { DocMetadata } from './types';

export interface DocContent {
	slug: string;
	content: string;
	metadata: DocMetadata;
}

export interface RawDoc {
	slug: string;
	rawContent: string;
	metadata: DocMetadata;
}

const modules = import.meta.glob('/content/docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

let highlighter: Highlighter | null = null;

async function getHighlighter(): Promise<Highlighter> {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['github-dark', 'github-light'],
			langs: ['javascript', 'typescript', 'bash', 'json', 'html', 'css', 'svelte', 'vue', 'markdown', 'yaml', 'shell']
		});
	}
	return highlighter;
}

// Export for navigation (sync, no rendering needed)
export function getRawDocs(): RawDoc[] {
	const docs: RawDoc[] = [];

	for (const [path, raw] of Object.entries(modules)) {
		const slug = path
			.replace('/content/docs/', '')
			.replace(/\.md$/, '')
			.replace(/\/index$/, '');

		const { data, content } = matter(raw);

		docs.push({
			slug: slug || 'index',
			rawContent: content,
			metadata: {
				title: data.title || formatTitle(slug),
				description: data.description,
				order: data.order,
				visible: data.visible
			}
		});
	}

	return docs;
}

function renderFileTree(text: string): string {
	const escaped = text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return `<div class="filetree"><pre><code>${escaped}</code></pre></div>`;
}

async function renderMarkdown(content: string): Promise<string> {
	const hl = await getHighlighter();

	const renderer = new marked.Renderer();

	renderer.code = ({ text, lang }) => {
		// to render filetree blocks with custom renderer
		if (lang === 'filetree') {
			return renderFileTree(text);
		}

		const language = lang || 'text';
		const validLang = hl.getLoadedLanguages().includes(language) ? language : 'text';

		const highlighted = hl.codeToHtml(text, {
			lang: validLang,
			themes: {
				dark: 'github-dark',
				light: 'github-light'
			}
		});

		// Wrap in container with copy button data attribute
		return `<div class="code-block" data-code="${encodeURIComponent(text)}">
			<button class="copy-btn" aria-label="Copy code">
				<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
				<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
			</button>
			${highlighted}
		</div>`;
	};

	marked.setOptions({ renderer });

	return marked(content) as string;
}

export async function getAllDocs(): Promise<DocContent[]> {
	const rawDocs = getRawDocs();
	const docs: DocContent[] = [];

	for (const doc of rawDocs) {
		const html = await renderMarkdown(doc.rawContent);
		docs.push({
			slug: doc.slug,
			content: html,
			metadata: doc.metadata
		});
	}

	return docs;
}

export async function getDocBySlug(slug: string): Promise<DocContent | undefined> {
	const docs = await getAllDocs();
	const normalizedSlug = slug === '' ? 'index' : slug;
	return docs.find((doc) => doc.slug === normalizedSlug);
}

export async function getAllDocSlugs(): Promise<string[]> {
	const docs = await getAllDocs();
	return docs.map((doc) => doc.slug);
}

function formatTitle(slug: string): string {
	const name = slug.split('/').pop() || slug || 'Introduction';
	return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
