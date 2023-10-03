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