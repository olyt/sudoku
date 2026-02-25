import React from 'react';
import { EHintsActionTypes, THintsAction } from './actions';
import { THints } from '../types';
import { defaultCell, initialHints } from '../state';

const reducer: React.Reducer<THints, THintsAction> = (state, action) => {
    switch (action.type) {
        case EHintsActionTypes.DecrementHint:
            return { ...state, count: state.count - 1 };
        case EHintsActionTypes.SetHintError:
            return { ...state, error: action.payload };
        case EHintsActionTypes.SetCurrentHint:
            return { ...state, currentHint: action.payload };
        case EHintsActionTypes.ResetCurrentHint:
            return { ...state, currentHint: defaultCell };
        case EHintsActionTypes.ResetHints:
            return initialHints;
        default:
            return state;
    }
};

export default reducer;
