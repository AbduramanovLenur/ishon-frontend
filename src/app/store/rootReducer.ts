import { combineReducers } from '@reduxjs/toolkit';

import { reducer as manageCompanyReducer } from '@features/manage-company-modal';
import { reducer as viewCompanyReducer } from '@features/view-company-modal';
import { reducer as manageCompanyOwnerReducer } from '@features/manage-director-modal';
import { reducer as resetPasswordCompanyOwnerReducer } from '@features/reset-password-company-owner-modal'

export const rootReducer = combineReducers({
  manageCompany: manageCompanyReducer,
  viewCompany: viewCompanyReducer,
  manageCompanyOwner: manageCompanyOwnerReducer,
  resetPasswordCompanyOwner: resetPasswordCompanyOwnerReducer
});
