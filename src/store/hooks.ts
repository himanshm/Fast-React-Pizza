import {
  useSelector,
  useDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';

import { AppDispatch, RootState } from './store.ts';

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
