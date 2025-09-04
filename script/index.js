

const loadLessons = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response => response.json())
    .then(json => displayLessons(json.data));
}
const removeActive = () =>{
    const lessonButton = document.querySelectorAll('.lesson-btn');
    // console.log(lessonButton);
    lessonButton.forEach(btn => btn.classList.remove('active'));
}
const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive(); // remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active"); //add active class
        displayLevelWord(data.data)
    });
}
const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla">
                <img class="mx-auto" src="../assets/alert-error.png" />
                  <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                  <p class="font-bold text-4xl">নেক্সট Lesson এ যান</p>
                </div>
        
        `;
        return;
    }
    words.forEach(word => {
        // console.log(word);
        


        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white py-10 px-5 rounded-lg text-center space-y-4">
                    <h2 class="font-bold text-2xl">${word.word ? word.word: "No word found"}</h2>
                    <p class="font-semibold">Meaning /Pronounciation</p>
                    <h3 class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "No word meaning found"} / ${word.pronunciation ? word.pronunciation: "No pronunciation found"}"</h3>
                    <div class="flex justify-between items-center">
                        <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `
        wordContainer.appendChild(card);
    });
}
const displayLessons= (lessons) =>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML ='';
    for(let lesson of lessons){
        const div = document.createElement('div');
        div.innerHTML = `
        
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        
        `
        levelContainer.appendChild(div);
    }
}
loadLessons();