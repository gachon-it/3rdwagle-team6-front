import React from "react";
import { WiCloudy, WiDaySunny, WiSnow, WiRain, WiLightning, WiRaindrops, WiNa } from "react-icons/wi";
import "./Main.css"; // 기존 스타일 적용

const getWeatherIcon = (weather, size) => {
    const icons = {
        Clouds: <WiCloudy size={size} color="gray" />,
        Clear: <WiDaySunny size={size} color="orange" />,
        Snow: <WiSnow size={size} color="lightblue" />,
        Rain: <WiRain size={size} color="blue" />,
        Drizzle: <WiRaindrops size={size} color="blue" />,
        Thunderstorm: <WiLightning size={size} color="yellow" />,
    };
    return <div style={{width:size,height:size,borderRadius:"50%",backgroundColor:"#F5F6F8"}}>{icons[weather]}</div> || <WiNa size={size} />;
};

// TodayWeather 컴포넌트
const TodayWeather = ({ timeLabel, weather }) => {
    if (!weather) return null; // 날씨 데이터가 없으면 렌더링하지 않음

    return (
        <div className="today-weather-wrap">
            <div className="today-weather-time-icon">{timeLabel}</div>
            {getWeatherIcon(weather.weather[0].main, 100)}
            <div className="today-weather-temperature">{Math.round(weather.main.temp)}°C</div>
        </div>
    );
};

export default TodayWeather;
