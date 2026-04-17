import { getCandidates } from '../../solver';

/** Ordered list of technique names that the human solver can apply */
export type TTechniqueUsed =
    | 'naked_single'
    | 'hidden_single'
    | 'naked_pair'
    | 'hidden_pair'
    | 'pointing_pairs'
    | 'box_line'
    | 'x_wing'
    | 'swordfish';

type TCandidateGrid = Set<number>[][];
type TUnit = ICellCoordinates[];
type TXWingLine = { idx: number; cells: [number, number] };
type TSwordfishLine = { idx: number; cells: number[] };

/**
 * @function initCandidates
 * @description Builds the initial candidate set for every empty cell on the board.
 * Filled cells receive an empty set.
 * @param {TBoard} board - the Sudoku board
 * @returns {TCandidateGrid} - 9x9 grid of candidate sets
 */
const initCandidates = (board: TBoard): TCandidateGrid =>
    board.map((row, y) =>
        row.map((cell, x) =>
            cell === 0 ? new Set(getCandidates(board, y, x)) : new Set<number>()
        )
    );

/**
 * @function buildBoxUnit
 * @description Builds a TUnit for the 3×3 box whose top-left corner is at (by, bx).
 * @param {number} by - top row of the box (0, 3, or 6)
 * @param {number} bx - left column of the box (0, 3, or 6)
 * @returns {TUnit} - the 9 cell coordinates in the box
 */
const buildBoxUnit = (by: number, bx: number): TUnit => {
    const unit: TUnit = [];

    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            unit.push({ y: by + dy, x: bx + dx });
        }
    }

    return unit;
};

/**
 * @function buildUnits
 * @description Builds all 27 Sudoku units: 9 rows, 9 columns, and 9 boxes.
 * @returns {TUnit[]} - array of 27 units
 */
const buildUnits = (): TUnit[] => {
    const units: TUnit[] = [];

    for (let i = 0; i < 9; i++) {
        units.push(Array.from({ length: 9 }, (_, x) => ({ y: i, x })));
        units.push(Array.from({ length: 9 }, (_, y) => ({ y, x: i })));
    }

    for (let by = 0; by < 9; by += 3) {
        for (let bx = 0; bx < 9; bx += 3) {
            units.push(buildBoxUnit(by, bx));
        }
    }

    return units;
};

/**
 * @function isBoardSolved
 * @description Returns true when every cell on the board contains a non-zero value.
 * @param {TBoard} board - the Sudoku board
 * @returns {boolean} - true if the board is fully solved
 */
const isBoardSolved = (board: TBoard): boolean =>
    board.every((row) => row.every((cell) => cell !== 0));

/**
 * @function eliminateFromPeers
 * @description Removes digit d from the candidate sets of all peers of cell (y, x):
 * every other cell in the same row, column, and 3×3 box.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} y - row of the filled cell
 * @param {number} x - column of the filled cell
 * @param {number} d - the digit that was placed
 * @returns {void}
 */
const eliminateFromPeers = (
    grid: TCandidateGrid,
    y: number,
    x: number,
    d: number
): void => {
    for (let i = 0; i < 9; i++) {
        if (i !== x) {
            grid[y][i].delete(d);
        }

        if (i !== y) {
            grid[i][x].delete(d);
        }
    }

    const boxY = Math.floor(y / 3) * 3;
    const boxX = Math.floor(x / 3) * 3;

    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            const py = boxY + dy;
            const px = boxX + dx;

            if (py !== y || px !== x) {
                grid[py][px].delete(d);
            }
        }
    }
};

/**
 * @function fillCell
 * @description Places digit d in cell (y, x) on the board, clears its candidate set,
 * and eliminates d from all peer candidate sets.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {TBoard} board - the working board
 * @param {number} y - row index
 * @param {number} x - column index
 * @param {number} d - the digit to place
 * @returns {void}
 */
