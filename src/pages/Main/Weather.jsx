import React, { useEffect, useState } from "react";
import { IoShirt } from "react-icons/io5";
import { PiPantsFill } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import TodayWeather from "./TodayWeather"; // 새로 만든 컴포넌트 임포트
import { WiCloudy, WiDaySunny, WiSnow, WiRain, WiLightning, WiRaindrops, WiNa } from "react-icons/wi";
import "./Main.css";

const API_KEY = "524f96add4f7bb3b7b37f54296b5c857";

const getWeatherIcon = (weather, size) => {
    const icons = {
        Clouds: <WiCloudy size={size} color="gray" />,
        Clear: <WiDaySunny size={size} color="orange" />,
        Snow: <WiSnow size={size} color="lightblue" />,
        Rain: <WiRain size={size} color="blue" />,
        Drizzle: <WiRaindrops size={size} color="blue" />,
        Thunderstorm: <WiLightning size={size} color="yellow" />,
    };
    return icons[weather] || <WiNa size={size} />;
};

function Weather() {
    const [city, setCity] = useState("Loading...");
    const [currentWeather, setCurrentWeather] = useState(null);
    const [todayWeather, setTodayWeather] = useState({ morning: null, afternoon: null, evening: null });
    const [timer, setTimer] = useState("00:00:00");
    const [currentPeriod, setCurrentPeriod] = useState("morning");

    // 현재 시간을 업데이트하는 함수
    const updateTimer = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setTimer(`${String(hours).padStart(2, "0")}:${minutes}:${seconds}`);

        // 현재 시간대 결정 (morning, afternoon, evening)
        if (hours >= 6 && hours < 12) {
            setCurrentPeriod("morning");
        } else if (hours >= 12 && hours < 18) {
            setCurrentPeriod("afternoon");
        } else {
            setCurrentPeriod("evening");
        }
    };

    // 가장 가까운 시간의 날씨 데이터를 찾는 함수
    const findClosestWeather = (list, targetHour) => {
        const filtered = list.filter((w) => {
            const hour = new Date(w.dt_txt).getHours();
            return Math.abs(hour - targetHour) < 3;
        });
        return filtered.length > 0 ? filtered[0] : null;
    };

    // 날씨 정보를 가져오는 함수
    const getWeather = async () => {
        try {
            const latitude = 37.5665;
            const longitude = 126.9780;

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const json = await response.json();

            setCity(json.city.name);

            const todayDate = new Date().toISOString().split("T")[0];
            const todayData = json.list.filter((weather) => weather.dt_txt.includes(todayDate));

            const now = new Date().getHours();
            setCurrentWeather(findClosestWeather(todayData, now));

            setTodayWeather({
                morning: findClosestWeather(todayData, 6),
                afternoon: findClosestWeather(todayData, 12),
                evening: findClosestWeather(todayData, 18),
            });
        } catch (error) {
            console.error("날씨 정보를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        getWeather();
        const interval = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rightside-wrap">
            <div className="timer-wrap">{timer}</div>

            <div style={{fontSize:"40px", fontWeight:"700",fontFamily:"Lobster",padding:"3px"}}>옷장 정보</div>
            <div className="current-clothes-info-wrap">
                <div className="clothes-info">
                    <IoShirt fontSize={"40px"}/>
                    <div>상의: {123}</div>
                </div>
                <div className="clothes-info">
                    <PiPantsFill fontSize={"40px"}/>
                    <div>하의: {11}</div>
                </div>
                <div className="clothes-info">
                    <GiConverseShoe fontSize={"40px"}/>
                    <div>신발: {3}</div>
                </div>
            </div>

            {/* "오늘의 날씨" 타이틀 */}
            <h2 style={{ padding: "3px" }}>오늘의 날씨</h2>

            {/* 현재 시각에 해당하는 날씨를 강조 */}
            <div className="today-weather-info-wrap">
                {currentWeather ? (
                    <>
                    <TodayWeather timeLabel="🌅" weather={todayWeather.morning} isHighlighted={currentPeriod === "morning"} />
                    <TodayWeather timeLabel="☀️" weather={todayWeather.afternoon} isHighlighted={currentPeriod === "afternoon"} />
                    <TodayWeather timeLabel="🌆" weather={todayWeather.evening} isHighlighted={currentPeriod === "evening"} />
                    </> ) : (
                        <p>현재 날씨 정보를 불러오는 중...</p>
                    )}
            </div>
        </div>
    );
}

export default Weather;
