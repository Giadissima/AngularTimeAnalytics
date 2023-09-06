export interface ChartFilter{
  fromDate?: Date, 
  toDate?: Date,
  dataAssets: 'alarms' | 'people'
}

export interface DataChart{
  name: string,
  value: number
}