const fillCell = (
    grid: TCandidateGrid,
    board: TBoard,
    y: number,
    x: number,
    d: number
): void => {
    board[y][x] = d;
    grid[y][x].clear();
    eliminateFromPeers(grid, y, x, d);
};

/**
 * @function getUnitCellsForDigit
 * @description Filters a unit to the cells whose candidate set includes digit d.
 * @param {TUnit} unit - the unit to filter
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to look for
 * @returns {ICellCoordinates[]} - cells in the unit that have d as a candidate
 */
const getUnitCellsForDigit = (
    unit: TUnit,
    grid: TCandidateGrid,
    d: number
): ICellCoordinates[] => unit.filter(({ y, x }) => grid[y][x].has(d));

/**
 * @function setsEqual
 * @description Returns true when two number Sets contain exactly the same elements.
 * @param {Set<number>} a - first set
 * @param {Set<number>} b - second set
 * @returns {boolean} - true if both sets are equal
 */
const setsEqual = (a: Set<number>, b: Set<number>): boolean => {
    if (a.size !== b.size) {
        return false;
    }

    for (const v of a) {
        if (!b.has(v)) {
            return false;
        }
    }

    return true;
};

/**
 * @function applyNakedSingles
 * @description Fills every cell that has exactly one remaining candidate.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {TBoard} board - the working board
 * @returns {boolean} - true if at least one cell was filled
 */
const applyNakedSingles = (grid: TCandidateGrid, board: TBoard): boolean => {
    let changed = false;

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (grid[y][x].size === 1) {
                const [d] = grid[y][x];

                fillCell(grid, board, y, x, d);
                changed = true;
            }
        }
    }

    return changed;
};

/**
 * @function applyHiddenSingles
 * @description For every unit, fills any cell where a digit appears as a candidate in
 * exactly one cell of that unit.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {TBoard} board - the working board
 * @param {TUnit[]} units - the 27 Sudoku units
 * @returns {boolean} - true if at least one cell was filled
 */
const applyHiddenSingles = (
    grid: TCandidateGrid,
    board: TBoard,
    units: TUnit[]
): boolean => {
    let changed = false;

    for (const unit of units) {
        for (let d = 1; d <= 9; d++) {
            const cells = getUnitCellsForDigit(unit, grid, d);

            if (cells.length === 1) {
                const { y, x } = cells[0];

                if (!board[y][x]) {
                    fillCell(grid, board, y, x, d);
                    changed = true;
                }
            }
        }
    }

    return changed;
};

/**
 * @function eliminatePairFromUnit
 * @description Removes both digits of a naked pair from the candidates of all other
 * cells in the unit (excluding the two cells that form the pair).
 * @param {TUnit} unit - the unit containing the pair
 * @param {Set<number>} pair - the two-digit candidate set shared by c1 and c2
 * @param {ICellCoordinates} c1 - first cell of the pair
 * @param {ICellCoordinates} c2 - second cell of the pair
 * @param {TCandidateGrid} grid - the candidate grid
 * @returns {boolean} - true if any candidate was eliminated
 */
const eliminatePairFromUnit = (
    unit: TUnit,
    pair: Set<number>,
    c1: ICellCoordinates,
    c2: ICellCoordinates,
    grid: TCandidateGrid
): boolean => {
    let changed = false;

    for (const { y, x } of unit) {
        if ((y === c1.y && x === c1.x) || (y === c2.y && x === c2.x)) {
            continue;
        }

        for (const d of pair) {
            if (grid[y][x].delete(d)) {
                changed = true;
            }
        }
    }

    return changed;
};

