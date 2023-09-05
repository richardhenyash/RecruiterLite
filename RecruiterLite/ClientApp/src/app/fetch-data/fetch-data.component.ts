import   { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_BASE_URL} from "../api/base-api-service";
import {WeatherForecast} from "../models/WeatherForecast";
import {CandidatesApiService} from "../candidates/store/candidates-api.service";
import {FetchDataApiService} from "./fetch-data-api.service";

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private readonly fetchDataApiService: FetchDataApiService) {
    this.fetchDataApiService.loadWeatherForecast().subscribe(res => this.forecasts = res, error => console.log(error));
  }
}
