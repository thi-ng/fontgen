import { map, range } from "@thi.ng/transducers";
import { maddN2, mulN2, normalize } from "@thi.ng/vectors";

export interface GlyphDef {
    id: number;
    g: string;
    x?: number;
    width?: number;
}

// dot radius
export const R = 50;
export const D = 2 * R;
export const HGAP = 30;
export const VGAP = 15;
export const COL_WIDTH = D + HGAP;
export const X_HEIGHT = 7 * R + 6 * VGAP;
export const DIR = normalize(null, [COL_WIDTH, X_HEIGHT]);
export const MIN = mulN2([], DIR, -4 * R - 3 * VGAP);
export const MAX = mulN2([], DIR, 11 * R + 10 * VGAP);
export const MIN_Y = MIN[1];
export const MAX_Y = MAX[1];

const rowPoint = (row: number) =>
    maddN2([], DIR, row * R + (row - 1) * VGAP, MIN);

export const GRID = [...map(rowPoint, range(15))];
export const DOTGRID = [
    ...map((i) => {
        const p = rowPoint(i + R / (R + VGAP));
        return [p[0] + R, p[1]];
    }, range(15))
];