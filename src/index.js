document.addEventListener('DOMContentLoaded', () => {

    //Fetch dog images from API
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(res => res.json())
    .then(data => renderDog(data))
    .catch(e => console.error(e));

    //Fetch dog breeds from API
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then((data) => renderBreed(data))
    .catch(e => console.error(e));

    //Function to render dog data
    function renderDog(data) {
        //grab dog image container
        const dogContainer = document.getElementById('dog-image-container');
        //for each url in message array, create an img element and assign url value to src
        data.message.forEach((url) => {
            const img = document.createElement('img');
            img.src = url;
            //append img to dog image container
            dogContainer.appendChild(img);
        })
    };
    
    //Function to render dog breed data
    function renderBreed(data) {
        //create variable for easier code
        const breedList = data.message;
        //grab dog breed ul
        const ul = document.getElementById('dog-breeds');
        //iterate message object and create li element for each breed
        for (const key in breedList) {
            //conditional to find if breed has array with sub-breeds
            if (breedList[key].length > 0) { //if array of sub-breeds is not empty
                //iterate array
                breedList[key].forEach((element) => {
                    //set breed text content to key plus element
                    const breed = document.createElement('li');
                    breed.textContent = `${key} (${element})`
                    breed.className = key[0]; //give class of first letter
                    breed.id = breed.className //give unique id
                    //append to ul
                    ul.appendChild(breed);
                    addChangeColorListener(breed);
                })
            //else if array of sub-breeds is empy, the breed will be the key
            } else {
                const breed = document.createElement('li');
                breed.textContent = key;
                breed.className = key[0] //give class of first letter
                breed.id = breed.className //give unique id
                ul.appendChild(breed);
                addChangeColorListener(breed);
            }
            
            //function to add event listener to change color of li
            function addChangeColorListener(target) {
                let trigger = true
                target.addEventListener('click', () => {
                    if (trigger) {
                        breed.style.color = '#ff0000';
                        trigger = false;
                    } else {
                        breed.style.color = '#000';
                        trigger = true;
                    }
                })
            }
        }
    }

    //create options in dropdown for every letter of alphabet

    //alphabet array
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    
    //iterate over array and create option elemenet, append to select, and add event listener to sort
    const select = document.getElementById('breed-dropdown');
    alphabet.forEach((letter) => {
        const option = document.createElement('option')
        option.value = letter;
        option.textContent = letter;
        select.appendChild(option);
        select.addEventListener('change', sortBreeds);
    })

    //function to sort through breeds
    function sortBreeds(event) {
        const nodeList = document.querySelectorAll('li'); //grab all li items on page
        const breedArray = Array.from(nodeList); // convert node list to array
        const letter = event.target.value; //grab value of option selected
        //iterate array – if class name of element (first letter of name) matches letter selected, set all other breeds display to none
        breedArray.forEach((element) => {
            if (element.className !== letter) {
                element.style.display = 'none';
            } else if (element.className === letter) {
                element.style.display = 'list-item';
                element.style.textAlign = 'webkit-match-parent';
            }
        })
    }

    //create reset button
    const reset = document.createElement('button');
    reset.textContent = 'reset'
    const ul = document.getElementById('dog-breeds');
    document.body.insertBefore(reset, ul)
    //add event listener
    reset.addEventListener('click', () => {
        const nodeList = document.querySelectorAll('li'); //grab all li items on page
        const breedArray = Array.from(nodeList); // convert node list to array
        breedArray.forEach((element) => {
            element.style.display = 'list-item';
            element.style.textAlign = 'webkit-match-parent';
        })
    })

})