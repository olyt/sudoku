/** Visual states a board cell can be rendered in */
export enum ECellStates {
    clicked = 'clicked',
    highlighted = 'highlighted',
    similarNum = 'similarNum',
    finished = 'finished',
    hint = 'hint',
    inactive = 'inactive',
}

/**
 * @function deriveCellState
 * @description Derives the visual state of a board cell from its relation to the clicked cell, current hint and finished areas
 * @param {boolean} sameCell - whether the cell is the currently clicked cell
 * @param {boolean} sameY - whether the cell is in the same row as the clicked cell
 * @param {boolean} sameX - whether the cell is in the same column as the clicked cell
 * @param {boolean} sameValue - whether the cell holds the same value as the clicked cell
 * @param {boolean} digitClicked - whether a digit is selected without a clicked board cell
 * @param {boolean} areaFinished - whether the cell belongs to a fully filled row, column or box
 * @param {boolean} isHint - whether the cell is the currently suggested hint
 * @returns {ECellStates} - the visual state the cell should be rendered in
 */
export const deriveCellState = (
    sameCell: boolean,
    sameY: boolean,
    sameX: boolean,
    sameValue: boolean,
    digitClicked: boolean,
    areaFinished: boolean,
    isHint: boolean
): ECellStates => {
    if (isHint) {
        return ECellStates.hint;
    }

    if (sameCell) {
        return ECellStates.clicked;
    }

    if ((sameY && !sameX) || (!sameY && sameX)) {
        return ECellStates.highlighted;
    }

    if (digitClicked && sameValue) {
        return ECellStates.similarNum;
    }

    if (areaFinished) {
        return ECellStates.finished;
    }

    return ECellStates.inactive;
};
