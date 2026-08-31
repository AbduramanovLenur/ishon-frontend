import { combineReducers } from '@reduxjs/toolkit';

import { reducer as manageCompanyReducer } from '@features/manage-company-modal';
import { reducer as viewCompanyReducer } from '@features/view-company-modal';

export const rootReducer = combineReducers({
  manageCompany: manageCompanyReducer,
  viewCompany: viewCompanyReducer
});
