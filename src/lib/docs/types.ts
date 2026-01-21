export interface DocMetadata {
	title: string;
	description?: string;
	order?: number;
	visible?: boolean;
}

export interface SectionMeta {
	title: string;
	order: number;
}

export interface NavSection {
	group: string;
	order: number;
	items: NavItem[];
}

export interface NavItem {
	title: string;
	path: string;
	order: number;
	isVisible: boolean;
}