/**
 * @function applyNakedPairs
 * @description For every unit, finds pairs of cells that share an identical set of
 * exactly two candidates and eliminates those candidates from all other cells in the unit.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {TUnit[]} units - the 27 Sudoku units
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyNakedPairs = (grid: TCandidateGrid, units: TUnit[]): boolean => {
    let changed = false;

    for (const unit of units) {
        const twoCs = unit.filter(({ y, x }) => grid[y][x].size === 2);

        for (let i = 0; i < twoCs.length; i++) {
            for (let j = i + 1; j < twoCs.length; j++) {
                const c1 = twoCs[i];
                const c2 = twoCs[j];

                if (setsEqual(grid[c1.y][c1.x], grid[c2.y][c2.x])) {
                    if (
                        eliminatePairFromUnit(
                            unit,
                            grid[c1.y][c1.x],
                            c1,
                            c2,
                            grid
                        )
                    ) {
                        changed = true;
                    }
                }
            }
        }
    }

    return changed;
};

/**
 * @function stripCandidatesExcept
 * @description Removes all candidates from cell (y, x) except d1 and d2.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {ICellCoordinates} cell - the cell to strip
 * @param {number} d1 - first digit to keep
 * @param {number} d2 - second digit to keep
 * @returns {boolean} - true if any candidate was removed
 */
const stripCandidatesExcept = (
    grid: TCandidateGrid,
    cell: ICellCoordinates,
    d1: number,
    d2: number
): boolean => {
    let changed = false;
    const set = grid[cell.y][cell.x];

    for (const d of [...set]) {
        if (d !== d1 && d !== d2) {
            set.delete(d);
            changed = true;
        }
    }

    return changed;
};

/**
 * @function checkHiddenPairCells
 * @description Returns true when two digit-cell arrays both have length 2 and reference
 * the same two cells (in the same order, as produced by iterating a unit).
 * @param {ICellCoordinates[]} c1 - cells containing the first digit
 * @param {ICellCoordinates[]} c2 - cells containing the second digit
 * @returns {boolean} - true if both arrays share exactly the same two cells
 */
const checkHiddenPairCells = (
    c1: ICellCoordinates[],
    c2: ICellCoordinates[]
): boolean =>
    c1.length === 2 &&
    c2.length === 2 &&
    c1[0].y === c2[0].y &&
    c1[0].x === c2[0].x &&
    c1[1].y === c2[1].y &&
    c1[1].x === c2[1].x;

/**
 * @function applyHiddenPairsForUnit
 * @description For a single unit, finds hidden digit pairs and strips all other candidates
 * from the two cells they occupy.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {TUnit} unit - the unit to process
 * @returns {boolean} - true if any candidate was removed
 */
const applyHiddenPairsForUnit = (grid: TCandidateGrid, unit: TUnit): boolean => {
    let changed = false;

    for (let d1 = 1; d1 <= 9; d1++) {
        const cells1 = getUnitCellsForDigit(unit, grid, d1);

        if (cells1.length !== 2) {
            continue;
        }

        for (let d2 = d1 + 1; d2 <= 9; d2++) {
            const cells2 = getUnitCellsForDigit(unit, grid, d2);

            if (checkHiddenPairCells(cells1, cells2)) {
                changed = stripCandidatesExcept(grid, cells1[0], d1, d2) || changed;
                changed = stripCandidatesExcept(grid, cells1[1], d1, d2) || changed;
            }
        }
    }

    return changed;
};

/**
 * @function applyHiddenPairs
 * @description For every unit, finds pairs of digits that appear as candidates in exactly
 * the same two cells and reduces those cells to only those two candidates.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {TUnit[]} units - the 27 Sudoku units
 * @returns {boolean} - true if any candidate was removed
 */
const applyHiddenPairs = (grid: TCandidateGrid, units: TUnit[]): boolean => {
    let changed = false;

    for (const unit of units) {
        changed = applyHiddenPairsForUnit(grid, unit) || changed;
    }

    return changed;
};

/**
 * @function getBoxCellsForDigit
 * @description Returns all empty cells in a 3×3 box that have digit d as a candidate.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} by - top row of the box (0, 3, or 6)
 * @param {number} bx - left column of the box (0, 3, or 6)
 * @param {number} d - the digit to look for
 * @returns {ICellCoordinates[]} - matching cells within the box
 */
