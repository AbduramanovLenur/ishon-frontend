import { combineReducers } from '@reduxjs/toolkit';

import { reducer as companyReducer } from '@features/manage-company-modal';

export const rootReducer = combineReducers({
  company: companyReducer
});
