// API
import {fetchAPIsongs} from './API/deezerdevsfetchAPI.js'

// Functionalities
import { songPlay } from './js/songplay.js';

async function main() {

    let songContainer = document.querySelector('.song-container')

    let [songTitles, songArtists, songCovers, song] = await fetchAPIsongs('atif');

    for (let index = 0; index < songTitles.length; index++) {
        const songTitle = songTitles[index];
        const songArtist = songArtists[index];
        const songCover = songCovers[index];
        const track = song[index];

        let songCard = `<div class="song-card text-start bg-[#090909] rounded-[20px] w-[270px] h-[475px] p-[30px] font-sans" data-song="${track}">
                            <button class="cursor-pointer">
                                <svg fill="none" height="18" viewBox="0 0 24 18" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m0 0h24v3h-12-12zm0 7.5h24v3h-24zm0 7.5h24v3h-24z" fill="#fff"></path>
                                </svg>
                            </button>
                            <div class="flex items-center justify-center mx-auto w-[200px] bg-[#131313] rounded-full">
                                <img class="rounded-full" src="${songCover}" alt="Cover"/>
                            </div>
                            <div class="song-title text-center overflow-hidden text-nowrap text-[#fff] font-medium text-[28px] mb-[10px]">${songTitle}</div>
                            <div class="artist-name text-center text-[#B9B9B9] font-normal text-[16px] cursor-pointer">${songArtist}</div>
                            <div class="info flex justify-between items-center gap-[10px] mt-[20px]">
                                <div class="currTime text-[#fff] font-normal text-[12px]">00:00</div>
                                <div class="w-full h-[4px] border-[1px] border-white">
                                    <div class="progress-bar bg-white h-[100%] w-[0%]"></div>
                                </div>
                                <div class="totalTime text-[#fff] font-normal text-[12px]">00:00</div>
                            </div>
                            <div class="flex justify-between items-center gap-[10px] mt-[20px]">
                                <button class="border-none bg-transparent cursor-pointer">
                                <svg fill="none" height="12" viewBox="0 0 20 12" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m17 1c0-.265216-.1054-.51957-.2929-.707107-.1875-.187536-.4419-.292893-.7071-.292893h-8v2h7v5h-3l3.969 5 4.031-5h-3zm-14 10c0 .2652.10536.5196.29289.7071.18754.1875.44189.2929.70711.2929h8v-2h-7v-5h3l-4-5-4 5h3z" fill="#fff"></path>
                                </svg>
                                </button>
                                <button class="border-none bg-transparent cursor-pointer">
                                <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.5 8V0L0 8L11.5 16V8ZM23 0L11.5 8L23 16V0Z" fill="#fff"></path>
                                </svg>
                                </button>
                                <button class="bg-[#fff] rounded-full w-[60px] h-[60px] flex justify-center items-center cursor-pointer">
                                    <img class="pause-play" src="./assets/icons/pause-icon.svg" alt="play">
                                </button>
                                <button class="border-none bg-transparent cursor-pointer">
                                <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.5 8V0L23 8L11.5 16V8ZM0 0L11.5 8L0 16V0Z" fill="#fff"></path>
                                </svg>
                                </button>
                                <button class="border-none bg-transparent cursor-pointer">
                                <svg fill="#fff" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <!-- SVG content -->
                                </svg>
                                </button>
                            </div>
                            </div>
                            `

        songContainer.innerHTML = songContainer.innerHTML + songCard

    }

    songPlay()

}

main()