const getBoxCellsForDigit = (
    grid: TCandidateGrid,
    by: number,
    bx: number,
    d: number
): ICellCoordinates[] => {
    const cells: ICellCoordinates[] = [];

    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            const y = by + dy;
            const x = bx + dx;

            if (grid[y][x].has(d)) {
                cells.push({ y, x });
            }
        }
    }

    return cells;
};

/**
 * @function eliminateDigitFromRowOutsideBox
 * @description Removes digit d from all cells in the given row that are NOT in the
 * column band starting at bx.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} row - the row index
 * @param {number} bx - the column band start (0, 3, or 6) to exclude
 * @param {number} d - the digit to eliminate
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateDigitFromRowOutsideBox = (
    grid: TCandidateGrid,
    row: number,
    bx: number,
    d: number
): boolean => {
    let changed = false;

    for (let x = 0; x < 9; x++) {
        if (x < bx || x >= bx + 3) {
            if (grid[row][x].delete(d)) {
                changed = true;
            }
        }
    }

    return changed;
};

/**
 * @function eliminateDigitFromColOutsideBox
 * @description Removes digit d from all cells in the given column that are NOT in the
 * row band starting at by.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} col - the column index
 * @param {number} by - the row band start (0, 3, or 6) to exclude
 * @param {number} d - the digit to eliminate
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateDigitFromColOutsideBox = (
    grid: TCandidateGrid,
    col: number,
    by: number,
    d: number
): boolean => {
    let changed = false;

    for (let y = 0; y < 9; y++) {
        if (y < by || y >= by + 3) {
            if (grid[y][col].delete(d)) {
                changed = true;
            }
        }
    }

    return changed;
};

/**
 * @function applyPointingPairsForBox
 * @description For each digit, if all occurrences of that digit in the box are confined
 * to a single row or column, eliminates the digit from the rest of that row/column outside
 * the box.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} by - top row of the box (0, 3, or 6)
 * @param {number} bx - left column of the box (0, 3, or 6)
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyPointingPairsForBox = (
    grid: TCandidateGrid,
    by: number,
    bx: number
): boolean => {
    let changed = false;

    for (let d = 1; d <= 9; d++) {
        const cells = getBoxCellsForDigit(grid, by, bx, d);

        if (cells.length < 2) {
            continue;
        }

        const allSameRow = cells.every((c) => c.y === cells[0].y);
        const allSameCol = cells.every((c) => c.x === cells[0].x);

        if (allSameRow) {
            if (eliminateDigitFromRowOutsideBox(grid, cells[0].y, bx, d)) {
                changed = true;
            }
        } else if (allSameCol) {
            if (eliminateDigitFromColOutsideBox(grid, cells[0].x, by, d)) {
                changed = true;
            }
        }
    }

    return changed;
};

/**
 * @function applyPointingPairs
 * @description Applies pointing-pair elimination across all nine 3×3 boxes.
 * @param {TCandidateGrid} grid - the candidate grid
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyPointingPairs = (grid: TCandidateGrid): boolean => {
    let changed = false;

    for (let by = 0; by < 9; by += 3) {
        for (let bx = 0; bx < 9; bx += 3) {
            if (applyPointingPairsForBox(grid, by, bx)) {
                changed = true;
            }
        }
    }

    return changed;
};

/**
 * @function getLineCandidateCols
 * @description Returns the column indices where digit d appears as a candidate in row y.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} y - the row index
 * @param {number} d - the digit to look for
 * @returns {number[]} - column indices
 */
const getLineCandidateCols = (
    grid: TCandidateGrid,
    y: number,
    d: number
): number[] => {
    const cols: number[] = [];

    for (let x = 0; x < 9; x++) {
        if (grid[y][x].has(d)) {
            cols.push(x);
        }
    }

    return cols;
};

