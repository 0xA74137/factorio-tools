import { createContext, useContext, useEffect, useState } from "react"
import axios, { AxiosInstance } from "axios"

type AxiosProviderProps = {
  children: React.ReactNode
  instance?: AxiosInstance
}

const initialState = axios.create()
const AxiosProviderContext = createContext<AxiosInstance>(initialState)

export function AxiosProvider({
  children,
  instance,
  ...props
}: AxiosProviderProps) {

  const value = instance ?? initialState;

  return (
    <AxiosProviderContext.Provider {...props} value={value}>
      {children}
    </AxiosProviderContext.Provider>
  )
}

export const useAxios = () => {
  const context = useContext(AxiosProviderContext)

  if (context === undefined)
    throw new Error("useAxios must be used within an AxiosProvider")

  return context
}
