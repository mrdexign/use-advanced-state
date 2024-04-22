import IS from './IS';
import STR from './STR';
import { SetStateAction } from 'react';
import { OBJECT, SUG, NestedKeyOf } from '../global';

export default class OBJ<T extends OBJECT> {
	private obj: OBJECT;

	constructor(obj: T) {
		this.obj = OBJ.clone(obj);
	}

	inner = (key: SUG<NestedKeyOf<T>>) => ({
		//? inner set
		set: (value: SetStateAction<any>) => {
			let curObj = this.obj;
			const keys = IS.string(key) ? [...key?.split('.')] : key;
			for (let i = 0; i < keys.length; i++) {
				const cur = keys?.[i];
				const isLast = i === keys?.length - 1;
				if (curObj?.[cur] === undefined) curObj[cur] = {};
				if (isLast) {
					if (IS.function(value)) curObj[cur] = (value as any)?.(curObj?.[cur]);
					else curObj[cur] = value;
				}
				curObj = curObj?.[cur];
			}
			return this.obj;
		},

		//? inner get
		get: (): any => {
			let curObj = this.obj;
			const keys = IS.string(key) ? [...key?.split('.')] : key;
			for (let i = 0; i < keys.length; i++) {
				curObj = curObj?.[keys?.[i]];
				const isLast = i === keys?.length - 1;
				if (curObj === undefined || isLast) return curObj;
			}
		},
	});

	//? ---------------------- Static methods --------------------------------------------------------

	static is_empty = (obj: OBJECT) => Object.keys(obj || {}).length === 0;

	static clone = <T extends object = any>(object: T) => JSON.parse(JSON.stringify(object || {})) as T;

	static equals = (...objects: object[]): boolean => {
		const first = STR.sort(JSON.stringify(objects[0]));
		return objects.every((obj, i) => i === 0 || STR.sort(JSON.stringify(obj)) === first);
	};

	static diff = (oldObj: any, newObj: any) => {
		const diff: any = {};
		const entries = Object.entries(newObj || {});
		entries?.forEach(([key, value]) => {
			const isBothArr = IS.array(oldObj[key]) && IS.array(value);
			const isBothObj = IS.object(oldObj[key]) && IS.object(value);
			if (isBothObj || isBothArr) {
				if (this.equals(oldObj[key], value)) return;
				diff[key] = this.diff(oldObj?.[key], value);
				return;
			}
			if (oldObj?.[key] === value) return;
			diff[key] = value;
		});
		return diff;
	};
}
