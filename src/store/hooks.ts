import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Hooks tipados — usar sempre no lugar dos genéricos do react-redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector);