/**
 * @function getLineCandidateRows
 * @description Returns the row indices where digit d appears as a candidate in column x.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} x - the column index
 * @param {number} d - the digit to look for
 * @returns {number[]} - row indices
 */
const getLineCandidateRows = (
    grid: TCandidateGrid,
    x: number,
    d: number
): number[] => {
    const rows: number[] = [];

    for (let y = 0; y < 9; y++) {
        if (grid[y][x].has(d)) {
            rows.push(y);
        }
    }

    return rows;
};

/**
 * @function eliminateFromBoxOutsideRow
 * @description Removes digit d from all cells in box (by, bx) that are NOT in the
 * specified row.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} by - top row of the box (0, 3, or 6)
 * @param {number} bx - left column of the box (0, 3, or 6)
 * @param {number} row - the row to exclude from elimination
 * @param {number} d - the digit to eliminate
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateFromBoxOutsideRow = (
    grid: TCandidateGrid,
    by: number,
    bx: number,
    row: number,
    d: number
): boolean => {
    let changed = false;

    for (let dy = 0; dy < 3; dy++) {
        const y = by + dy;

        if (y === row) {
            continue;
        }

        for (let dx = 0; dx < 3; dx++) {
            changed = grid[y][bx + dx].delete(d) || changed;
        }
    }

    return changed;
};

/**
 * @function eliminateFromBoxOutsideCol
 * @description Removes digit d from all cells in box (by, bx) that are NOT in the
 * specified column.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} by - top row of the box (0, 3, or 6)
 * @param {number} bx - left column of the box (0, 3, or 6)
 * @param {number} col - the column to exclude from elimination
 * @param {number} d - the digit to eliminate
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateFromBoxOutsideCol = (
    grid: TCandidateGrid,
    by: number,
    bx: number,
    col: number,
    d: number
): boolean => {
    let changed = false;

    for (let dx = 0; dx < 3; dx++) {
        const x = bx + dx;

        if (x === col) {
            continue;
        }

        for (let dy = 0; dy < 3; dy++) {
            changed = grid[by + dy][x].delete(d) || changed;
        }
    }

    return changed;
};

/**
 * @function applyBoxLineForRow
 * @description For each digit, if all occurrences in row y fall within the same 3×3 box,
 * eliminates that digit from the rest of the box (box-line reduction).
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} y - the row index
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyBoxLineForRow = (grid: TCandidateGrid, y: number): boolean => {
    let changed = false;

    for (let d = 1; d <= 9; d++) {
        const cols = getLineCandidateCols(grid, y, d);

        if (cols.length < 2) {
            continue;
        }

        const box0 = Math.floor(cols[0] / 3);
        const allSameBox = cols.every((c) => Math.floor(c / 3) === box0);

        if (allSameBox) {
            const by = Math.floor(y / 3) * 3;

            changed = eliminateFromBoxOutsideRow(grid, by, box0 * 3, y, d) || changed;
        }
    }

    return changed;
};

/**
 * @function applyBoxLineForCol
 * @description For each digit, if all occurrences in column x fall within the same 3×3 box,
 * eliminates that digit from the rest of the box (box-line reduction).
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} x - the column index
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyBoxLineForCol = (grid: TCandidateGrid, x: number): boolean => {
    let changed = false;

    for (let d = 1; d <= 9; d++) {
        const rows = getLineCandidateRows(grid, x, d);

        if (rows.length < 2) {
            continue;
        }

        const box0 = Math.floor(rows[0] / 3);
        const allSameBox = rows.every((r) => Math.floor(r / 3) === box0);

        if (allSameBox) {
            const bx = Math.floor(x / 3) * 3;

            changed = eliminateFromBoxOutsideCol(grid, box0 * 3, bx, x, d) || changed;
        }
    }

    return changed;
};

/**
 * @function applyBoxLine
 * @description Applies box-line reduction across all 9 rows and all 9 columns.
 * @param {TCandidateGrid} grid - the candidate grid
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyBoxLine = (grid: TCandidateGrid): boolean => {
    let changed = false;

    for (let i = 0; i < 9; i++) {
        changed = applyBoxLineForRow(grid, i) || changed;
        changed = applyBoxLineForCol(grid, i) || changed;
    }

    return changed;
};

/**
 * @function getRowsWith2ForDigit
 * @description Returns all rows where digit d appears as a candidate in exactly 2 cells.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to look for
 * @returns {TXWingLine[]} - rows with exactly 2 positions for d
 */
