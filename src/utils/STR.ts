export default class STR {
	//? ---------------------- Static methods --------------------------------------------------------

	static case = {
		camel: (str: string) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')),
	};

	static sort = (str: string) => [...((str || '') as any)]?.sort()?.join('');

	static contains = (string: string, searchValue: string) => {
		const lowerStr = string?.toLocaleLowerCase?.()?.trim();
		const lowerSearchValue = searchValue?.toLocaleLowerCase?.()?.trim();
		return lowerStr?.includes(lowerSearchValue);
	};

	static capitalize = (str: string): string =>
		str
			?.toLowerCase()
			?.split('_')
			?.map((i: string) => `${i?.charAt?.(0)?.toUpperCase?.()}${i?.slice?.(1)?.toLowerCase?.()}`)
			?.join(' ');
}
