import React, { createContext, useContext, FC } from 'react'
import { Store } from './store'

export interface IStore {
	store: Store
}

const store = new Store()

const StoreContext = createContext<IStore>({ store })

export const useStore = () => useContext(StoreContext)

export const StoreProvider: FC = ({ children }) => {
	return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
}
