export interface SetFilterParameters{
  dateBegin: Date,
  dateEnd: Date,
  interval: string 
}

export interface DataChart{
  name: string,
  value: number
}

export interface JsonDataModel{
  people: number,
  name: string,
  alarms: number
}

export interface DataChartResponse{
  response: DataChart[]
}

export interface FiltersBarChartDataRequest{
  dateBeginSelected: Date;
  dateEndSelected: Date;
  interval: string;
  container: string;
  dataAssets: 'alarms' | 'people'
}

export interface FiltersPieChartDataRequest{
  dateBeginSelected: Date;
  dateEndSelected: Date;
  dataAssets: 'alarms' | 'people'
}