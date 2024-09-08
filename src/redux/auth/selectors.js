import { createSelector } from "@reduxjs/toolkit";

export const AuthReducerSelector = (state) => state.auth;

export const forgotPasswordSelector = createSelector(
  AuthReducerSelector,
  (state) => state.forgotPassword
);

export const updatePasswordSelector = createSelector(
  AuthReducerSelector,
  (state) => state.updatePassword
);

export const tokenSelector = createSelector(
  AuthReducerSelector,
  (state) => state.token
);

export const isLoggedInSelector = createSelector(
  AuthReducerSelector,
  (state) => state.isAuthenticated
);

export const userSelector = createSelector(
  AuthReducerSelector,
  (state) => state.user
);

export const selectWaterNorma = createSelector(
  AuthReducerSelector,
  (state) => state.user.user.dailyWaterIntake
);

export const selectWaterRate = createSelector(
  AuthReducerSelector,
  (state) => state.waterRate
);

export const selectWaterToday = createSelector(
  AuthReducerSelector,
  (state) => state.user.dailyWaterIntake
);

export const selectError = createSelector(
  AuthReducerSelector,
  (state) => state.error
);

export const selectisLoading = createSelector(
  AuthReducerSelector,
  (state) => state.is
);