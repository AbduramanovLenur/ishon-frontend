import { combineReducers } from '@reduxjs/toolkit';

import { companyReducer } from '@features/manage-company-modal';

export const rootReducer = combineReducers({
  company: companyReducer
});