const getRowsWith2ForDigit = (
    grid: TCandidateGrid,
    d: number
): TXWingLine[] => {
    const lines: TXWingLine[] = [];

    for (let y = 0; y < 9; y++) {
        const cols = getLineCandidateCols(grid, y, d);

        if (cols.length === 2) {
            lines.push({ idx: y, cells: [cols[0], cols[1]] });
        }
    }

    return lines;
};

/**
 * @function getColsWith2ForDigit
 * @description Returns all columns where digit d appears as a candidate in exactly 2 cells.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to look for
 * @returns {TXWingLine[]} - columns with exactly 2 positions for d
 */
const getColsWith2ForDigit = (
    grid: TCandidateGrid,
    d: number
): TXWingLine[] => {
    const lines: TXWingLine[] = [];

    for (let x = 0; x < 9; x++) {
        const rows = getLineCandidateRows(grid, x, d);

        if (rows.length === 2) {
            lines.push({ idx: x, cells: [rows[0], rows[1]] });
        }
    }

    return lines;
};

/**
 * @function eliminateXWingFromCols
 * @description Removes digit d from columns c1 and c2, skipping the rows in excludeRows.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to eliminate
 * @param {number[]} excludeRows - row indices to skip during elimination
 * @param {number} c1 - first column to eliminate from
 * @param {number} c2 - second column to eliminate from
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateXWingFromCols = (
    grid: TCandidateGrid,
    d: number,
    excludeRows: number[],
    c1: number,
    c2: number
): boolean => {
    let changed = false;

    for (let y = 0; y < 9; y++) {
        if (excludeRows.includes(y)) {
            continue;
        }

        changed = grid[y][c1].delete(d) || changed;
        changed = grid[y][c2].delete(d) || changed;
    }

    return changed;
};

/**
 * @function eliminateXWingFromRows
 * @description Removes digit d from rows r1 and r2, skipping the columns in excludeCols.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to eliminate
 * @param {number[]} excludeCols - column indices to skip during elimination
 * @param {number} r1 - first row to eliminate from
 * @param {number} r2 - second row to eliminate from
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateXWingFromRows = (
    grid: TCandidateGrid,
    d: number,
    excludeCols: number[],
    r1: number,
    r2: number
): boolean => {
    let changed = false;

    for (let x = 0; x < 9; x++) {
        if (excludeCols.includes(x)) {
            continue;
        }

        changed = grid[r1][x].delete(d) || changed;
        changed = grid[r2][x].delete(d) || changed;
    }

    return changed;
};

/**
 * @function applyXWingColBased
 * @description Applies the column-based X-Wing technique for digit d: if d appears in
 * exactly 2 positions in 2 columns and those positions share the same 2 rows, eliminates
 * d from the rest of those rows.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to process
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyXWingColBased = (grid: TCandidateGrid, d: number): boolean => {
    let changed = false;
    const colLines = getColsWith2ForDigit(grid, d);

    for (let i = 0; i < colLines.length; i++) {
        for (let j = i + 1; j < colLines.length; j++) {
            const c1 = colLines[i];
            const c2 = colLines[j];

            if (c1.cells[0] === c2.cells[0] && c1.cells[1] === c2.cells[1]) {
                changed = eliminateXWingFromRows(grid, d, [c1.idx, c2.idx], c1.cells[0], c1.cells[1]) || changed;
            }
        }
    }

    return changed;
};

/**
 * @function applyXWingForDigit
 * @description Applies the X-Wing technique for digit d in both row-based and
 * column-based orientations. If d appears in exactly 2 positions in 2 rows (or cols)
 * and those positions share the same 2 columns (or rows), eliminates d from the rest
 * of those columns (or rows).
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to process
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyXWingForDigit = (grid: TCandidateGrid, d: number): boolean => {
    let changed = false;
    const rowLines = getRowsWith2ForDigit(grid, d);

    for (let i = 0; i < rowLines.length; i++) {
        for (let j = i + 1; j < rowLines.length; j++) {
            const r1 = rowLines[i];
            const r2 = rowLines[j];

            if (r1.cells[0] === r2.cells[0] && r1.cells[1] === r2.cells[1]) {
                changed = eliminateXWingFromCols(grid, d, [r1.idx, r2.idx], r1.cells[0], r1.cells[1]) || changed;
            }
        }
    }

    return applyXWingColBased(grid, d) || changed;
};

/**
 * @function applyXWing
 * @description Applies the X-Wing technique for all digits 1–9.
 * @param {TCandidateGrid} grid - the candidate grid
 * @returns {boolean} - true if any candidate was eliminated
 */
