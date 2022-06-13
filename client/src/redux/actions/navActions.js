import { navigation } from '../constants/navActionType';

export const openDrawer = (data) => ({
  type: navigation.DRAWER_OPEN,
  payload: data,
});
