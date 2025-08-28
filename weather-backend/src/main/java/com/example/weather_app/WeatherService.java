package com.example.weather_app;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    // Apni actual API key yahan daal
    private static final String API_KEY = "06fa633c10ad7f8a4c10e0edbe20a0da";

    // Correct URL (q = city, appid = API_KEY, units=metric)
    private static final String WEATHER_URL =
            """
                    https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric""";

    public String getWeather(String city) {
        String url = String.format(WEATHER_URL, city, API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
