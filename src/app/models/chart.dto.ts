export interface ChartFilter{
  fromDate: Date, 
  toDate: Date,
  container?: string
}

export interface DataChart{
  name: string,
  value: number
}