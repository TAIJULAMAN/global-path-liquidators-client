import { createContext, useContext, ReactNode } from 'react';

interface Data {
  numbers: number[];
  brands: string[];
}

interface FilterData {
  manifestState: string[];
  categoriesState: string[];
  productConditionState: string[];
  storeState: string[];
  rangePrices: number[];
}

interface DataContextProps {
  children: ReactNode;
  data: Data;
  filterData: FilterData;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<DataContextProps> = ({ children, data, filterData }) => (
    <DataContext.Provider value={{ data, filterData } as DataContextProps}>{children}</DataContext.Provider>

);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
