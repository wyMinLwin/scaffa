import { create } from 'zustand';

export const useSidebarStore = create<{
	isCollapsed: boolean;
	toggle: () => void;
}>((set) => ({
	isCollapsed: false,
	toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}));