const applyXWing = (grid: TCandidateGrid): boolean => {
    let changed = false;

    for (let d = 1; d <= 9; d++) {
        changed = applyXWingForDigit(grid, d) || changed;
    }

    return changed;
};

/**
 * @function getLinesWith2or3ForDigit
 * @description Returns all rows (isRow=true) or columns (isRow=false) where digit d
 * appears as a candidate in exactly 2 or 3 cells.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {boolean} isRow - true to scan rows, false to scan columns
 * @param {number} d - the digit to look for
 * @returns {TSwordfishLine[]} - lines with 2–3 positions for d
 */
const getLinesWith2or3ForDigit = (
    grid: TCandidateGrid,
    isRow: boolean,
    d: number
): TSwordfishLine[] => {
    const lines: TSwordfishLine[] = [];

    for (let i = 0; i < 9; i++) {
        const positions = isRow
            ? getLineCandidateCols(grid, i, d)
            : getLineCandidateRows(grid, i, d);

        if (positions.length === 2 || positions.length === 3) {
            lines.push({ idx: i, cells: positions });
        }
    }

    return lines;
};

/**
 * @function combineToExactly3
 * @description Returns the union of three position arrays if the union has exactly 3
 * distinct values; otherwise returns null.
 * @param {number[]} a - first array of positions
 * @param {number[]} b - second array of positions
 * @param {number[]} c - third array of positions
 * @returns {number[] | null} - array of 3 distinct positions or null
 */
const combineToExactly3 = (
    a: number[],
    b: number[],
    c: number[]
): number[] | null => {
    const union = [...new Set([...a, ...b, ...c])];

    return union.length === 3 ? union : null;
};

/**
 * @function eliminateSwordfishFromPerp
 * @description Eliminates digit d from the perpendicular lines (cols if isRow, rows if not),
 * skipping the cells that are part of the Swordfish pattern (the base lines).
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to eliminate
 * @param {number[]} excludeLines - the base line indices to skip
 * @param {number[]} perpIndices - the perpendicular line indices to eliminate from
 * @param {boolean} isRow - true if base lines are rows (eliminate from cols)
 * @returns {boolean} - true if any candidate was removed
 */
const eliminateSwordfishFromPerp = (
    grid: TCandidateGrid,
    d: number,
    excludeLines: number[],
    perpIndices: number[],
    isRow: boolean
): boolean => {
    let changed = false;

    for (const pi of perpIndices) {
        for (let i = 0; i < 9; i++) {
            if (excludeLines.includes(i)) {
                continue;
            }

            const cell = isRow ? grid[i][pi] : grid[pi][i];

            changed = cell.delete(d) || changed;
        }
    }

    return changed;
};

