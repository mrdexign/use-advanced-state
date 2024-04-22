import { OBJECT } from '../global';

export default class IS {
	static array = (data: any): data is any[] => Array.isArray(data);
	static date = (data: any): data is Date => data instanceof Date;
	static blob = (data: any): data is Blob => data instanceof Blob;
	static string = (data: any): data is string => typeof data === 'string';
	static number = (data: any): data is number => typeof data === 'number';
	static boolean = (data: any): data is boolean => typeof data === 'boolean';
	static object_only = (data: any): data is OBJECT => typeof data === 'object';
	static function = (data: any): data is () => {} => typeof data === 'function';
	static object = (data: any): data is OBJECT => typeof data === 'object' && !Array.isArray(data);
}
