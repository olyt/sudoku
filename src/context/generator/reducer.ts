import React from 'react';
import { EGeneratorType } from '../types';
import { EGeneratorActionTypes, TGeneratorAction } from './actions';

const reducer: React.Reducer<EGeneratorType, TGeneratorAction> = (
    state,
    action
) => {
    switch (action.type) {
        case EGeneratorActionTypes.SetGeneratorType:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
