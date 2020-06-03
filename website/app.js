/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=5dbbf38217250549f999fb6ea90767fe';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Add event listener to generate button
document.getElementById("generate").addEventListener('click', generateInfo);

function generateInfo(e) {
    const zipcode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeatherInfo(baseURL, zipcode, apiKey)
        .then(function (data) {
            console.log(data);
            postData('/journalInfo', {
                temp: data.main.temp,
                date: newDate,
                content: feelings
            })
        })
        .then(
            updateUI('/all')
        );
}

// Make GET request to OpenWeatherMap API
const getWeatherInfo = async (baseURL, zipcode, apiKey) => {
    const res = await fetch(baseURL + zipcode + apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Make POST request to add the API data and data entered by user to app
const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log(error);
    }
}

// Update UI
const updateUI = async (url = '') => {
    const request = await fetch(url);
        try{
            const allData =  await request.json();
            document.getElementById("date").innerHTML = allData[0].date;
            document.getElementById("temp").innerHTML = allData[0].temp;
            document.getElementById("content").innerHTML = allData[0].content;
        } catch (error){
            console.log(error);
        }
}