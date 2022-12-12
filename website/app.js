/*Weather API*/
const apiExample = "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=290d7e91217da16e512573666c5ed6b6&units=imperial";
                                            
                                            /* Global Variables */
                                const err = document.querySelector(".err");
                                const zip = document.querySelector("#zip");
                                const feelings = document.querySelector("#feelings");
                                const generate = document.querySelector("#generate");
                                const datee = document.querySelector("#datee");
                                const temp = document.querySelector("#temp");
                                const content = document.querySelector("#content");
                                const city = document.querySelector("#city");
                                const description = document.querySelector("#description");

                                // Create a new date instance dynamically with JS
                                            let d = new Date();
                                            let newDate = d.toDateString();

// Event listener to add function to generate
generate.addEventListener("click", (evt)=>{
    
    evt.preventDefault();
    
    //Show weather panel when clicked 
    var T = document.getElementById("evth");    
    T.style.display = "block";
   
    //Make api url with zip value && the key
    const formURI = `${baseURI}${zip.value}${key}`;
    console.log(formURI);

    //Chain promises
    getData(formURI).then((data) => {projectData(data).then((info) => {postData("/add", info).then((data) => {retreiveData("/all")
                    .then((data)=>{
                                    updateUI(data);
                                  });
                               });
                            });
                          });
                        });

/* Function to GET Web API Data*/
const getData = async (url)=>{
   
    try {   
         const response = await fetch(url);
         const result = await response.json();
         
         if(result.cod != 200){return result;}
        
         return result;
        }
    
    catch(e) {console.log(e.message);}
    };

//project Data function
const projectData = async (data)=>{
try {
    if (data.cod != 200) {return data;} 
       
        const info = {
            date: newDate,
            feelings: feelings.value,
            temp: Math.round(data.main.temp),
            city: data.name,
            description: data.weather[0].description,
                     };    
    return info;    
     }
catch (error) {console.log(error);}}

//Post data function
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
       
        method: 'POST',
        credentials:"same-origin",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)

    });
   
    try {
       
        const result = await response.json();
        return result;}

    catch (err) {console.error(err);}
};

//retreiveData function
const retreiveData = async (url) => {
    const response = await fetch(url);
    try {
        const result = await response.json();      
        return result;} 
    catch (error) {console.error(error);}
};

//UPDATE THE UI
const updateUI = async (info) =>{
    if (!info.message) {
        //Fill divs of weather panel
        datee.innerHTML = info.date;
        temp.innerHTML = info.temp + "˚F";
        content.innerHTML = info.feelings;
        description.innerHTML = info.description;
        city.innerHTML = info.city;
    } else {
        //error message
        city.innerHTML = "Try Again with a Valid zip code";
        datee.innerHTML = "";
        temp.innerHTML = "";
        content.innerHTML = "";
        description.innerHTML = "";
    }
}
  