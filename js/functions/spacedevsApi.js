runSpaceDevsApiFunctions();


function runSpaceDevsApiFunctions() {
       // async
    AsyncFuncs();
}

async function AsyncFuncs() {
    let data = await fetchLaunchData();
    let objects = await modelData(data);
    await displayEvents(objects);
}

async function fetchLaunchData() {
    try {

        let res = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=100&offset=10');

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
        let launchStart = result.window_start;
        let launchStartDay = launchStart.slice(0, 10);
        let launchStartHour = launchStart.slice(11, -1);
  
        let obj = {
            'id': result.id,
            'name': result.name,
            'launch_end': result.window_end,
            'provider': result.launch_service_provider.name,
            'location': result.pad.location.name,
            'image': result.image,
            'launch_start': {
                'day': launchStartDay,
                'hour': launchStartHour,
            }
       }

       objArray.push(obj);
    });

   return objArray;
}

async function displayEvents(objects) {
    objects.forEach(obj => {
        let name = obj.name;
        let launchStartDay = obj.launch_start.day;
        let launchStartHour = obj.launch_start.hour;
        let provider = obj.provider;
        let location = obj.location;
        let image = obj.image;

        const eventTemplate =          
        `
        <article>
            <img class="" src="${image}"/>
            <div class="events__item-data">
                <h2 class="events__item-name">${name}</h2>
                <h3 class="enets__item-provider">${provider}</h3>
                <div class="events__item-location">${location}</div>
                <time class="events__item-launch">
                    <span class="events__item-launch__day">${launchStartDay}</span>
                    <time class="events__item-launch__hour">${launchStartHour}</time>
                </time>

                <p>Time to launch!:<span>${countdown(launchStartDay, launchStartHour)}</span><p>
            </div>
        </article>
        `;

        const ulEvents = document.getElementById('events-list');
        const isEmptyImage = image == null ? true : false;
        const isSetHour = launchStartHour !== '00:00:00' ? true : false;

        if(ulEvents && !isEmptyImage && isSetHour) {
            createEventItem();
        }


        function createEventItem() {
            let li = document.createElement('li');
            li.classList.add('events__item');
            li.innerHTML = eventTemplate;
            ulEvents.appendChild(li);
        }

        function countdown(launchStartDay, launchStartHour) {
            // let time = `${launchStartDay},${launchStartHour}`;
            // let countDownDate = new Date(time);
            // return time;
        }

      
    
    })
}
