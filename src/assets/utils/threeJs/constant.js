export let BASEMAP_TOPLEVEL_HEIGHT = 1;
export let AREA_AND_LABEL_HEIGHT = 2;
export let WANGGE_AREA_AND_LABEL_HEIGHT = 4;
export let BACK_CIRCLE_HEIGHT = -60;
export let COMPASS_HEIGHT = -59;
export let LINE_HEIGHT = 4;
export const BLOOM_SCENE = 1;
export const BaseMapConfig = {
	TopLevel: {
		level: 0,
		strokeColor: '#85b7ee',
		strokeWidth: 2,
	},
	Level: [
		{
			level: 1,
			fill: '#005185',
			strokeColor: '#b7e4ff',
			strokeWidth: 4,
			marginBottom: 40,
		},
	],
};
export function updateConstant(rate) {
	resetConstant();
	BACK_CIRCLE_HEIGHT *= rate;
	COMPASS_HEIGHT *= rate;
	LINE_HEIGHT *= rate;
	BASEMAP_TOPLEVEL_HEIGHT *= rate;
	AREA_AND_LABEL_HEIGHT *= rate;
	WANGGE_AREA_AND_LABEL_HEIGHT *= rate;
	BaseMapConfig.Level[0].marginBottom *= rate;
}
export function resetConstant() {
	BASEMAP_TOPLEVEL_HEIGHT = 1;
	AREA_AND_LABEL_HEIGHT = 2;
	WANGGE_AREA_AND_LABEL_HEIGHT = 4;
	BACK_CIRCLE_HEIGHT = -60;
	COMPASS_HEIGHT = -59;
	LINE_HEIGHT = 4;
	BaseMapConfig.Level[0].marginBottom = 40;
}
export const ViewLibrary = {
	浙江省: {
		position: { x: -255.9217972472739, y: -1375.9677981454463, z: 689.25395882666 },
		target: { x: -131.28717623735366, y: -210.96377461479463, z: -131.73308640733057 },
	},
    杭州市: {
		position: { x: -426.18255599074, y: -574.8458799487039, z: 80.0042908471033 },
		target: { x: -431.3585274629119, y: -438.769455295613, z: -21.8291080708729 },
	}
}