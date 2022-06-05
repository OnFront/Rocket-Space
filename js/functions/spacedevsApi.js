


sdAsyncFunctions();


async function sdAsyncFunctions() {
    let data = await fetchLaunchData();
    let objects = await modelData(data);
    await displayEvents(objects);
}

async function fetchLaunchData() {
    try {

        let res = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/?limit=10&offset=10');

        if(res.ok) {
            let data = await res.json();
            return data;
        }
    
    } catch (err) {
        console.error(err);
    }
}

async function modelData(data) {
    let objArray = [];
    let results = await data.results;

    results.forEach(result => {
        
        let obj = {
            'id': result.id,
            'name': result.name,
            'launch_start': result.window_start,
            'launch_end': result.window_end,
            'provider': result.launch_service_provider.name,
            'location': result.pad.location.name,
       }

       objArray.push(obj);
    });

   return objArray;
}

async function displayEvents(objects) {
    objects.forEach(obj => {
        let name = obj.name;
        let launchStart = obj.launch_start;
        let provider = obj.provider;
        let location = obj.location;
        let li = document.createElement('li');
        const ulEvents = document.getElementById('events-list');
        
        li.classList.add('events__item');

        if(ulEvents) {
            li.innerHTML = 
            `
            <h2 class="events__item-name">${name}</h2>
            <div class="events__item-location">${location}</div>
            <div class="events__item-launch__start">${launchStart}</div>
            `
        }

        ulEvents.appendChild(li);
    })
}

