// city name field shouldn't be empty and in case it is empty we'll trown an error in below section
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const datahide = document.querySelector('.middle_layer');
const temp_real_val= document.getElementById('temp_real_val');
const temp_status=document.getElementById('temp_status');

//WHAT  happens with form is that it always goes back t0o its original state and to prevent that we we use prevent default 
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    // if block= when no data is there in the cityName field
    if (cityVal == "") {
        city_name.innerText = 'Please Write the name of the city';
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=fda4fdb514c0d5f0fcf3d52800bbe517`;
            // when we fetch api from url then it'll wait for the3 reply thaqt's why await is used
            const response = await fetch(url);
            const data= await response.json();
            const arrData=[data];
            cityName.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText= (arrData[0].main.temp-273).toFixed(2);
            // temp_status.innerText=arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;
            //comdition to check mood of weather
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
    
                }
                datahide.classList.remove('data_hide');
        } catch {
            city_name.innerText = 'Please Write the name of the city'
            datahide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click', getInfo);