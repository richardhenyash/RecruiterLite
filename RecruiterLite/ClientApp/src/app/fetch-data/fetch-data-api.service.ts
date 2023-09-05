import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BaseApiService} from "../api/base-api-service";
import {WeatherForecast} from "../models/WeatherForecast";

@Injectable({
  providedIn: 'root',
})
export class FetchDataApiService extends BaseApiService {
  constructor() {
    super();
  }
    public loadWeatherForecast(): Observable<Array<WeatherForecast>> {
    return this.get(`/weatherforecast`, null, false);
  }
}
