import { DataChartResponse, FiltersBarChartDataRequest, FiltersPieChartDataRequest } from '../models/chart.dto';

import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly restClient: RestClientService) {}

  chart = {
    postBarChartData: (filter: FiltersBarChartDataRequest): Promise<DataChartResponse> =>
      this.restClient.post(
        '/chart/bar/data',
        filter
      ),

    postPieChartData: (filter: FiltersPieChartDataRequest): Promise<DataChartResponse> =>
      this.restClient.post(
        '/chart/pie/data',
        filter
      ),

    getHello: () => this.restClient.get(
      ''
    )
  };
}
