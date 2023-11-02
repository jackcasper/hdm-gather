import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './stores'

// Define a custom hook for dispatching actions with correct type
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Define a custom hook for selecting state using the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