/**
 * @function applySwordfishForDigitAndOrientation
 * @description Checks all combinations of 3 rows (or columns) for the Swordfish pattern
 * for digit d: if their combined positions cover exactly 3 perpendicular lines, eliminates
 * d from those perpendicular lines outside the pattern.
 * @param {TCandidateGrid} grid - the candidate grid
 * @param {number} d - the digit to process
 * @param {boolean} isRow - true to scan rows, false to scan columns
 * @returns {boolean} - true if any candidate was eliminated
 */
const applySwordfishForDigitAndOrientation = (
    grid: TCandidateGrid,
    d: number,
    isRow: boolean
): boolean => {
    let changed = false;
    const lines = getLinesWith2or3ForDigit(grid, isRow, d);

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            for (let k = j + 1; k < lines.length; k++) {
                const combined = combineToExactly3(
                    lines[i].cells,
                    lines[j].cells,
                    lines[k].cells
                );

                if (combined) {
                    const excludeLines = [
                        lines[i].idx,
                        lines[j].idx,
                        lines[k].idx,
                    ];

                    changed = eliminateSwordfishFromPerp(grid, d, excludeLines, combined, isRow) || changed;
                }
            }
        }
    }

    return changed;
};

/**
 * @function applySwordfish
 * @description Applies the Swordfish technique for all digits 1–9 in both row-based and
 * column-based orientations.
 * @param {TCandidateGrid} grid - the candidate grid
 * @returns {boolean} - true if any candidate was eliminated
 */
const applySwordfish = (grid: TCandidateGrid): boolean => {
    let changed = false;

    for (let d = 1; d <= 9; d++) {
        changed = applySwordfishForDigitAndOrientation(grid, d, true) || changed;
        changed = applySwordfishForDigitAndOrientation(grid, d, false) || changed;
    }

    return changed;
};

/**
 * @function humanSolve
 * @description Attempts to solve the board using only human-applicable techniques, applied
 * in increasing difficulty order. Returns an ordered list of distinct techniques used, or null
 * if the board cannot be solved by these techniques alone. Never mutates the input board.
 * @param {TBoard} board - the Sudoku puzzle to solve (cloned internally)
 * @returns {TTechniqueUsed[] | null} - ordered list of techniques used, or null if unsolvable
 */
export const humanSolve = (board: TBoard): TTechniqueUsed[] | null => {
    const workBoard: TBoard = board.map((row) => [...row]);
    const grid = initCandidates(workBoard);
    const units = buildUnits();
    const usedTechniques: TTechniqueUsed[] = [];
    const seen = new Set<TTechniqueUsed>();

    const steps: Array<{ name: TTechniqueUsed; fn: () => boolean }> = [
        { name: 'naked_single', fn: () => applyNakedSingles(grid, workBoard) },
        {
            name: 'hidden_single',
            fn: () => applyHiddenSingles(grid, workBoard, units),
        },
        { name: 'naked_pair', fn: () => applyNakedPairs(grid, units) },
        { name: 'hidden_pair', fn: () => applyHiddenPairs(grid, units) },
        { name: 'pointing_pairs', fn: () => applyPointingPairs(grid) },
        { name: 'box_line', fn: () => applyBoxLine(grid) },
        { name: 'x_wing', fn: () => applyXWing(grid) },
        { name: 'swordfish', fn: () => applySwordfish(grid) },
    ];

    while (!isBoardSolved(workBoard)) {
        let foundProgress = false;

        for (const { name, fn } of steps) {
            if (fn()) {
                if (!seen.has(name)) {
                    seen.add(name);
                    usedTechniques.push(name);
                }

                foundProgress = true;
                break;
            }
        }

        if (!foundProgress) {
            return null;
        }
    }

    return usedTechniques;
};
