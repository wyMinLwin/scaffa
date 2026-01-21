import type { LayoutServerLoad } from './$types';
import { generateNavigation } from '$lib/docs/navigation';

export const load: LayoutServerLoad = async () => {
	const navigation = generateNavigation();
	return { navigation };
};
