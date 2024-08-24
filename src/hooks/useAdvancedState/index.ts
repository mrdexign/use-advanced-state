import OBJ from '../../utils/OBJ';
import useMountedState from '../useMountedState';
import { useEffect, SetStateAction } from 'react';
import { OBJECT, SUG, NestedKeyOf } from '../../global';

type StateDispatch<T = any> = SetStateAction<T>;

const useAdvancedState = <T extends OBJECT = OBJECT<any>>(in_state: T, dependencies: any[] = []) => {
	const [org, setOrgData] = useMountedState<T>(OBJ.clone(in_state));
	const [tmp, setTmpData] = useMountedState<T>(OBJ.clone(in_state));

	//? ------------------------------ useEffect ------------------------------------------------

	useEffect(() => {
		const cloned = OBJ.clone(in_state);
		if (OBJ.equals(cloned, org)) return;
		setTmpData(cloned);
		setOrgData(cloned);
	}, dependencies);

	useEffect(() => {
		if (OBJ.equals(tmp, org)) return;
		setTmpData(OBJ.clone(org));
	}, [org]);

	//? ---------------------------------- utils ------------------------------------------------

	function setOrg(state: StateDispatch<T>): void;
	function setOrg(key: SUG<NestedKeyOf<T>>, value: StateDispatch<any>): void;
	function setOrg(p1?: unknown, p2?: StateDispatch<any>) {
		if (arguments.length === 1) return setOrgData(p1 as any);
		if (arguments.length === 2) return setOrgData(s => new OBJ(s).inner(p1 as string).set(p2));
	}

	function setTmp(state: StateDispatch<T>): void;
	function setTmp(key: SUG<NestedKeyOf<T>>, value: StateDispatch<any>): void;
	function setTmp(p1?: unknown, p2?: StateDispatch<any>) {
		if (arguments.length === 1) return setTmpData(p1 as any);
		if (arguments.length === 2) return setTmpData(s => new OBJ(s).inner(p1 as string).set(p2));
	}

	function getOrg(key: SUG<NestedKeyOf<T>>) {
		return new OBJ(org).inner(key).get();
	}

	function getTmp(key: SUG<NestedKeyOf<T>>) {
		return new OBJ(tmp).inner(key).get();
	}

	// -----------------------------------------------------------------------------------------

	return {
		tmp,
		org,
		changed: !OBJ.equals(org, tmp),
		discard: () => setTmpData(org),
		set: { org: setOrg, tmp: setTmp },
		get: { org: getOrg, tmp: getTmp },
		merge: () => setOrgData(OBJ.clone(tmp)),
	};
};

export default useAdvancedState;
