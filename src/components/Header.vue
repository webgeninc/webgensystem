<template>
    <div oncontextmenu="return false" v-if="user" @mouseleave="closeCalTask()"
        class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-1/6 shadow-2xl flex flex-row justify-center font-montserrat border-l">
        <div class="flex w-full flex-col items-center justify-start flex-wrap">
            <div v-if="currentCalTaskOpen === true"
                class="bg-gray-200 w-full pb-1 shadow-md mt-5 h-2/9 overflow-x-hidden overflow-y-auto">
                <div v-for="(caltask, iind) in currentCalTask" :key="iind" class="flex flex-col w-full m-0.5 border">
                    <div class="flex flex-row w-full">
                        <div v-if="(caltask.task_color === 3)"
                            class="bg-yellow-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2 font-medium">
                            DO WERYFIKACJI</div>
                        <div v-else-if="(caltask.task_color === 5)"
                            class="bg-blue-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">W TRAKCIE
                            REALIZACJI</div>
                        <div v-else-if="(caltask.task_color === 2)"
                            class="bg-red-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZADANIE
                            ZATRZYMANE</div>
                        <div v-else-if="(caltask.task_color === 1)"
                            class="bg-gray-400 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZWYKŁE
                            ZADANIE</div>
                        <div v-else-if="(caltask.task_color === 6)"
                            class="bg-green-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">ZROBIONE
                            ZADANIE</div>
                        <div v-else-if="(caltask.task_color === 4)"
                            class="bg-purple-600 w-3/4 text-3xs 2xl:text-2xs 3xl:text-xs text-white p-0.5 pl-2">
                            AKTUALIZACJA DLA GRUPY</div>
                        <div
                            class="bg-gray-600 text-3xs 2xl:text-2xs 3xl:text-xs flex-1 text-white p-0.5 pl-2 pr-2 font-medium flex justify-center items-center">
                            <p class="font-normal tracking-wider flex flex-wrap overflow-x-hidden uppercase">{{
                                    caltask.task_worker
                            }}</p>
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <div class="flex flex-row justify-between items-end w-full">
                            <div class="flex justify-start items-center mt-2">
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-sm m-1 font-semibold flex flex-wrap overflow-x-hidden">
                                    {{ caltask.task_name }}</p>
                            </div>
                            <div class="flex justify-end items-end">
                                <p v-if="Math.ceil((new Date(caltask.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) < 0"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    minęło
                                    {{
                                            Math.ceil(Math.abs(new Date(caltask.task_date.replace(/\./g, '/')) - new Date())
                                                / 1000 / 60 / 60 / 24) - 1
                                    }} dni temu
                                </p>
                                <p v-else-if="Math.ceil((new Date(caltask.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) == 0"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    do dzisiaj</p>
                                <p v-else-if="Math.ceil((new Date(caltask.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) <= 7"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    {{
                                            Math.ceil((new Date(caltask.task_date.replace(/\./g, '/')) - new Date()) / 1000 /
                                                60 / 60 / 24)
                                    }} dni</p>
                                <p v-else-if="Math.ceil((new Date(caltask.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) > 7"
                                    class="text-2xs 2xl:text-xs 3xl:text-xs m-1 mr-1 ml-1 font-medium flex flex-wrap justify-end items-end uppercase text-right">
                                    jeszcze
                                    {{
                                            Math.ceil((new Date(caltask.task_date.replace(/\./g, '/')) - new Date()) / 1000 /
                                                60 / 60 / 24)
                                    }} dni
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-around items-center flex-col p-1 h-2/9 mt-5 w-full bg-gray-100">
                <div class="flex justify-around items-center flex-col w-full">
                    <div class="flex justify-center items-center">
                        <div class="flex justify-center items-center overflow-hidden cursor-default select-none m-1">
                            <div class="flex justify-center items-center rounded-full overflow-hidden w-full">
                                <img src="../assets/logo_circle.svg" alt="WIMS" draggable="false"
                                    class="cursor-default select-none p-1 pr-0 pl-0 font-montserrat w-2/7" />
                                <div class="pl-4">
                                    <p
                                        class="text-xs 2xl:text-sm 3xl:text-sm 3xl:tracking-widest tracking-normal font-medium">
                                        WEBGENETICSS</p>
                                    <p class="text-xs 2xl:text-xs tracking-wider font-bold">WIMS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full flex-col justify-start items-start p-1 flex-wrap">
                        <div class="flex flex-row justify-between items-center w-full">
                            <p
                                class="text-gray-800 font-medium text-2xs 2xl:text-2xs 3xl:text-sm text-center tracking-widest cursor-default select-none 3xl:p-0.5">
                                {{ day }}</p>
                            <p
                                class="text-gray-800 font-medium text-2xs 2xl:text-2xs 3xl:text-sm text-center tracking-widest cursor-default select-none 3xl:p-0.5">
                                {{ month }}</p>
                        </div>
                        <div class="flex flex-row justify-between items-center w-full">
                            <p
                                class="text-gray-800 font-medium text-2xs 2xl:text-2xs 3xl:text-sm text-center tracking-widest cursor-default select-none 3xl:p-0.5">
                                {{ time }}</p>
                            <p
                                class="text-gray-800 font-medium text-2xs 2xl:text-2xs 3xl:text-sm text-center tracking-widest cursor-default select-none 3xl:p-0.5">
                                {{ date }}</p>
                        </div>
                    </div>
                </div>
                <div class="h-px w-11/12 bg-gray-300 mr-0.5 ml-0.5"></div>
                <div class="p-2 pr-2 pl-2 flex justify-end flex-col w-full">
                    <div v-if="FirmNotification" class="flex justify-between items-center flex-row w-full">
                        <div class="flex justify-start items-center h-full w-2 bg-red-500 mr-1 rounded-lg"></div>
                        <div class="flex justify-center items-center flex-col ml-2 w-full">
                            <p
                                class="text-gray-800 font-semibold text-3xs 2xl:text-2xs 3xl:text-xs tracking-wider cursor-default select-none w-full">
                                Jest
                                <span class="font-normal border-b border-gray-500">{{ dayOfDate }}</span>
                                -
                                {{ FirmNotification }}
                            </p>
                            <p v-if="monthOfDate < 3"
                                class="text-gray-800 font-semibold text-3xs 2xl:text-2xs 3xl:text-xs tracking-wider cursor-default select-none w-full">
                                Jest
                                <span class="font-normal border-b border-gray-500">{{ MonthOfYear }}</span>
                                -
                                {{ PitNotification }}
                            </p>
                        </div>
                    </div>
                    <div v-else class="flex justify-center items-center">
                        <p
                            class="text-gray-800 font-medium text-2xs 2xl:text-xs 3xl:text-sm text-center tracking-widest cursor-default select-none">
                            Masz
                            <span class="font-normal border-b border-gray-500">0</span> powiadomień :)
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="notesTabOpen === false" class="mb-5"></div>

            <!-- KALENDARZ -->

            <div v-if="(helpTabOpen === false) && (notesTabOpen === false)"
                class="flex flex-col justify-start items-center bg-gray-100 w-full 2xl:h-110 h-92 pt-1 pb-3">
                <div class="w-full relative">
                    <div class="flex w-full h-14 flex-row justify-around items-center">
                        <button @click="prevMonth"
                            class="h-7 w-7 cursor-pointer hover:opacity-50 transition select-none text-lg font-medium flex-1">&lt;</button>
                        <p
                            class="text-sm 2xl:text-base font-medium mt-1 w-3/5 text-center tracking-wider cursor-default select-none">
                            {{ calMonth }} {{ yearNow }}</p>
                        <button @click="nextMonth"
                            class="h-7 w-7 cursor-pointer hover:opacity-50 transition select-none text-lg flex-1 font-medium">></button>
                    </div>
                </div>
                <div class="bg-gray-500 w-10/12 h-px m-1 opacity-70"></div>
                <div class="flex p-2 mt-1 pb-2 pt-5 w-full text-2xs font-semibold 2xl:text-xs">
                    <div class="w-1/7 flex justify-center items-center">PON</div>
                    <div class="w-1/7 flex justify-center items-center">WT</div>
                    <div class="w-1/7 flex justify-center items-center">ŚR</div>
                    <div class="w-1/7 flex justify-center items-center">CZW</div>
                    <div class="w-1/7 flex justify-center items-center">PT</div>
                    <div class="w-1/7 flex justify-center items-center">SOB</div>
                    <div class="text-red-700 w-1/7 flex justify-center items-center">NDZ</div>
                </div>
                <div v-if="dataLoaded" class="flex">
                    <div class="flex flex-wrap p-2 w-full text-xs 2xl:text-sm">
                        <div v-for="(day, index) in calPrevDaysInMonth" :key="index"
                            class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center">
                            <div
                                class="flex flex-col justify-center items-center cursor-pointer transition rounded-md hover:bg-gray-300 w-98/100 h-9/10">
                                <span class="mb-2">
                                    {{
                                            day
                                    }}
                                </span>
                            </div>
                        </div>
                        <div @click="showCalTask(day)" v-for="(day, index) in calDaysInMonth" :key="index"
                            class="w-1/7 2xl:h-12 h-8 flex justify-center items-center">
                            <div v-if="(yearWithMonth === reallyNow) && (day.charAt(8) + day.charAt(9)) == reallyNowDay"
                                class="flex justify-center items-center cursor-pointer transition flex-col rounded-md w-98/100 h-9/10 hover:text-gray-100 hover:bg-gray-300">
                                <div class="text-base">✔️</div>
                                <div
                                    class="flex flex-row flex-wrap m-1.5 mb-2 mt-0 justify-start items-end overflow-hidden">
                                    <div v-for="(taskd, inde) in  dataTasks" :key="inde" class="flex flex-row">
                                        <div v-if="(taskd.task_date === day & taskd.task_color === 1)"
                                            class="h-0.75 w-2.5 rounded-full bg-gray-400 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 2)"
                                            class="h-0.75 w-2.5 rounded-full bg-red-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 3)"
                                            class="h-0.75 w-2.5 rounded-full bg-yellow-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 4)"
                                            class="h-0.75 w-2.5 rounded-full bg-purple-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 5)"
                                            class="h-0.75 w-2.5 rounded-full bg-blue-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 6)"
                                            class="h-0.75 w-2.5 rounded-full bg-green-400 m-px text-2xs"></div>
                                    </div>
                                </div>
                            </div>
                            <div v-else
                                class="flex justify-center items-center flex-col cursor-pointer transition rounded-md hover:bg-gray-300 w-98/100 h-9/10">
                                <div class>{{ day.charAt(8) + day.charAt(9) }}</div>
                                <div
                                    class="flex flex-row flex-wrap m-0.5 mb-2 mt-0 justify-start items-end overflow-hidden">
                                    <div v-for="(taskd, inde) in  dataTasks" :key="inde"
                                        class="flex flex-row overflow-hidden">
                                        <div v-if="(taskd.task_date === day & taskd.task_color === 1)"
                                            class="h-0.75 w-2.5 rounded-full bg-gray-400 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 2)"
                                            class="h-0.75 w-2.5 rounded-full bg-red-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 3)"
                                            class="h-0.75 w-2.5 rounded-full bg-yellow-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 4)"
                                            class="h-0.75 w-2.5 rounded-full bg-purple-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 5)"
                                            class="h-0.75 w-2.5 rounded-full bg-blue-600 m-px text-2xs"></div>
                                        <div v-else-if="(taskd.task_date === day & taskd.task_color === 6)"
                                            class="h-0.75 w-2.5 rounded-full bg-green-400 m-px text-2xs"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-for="(day, index) in calNextDaysInMonth" :key="index"
                            class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center">
                            <div
                                class="flex justify-center flex-col items-center cursor-pointer transition rounded-md hover:bg-gray-300 w-98/100 h-9/10">
                                <span class="mb-2">
                                    {{
                                            day
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="(helpTabOpen === false) && (notesTabOpen === false)"
                class="transition flex flex-col justify-end items-end flex-grow w-full p-2 mt-3 cursor-default select-none">
                <div class="flex flex-row justify-between items-center">
                    <p
                        class="border border-gray-500 p-0.5 pr-3 pl-3 mb-2 mr-2 rounded-sm text-gray-400  bg-gray-800  text-right font-light text-2xs tracking-widest transition cursor-default select-none">
                        faktury</p>
                    <p @click="notesTabOpeningFunction"
                        class="border p-0.5 pr-3 pl-3 mb-2 mr-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none">
                        notki ({{ dataNotes.length }})</p>
                    <p @click="helpTabOpeningFunction"
                        class="border p-0.5 pr-3 pl-3 mb-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none">
                        pomoc</p>
                </div>

                <p class="text-gray-300 font-light text-2xs text-right tracking-wider pt-px pb-px">Zalogowano jako:</p>
                <p class="text-gray-300 font-light text-xs text-right tracking-wider">{{ user.email }}</p>
                <p @click="logout"
                    class="text-red-300 text-right font-light text-xs tracking-widest pb-2 pt-1 mb-2 transition cursor-pointer hover:text-opacity-70 select-none">
                    Wyloguj się</p>
                <p class="text-gray-300 font-light text-xs text-right tracking-wide">
                    <span class="font-medium tracking-widest">WIMS</span> 0.7.55
                </p>
                <p class="text-gray-300 font-normal text-xs text-right tracking-wide">
                    ♻ CO2-FREE
                    <span class="font-light tracking-widest text-2xs">for our planet</span>
                </p>
            </div>
            <div v-if="notesTabOpen === true"
                class="transition flex flex-col justify-end items-start flex-grow p-2 pr-1 mt-3 cursor-default select-none relative h-10 w-full overflow-hidden">
                <div class="overflow-hidden w-full h-full overflow-y-scroll pr-10 box-content">
                    <div class="text-gray-300 font-light text-xs text-center tracking-wide mb-1 w-full">
                        <div v-for="(note, index) in dataNotes" :key="index"
                            class="flex flex-col justify-evenly items-start flex-wrap m-0.5 mb-3 bg-gray-200 rounded-sm w-full">
                            <div class="flex flex-col w-full text-gray-800 font-semibold">
                                <div class="flex p-1 w-full flex-col pb-0">
                                    <p class="m-1 text-xs tracking-tight text-left">{{ note.note_note }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full p-0 m-0">
                                    <div class="flex flex-row ml-1 text-xs">
                                        <p class="text-justify m-1 text-2xs tracking-normal">{{ note.note_date }}</p>
                                        <p class="text-justify m-1 text-2xs tracking-normal">{{ note.note_time }}</p>
                                        <p @click="deleteNote(note.id)"
                                            class="text-justify m-1 text-2xs text-red-700 hover:text-red-600 cursor-pointer tracking-wider">
                                            usuń</p>
                                    </div>

                                    <p class="text-justify m-1 mr-2 text-xs tracking-normal">{{ note.note_worker }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="notesCreateForm === true" class="w-full p-1 pt-3 pr-2">
                    <form @submit.prevent="pushNote" action class="flex flex-col p-1 w-full">
                        <textarea ref="notka" autocomplete="off" maxlength="500" minlength="5" v-model="noteNote"
                            id="noteNote" type="text" placeholder="Nowa notka"
                            class="border focus:outline-none resize-none text-xs p-2" />
                        <div class="flex flex-row justify-around items-center w-full">
                            <button type="submit"
                                class="mt-2 flex-1 mr-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner">+</button>
                            <button @click="notesCreateClose"
                                class="mt-2 h w-1/4 ml-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner">-</button>
                        </div>
                    </form>
                </div>
                <div class="h-px w-full bg-gray-400 mt-2 mb-2"></div>
                <div class="flex flex-row">
                    <p @click="notesCreateOpen(), focusNote()"
                        class="border p-0.5 pr-3 pl-3 mb-2 mr-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none">
                        dodaj notke</p>
                    <p @click="notesTabClosingFunction"
                        class="border p-0.5 pr-3 pl-3 mb-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none">
                        zamknij notki</p>
                </div>

                <p class="text-gray-300 font-light text-xs text-right tracking-wide mt-2">
                    <span class="font-medium tracking-widest">WIMS</span> 0.7.55
                </p>
                <p class="text-gray-300 font-light text-2xs text-right tracking-widest">
                    <span class="font-medium tracking-wider">WEBGENETICSS</span> Interpolate Management System
                </p>
            </div>
            <div v-if="helpTabOpen === true"
                class="transition flex flex-col justify-end items-end flex-grow w-full p-2 mt-3 cursor-default select-none">
                <div class="text-gray-300 font-light text-2xs 2xl:text-xs 3xl:text-sm text-center tracking-wide mb-1">
                    <div class="flex flex-col justify-evenly items-start flex-wrap m-0.5 mb-2">
                        <div class="flex m-0.5 2xl:m-1">
                            <div class="p-1 bg-gray-400 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                                <span class="font-medium tracking-wider">ZADANIE</span> Tą etykiete posiadają zwykłe
                                zadania, nie posiadające cech unikalnych.
                            </p>
                        </div>
                        <div class="flex m-0.5 2xl:m-1">
                            <div class="p-1 bg-red-600 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                                <span class="font-medium tracking-wider">STOP</span> Dodajemy tą etykiete do zadania,
                                które posiada błąd, lub problem, którego nie możemy rozwiązać.
                            </p>
                        </div>
                        <div class="flex m-0.5 2xl:m-1">
                            <div class="p-1 bg-yellow-600 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                                <span class="font-medium tracking-wider">WERYFIKACJA</span> Dodajemy tą etykiete, kiedy
                                prosimy o sprawdzenie błędów, czy zgody w decyzyjności wspólnej.
                            </p>
                        </div>
                        <div class="flex m-0.5 2xl:m-1">
                            <div class="p-1 bg-purple-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                                <span class="font-medium tracking-wider">AKTUALIZACJA</span> Dodajemy tą etykiete, gdy
                                chcemy, by reszta grupy zapoznała się z tą zmianą.
                            </p>
                        </div>
                        <div class="flex m-0.5 2xl:m-1">
                            <div class="p-1 bg-blue-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                                <span class="font-medium tracking-wider">ROZPOCZĘTO</span> Tą etykietą oznaczamy
                                zadania, które mają status aktywny.
                            </p>
                        </div>
                        <div class="flex m-0.5 2xl:m-1">
                            <div class="p-1 bg-green-500 rounded-full ml-0.5 mr-0.5 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-2xs 2xl:text-xs 3xl:text-xs tracking-normal">
                                <span class="font-medium tracking-wider">ZROBIONE</span>
                                Tą etykiete dodajemy na koniec, by oznaczyć zadanie jako zrobione lub zrobione i
                                sprawdzone.
                            </p>
                        </div>
                    </div>
                    <p class="p-1 pb-0 text-3xs 2xl:text-xs 3xl:text-sm">
                        <span class="border-gray-200 font-semibold p-1 text-2xs">shift + scroll myszką</span> lub
                        <span class="border-gray-200 font-semibold p-1 text-2xs">drag nagłówka karty</span>
                        scrollowanie okna pracy
                    </p>
                </div>
                <div class="h-px w-full bg-gray-400 mt-2 mb-2"></div>
                <p @click="helpTabClosingFunction"
                    class="border p-0.5 pr-3 pl-3 mb-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-3xs 2xl:text-xs tracking-widest transition cursor-pointer select-none">
                    zamknij pomoc</p>
                <p class="text-gray-300 font-light text-2xs 2xl:text-xs tracking-wider">{{ user.email }}</p>
                <p class="text-webgencol font-light text-3xs 2xl:text-xs text-right tracking-wider">{{ user.aud }}</p>
                <p class="text-gray-300 font-light text-3xs 2xl:text-xs text-right tracking-wider mt-1">
                    ostatnio zalogowany - {{
                            user.last_sign_in_at
                    }}
                </p>
                <p class="text-gray-300 font-light text-3xs 2xl:text-xs text-right tracking-widest">
                    <span class="font-medium tracking-wider">WEBGENETICSS</span> Interpolate Management System
                </p>
            </div>
        </div>
        <div v-if="invoiceWindow === true"
            class="bg-gray-100 absolute top-16 left-28 right-28 bottom-16 rounded-xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden">
            <div class="bg-gray-200 p-5 pt-8 pb-1 pl-8 flex justify-between items-center">
                <p class="font-semibold text-xl tracking-wider text-gray-700"><span
                        class="text-webgencol font-bold text-2xl">WIMS</span>
                    FAKTURA 0.029.0 // w trakcie
                    przebudowy..
                </p>
                <div @click="invoiceWindowHandler"
                    class="bg-gray-300 p-0.5 pl-4 pr-4 cursor-pointer hover:bg-gray-400 hover:text-white font-medium tracking-wider">
                    ZAMKNIJ</div>
            </div>
            <div class="w-full flex-1 flex flex-row p-3 bg-white">
                <form class="w-1/2 h-full flex justify-start items-center mr-10">
                    <div class="w-1/2 h-full flex justify-start items-center mr-6">
                        <div class="flex flex-col justify-start items-start w-full h-full">
                            <div class="flex flex-col border border-gray-300 p-3 pt-4 pb-1 rounded-2xl w-full mb-4">
                                <div class="flex justify-start items-center">
                                    <div class="flex-1 flex justify-between items-center w-full">
                                        <p class="font-semibold text-sm">DANE FIRMOWE</p>
                                    </div>
                                </div>
                                <div class="w-full h-px bg-gray-300 mb-3 mt-2"></div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full">
                                    <label class="mr-4 text-sm mb-0.5">Nazwa/Numer faktury</label>
                                    <input type="text" placeholder="XX/2022"
                                        class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 w-full" />
                                </div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full">
                                    <label class="mr-4 text-sm mb-0.5">Nazwa pliku PDF</label>
                                    <input type="text" placeholder="Faktura_25.pdf"
                                        class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 w-full" />
                                </div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full flex-wrap">
                                    <label class="mr-4 text-sm w-1/3 mb-0.5">Sprzedawca</label>
                                    <div class="flex justify-start items-start flex-col flex-1 w-full">
                                        <input type="text" placeholder="Nazwa firmy"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 w-full" />
                                        <input type="text" placeholder="Adres 1"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 mt-1.5 mb-1.5 w-full" />
                                        <input type="text" placeholder="Adres 2"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 mb-1.5 w-full" />
                                        <input type="text" placeholder="NIP"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 mb-1.5 w-full" />
                                    </div>
                                </div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full flex-wrap">
                                    <label class="mr-4 text-sm w-1/3 mb-0.5">Nabywca</label>
                                    <div class="flex justify-start items-start flex-col flex-1 w-full">
                                        <input type="text" placeholder="Nazwa firmy"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 w-full" />
                                        <input type="text" placeholder="Adres 1"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 mt-1.5 mb-1.5 w-full" />
                                        <input type="text" placeholder="Adres 2"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 mb-1.5 w-full" />
                                        <input type="text" placeholder="NIP"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 mb-1.5 w-full" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col border border-gray-300 p-3 pt-4 pb-4 rounded-2xl mb-4">
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full">
                                    <label class="mr-4 text-sm mb-0.5">Data i miejsce wystawienia faktury</label>
                                    <div class="flex flex-row">
                                        <input type="date"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-3/5 mr-1" />
                                        <input type="text" placeholder="Miasto"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-2/5 ml-1" />
                                    </div>
                                </div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full">
                                    <label class="mr-4 text-sm mb-0.5">Data zakończenia dostawy/usługi</label>
                                    <input type="date"
                                        class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 flex-1 w-full" />
                                </div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full">
                                    <label class="mr-4 text-sm mb-0.5">Data i forma płatności</label>
                                    <div class="flex flex-row w-full">
                                        <input type="date"
                                            class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-3/5 mr-1" />
                                        <select name="" id=""
                                            class=" border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-2/5 mr-1">
                                            <option value="">Przelew</option>
                                            <option value="">Gotówka</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 h-full flex justify-start items-center mr-6">
                        <div class="flex flex-col justify-start items-start w-full h-full">
                            <div class="flex flex-col border border-gray-300 p-3 pt-4 pb-1 mb-4 rounded-2xl w-full">
                                <div class="flex justify-start items-center">
                                    <div class="flex-1 flex justify-between items-center w-full">
                                        <p class="font-semibold text-sm">USŁUGI (0)</p>
                                        <button
                                            class="bg-gray-200 text-gray-700 pl-3 pr-3 rounded-lg text-2xs p-0.5 hover:bg-gray-600 hover:text-white">Wyczyść
                                            wszystkie</button>
                                    </div>
                                </div>
                                <div class="w-full h-px bg-gray-300 mb-3 mt-2"></div>
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full flex-wrap">
                                    <div class="flex justify-between items-center w-full mb-2">
                                        <div class="flex-1 flex">
                                            <label class="text-sm mr-1">Usługa</label>
                                            <p class="text-sm ">nr 1</p>
                                        </div>
                                        <div class="">
                                            <button
                                                class="bg-gray-200 text-gray-700 pl-3 pr-3 rounded-lg text-xs p-0.5 hover:bg-gray-600 hover:text-white">Dodaj</button>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start flex-col flex-1 w-full">
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">Nazwa usługi</label>
                                            <input type="text" placeholder="Nazwa usługi"
                                                class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-full mr-1" />

                                        </div>
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">Jednostki miary i ilość</label>
                                            <div class="flex justify-start items-start w-full">
                                                <input type="text" placeholder="Jednostki miary"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1  w-3/5 mr-1" />
                                                <input type="text" placeholder="Ilość"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1  w-2/5 ml-1" />
                                            </div>
                                        </div>
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">Cena netto i brutto</label>
                                            <div class="flex justify-start items-start w-full">
                                                <input type="text" placeholder="Cena netto"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 mr-1" />
                                                <input type="text" placeholder="Cena brutto"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 ml-1" />
                                            </div>
                                        </div>
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">Wartość netto i brutto</label>
                                            <div class="flex justify-start items-start w-full">
                                                <input type="text" placeholder="Wartość netto"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 mr-1" />
                                                <input type="text" placeholder="Wartość brutto"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 ml-1" />
                                            </div>
                                        </div>
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">VAT (%) / Razem</label>
                                            <div class="flex justify-start items-start w-full">
                                                <input type="text" placeholder="VAT (%)"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/4 mr-1" />
                                                <input type="text" placeholder="Razem"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-3/4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col border border-gray-300 p-3 pt-4 pb-1 mb-4 rounded-2xl w-full">
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full flex-wrap">
                                    <div class="flex justify-between items-center w-full mb-3">
                                        <div class="flex-1 flex">
                                            <label class="text-sm mr-1">Suma według stawek VAT w PLN</label>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start flex-col flex-1 w-full">
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">Netto i Brutto</label>
                                            <div class="flex justify-start items-start w-full">
                                                <input type="text" placeholder="Netto"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 mr-1" />
                                                <input type="text" placeholder="Brutto"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 ml-1" />
                                            </div>
                                        </div>
                                        <div class="flex flex-col justify-start items-start w-full mb-2">
                                            <label class="text-xs  mb-0.5">VAT (%) i Kwota VAT</label>
                                            <div class="flex justify-start items-start w-full">
                                                <input type="text" placeholder="VAT (%)"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 mr-1" />
                                                <input type="text" placeholder="Kwota VAT"
                                                    class="border border-gray-300 rounded-sm focus:border focus:border-gray-500 focus:outline-none p-px pl-1 pr-1 w-1/2 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col border border-gray-300 p-3 pt-4 pb-1 rounded-2xl w-full">
                                <div class="mt-1 mb-1 flex flex-col justify-start items-start w-full flex-wrap">
                                    <div class="flex justify-between items-center w-full mb-3">
                                        <div class="flex-1 flex">
                                            <label class="text-sm mr-1 font-semibold">Razem do zapłaty</label>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start flex-col flex-1 w-full">
                                        <div class="flex justify-between items-start w-full mb-2">
                                            <label class="text-base mb-0.5">Kwota: <span
                                                    class="ml-1 mr-1 text-lg">500</span>
                                            </label>
                                            <label class="text-base mb-0.5">Waluta: <span
                                                    class="ml-1 mr-1 text-lg">PLN</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-4 pb-1 rounded-2xl w-full justify-between">
                                <button class="bg-gray-200 hover:bg-gray-300 p-0.5 pl-5 pr-5">Generuj</button>
                                <button class="bg-gray-100 text-gray-300 cursor-not-allowed p-0.5 pl-5 pr-5">Drukuj jako
                                    PDF</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="w-1/2 h-full ml-10">

                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { supabase } from '../supabase/init.js'
import { useRouter } from "vue-router";
import store from '../store/index.js';
import { computed } from 'vue';
import { ref } from "vue";

export default {
    name: 'Header',
    data: () => ({
        time: "",
        day: "",

        zus: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

    }),
    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60
        },
        _hours() {
            return this._minutes * 60
        },
        todayComputed: function () {
            return this.calDaysInMonth.filter(i => i === 29)
        }
    },
    mounted() {
        this.showTime();
        this.showDate();
        this.showdayOfWeek();
        this.showMonth();
    },
    setup() {
        const FirmNotification = ref(null);
        const PitNotification = ref(null);
        const MonthOfYear = ref(null);
        const dataLoaded = ref(null);
        let now = new Date();
        const reallyNow = ref(now.getFullYear() + "" + now.getMonth())
        const reallyNowDay = ref(now.getDate())
        let dayOfDate = ref(now.getDate());
        let monthOfDate = ref(now.getMonth());
        let yearNow = ref(now.getFullYear())


        if (monthOfDate.value < 2) {
            PitNotification.value = "PIT-28 do końca lutego.";
        } else if (monthOfDate.value == 2) {
            PitNotification.value = "Przypomnienie o ZWROTCIE PODATKU";
        } else {
            PitNotification.value = null;
        }

        if ((dayOfDate.value > 0) && (dayOfDate.value < 20)) {
            FirmNotification.value = "Przypomnienie o ZUS i podatku";
        } else if (dayOfDate.value > 20) {
            FirmNotification.value = "Przypomnienie o FAKTURKACH";
        } else {
            FirmNotification.value = null;
        }

        if (monthOfDate.value == 0) {
            MonthOfYear.value = "styczeń";
        } else if (monthOfDate.value == 1) {
            MonthOfYear.value = "luty";
        } else if (monthOfDate.value == 2) {
            MonthOfYear.value = "marzec";
        }
        else {
            MonthOfYear.value = null;
        }



        const user = computed(() => store.state.user)
        const router = useRouter();
        const logout = async () => {

            await supabase.auth.signOut();
            setTimeout(() => {
                router.push({ name: "Login" });
            }, 300);

        }


        // KALENDARZ

        const months = ref([
            "STYCZEŃ",
            "LUTY",
            "MARZEC",
            "KWIECIEŃ",
            "MAJ",
            "CZERWIEC",
            "LIPIEC",
            "SIERPIEŃ",
            "WRZESIEŃ",
            "PAŹDZIERNIK",
            "LISTOPAD",
            "GRUDZIEŃ",
        ])


        const lastDayofMonth = ref(new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDate());
        const prevLastDayofMonth = ref(new Date(now.getUTCFullYear(), now.getMonth(), 0).getDate());
        let calMonth = ref(months.value[monthOfDate.value])
        let calDaysInMonth = ref([]);
        let calPrevDaysInMonth = ref([]);
        const calLastDayOfWeek = ref(new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDay());
        now.setDate(1);

        let caldayOfWeek = ref(now.getUTCDay());
        let calNextDaysInMonth = ref([]);
        let yearWithMonth = ref(yearNow.value + "" + monthOfDate.value);



        const getDataTasksForDays = () => {
            calDaysInMonth.value = [];
            calPrevDaysInMonth.value = [];
            calNextDaysInMonth.value = [];

            lastDayofMonth.value = new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDate();
            prevLastDayofMonth.value = new Date(now.getUTCFullYear(), now.getMonth(), 0).getDate()
            calMonth.value = months.value[monthOfDate.value];
            calLastDayOfWeek.value = new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDay();
            caldayOfWeek.value = now.getUTCDay();

            yearWithMonth.value = yearNow.value + "" + monthOfDate.value;

            if (caldayOfWeek.value == 0) {
                caldayOfWeek.value = 7
            }



            for (let j = caldayOfWeek.value - 2; j > -1; j--) {
                calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
            }

            if (caldayOfWeek.value == 1) {
                for (let j = 8; j > 1; j--) {
                    calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
                }
            }

            for (let i = 1; i <= lastDayofMonth.value; i++) {
                if (i < 10) {
                    i = "0" + i
                }

                calDaysInMonth.value.push(now.getFullYear() + "-" + (now.getMonth() < 9 ? ("0" + ((now.getMonth()) + 1)) : ((now.getMonth()) + 1)) + "-" + i);


            }

            if (calPrevDaysInMonth.value.length + calDaysInMonth.value.length < 35) {
                for (let x = 1; x <= 14 - (calLastDayOfWeek.value); x++) {
                    calNextDaysInMonth.value.push(x);
                }
            }
            else {
                for (let x = 1; x <= 7 - (calLastDayOfWeek.value); x++) {
                    calNextDaysInMonth.value.push(x);

                }

            }
            dataLoaded.value = true;
        }





        // FUUUUNKKCJA
        const prevMonth = () => {
            now.setUTCMonth(now.getMonth() - 1)

            monthOfDate.value = now.getUTCMonth();
            calMonth.value = months.value[monthOfDate.value]
            lastDayofMonth.value = new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDate()
            yearNow.value = now.getUTCFullYear();
            caldayOfWeek.value = now.getUTCDay();

            prevLastDayofMonth.value = new Date(now.getUTCFullYear(), now.getMonth(), 0).getDate();
            calLastDayOfWeek.value = new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDay();
            calDaysInMonth.value = [];
            calPrevDaysInMonth.value = [];

            yearWithMonth.value = yearNow.value + "" + monthOfDate.value;

            if (caldayOfWeek.value == 0) {
                caldayOfWeek.value = 7
            }


            for (let j = caldayOfWeek.value - 2; j > -1; j--) {
                calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
            }

            if (caldayOfWeek.value == 1) {
                for (let j = 8; j > 1; j--) {
                    calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
                }
            }



            for (let i = 1; i <= lastDayofMonth.value; i++) {
                if (i < 10) {
                    i = "0" + i
                }
                calDaysInMonth.value.push(now.getFullYear() + "-" + (now.getMonth() < 9 ? ("0" + ((now.getMonth()) + 1)) : ((now.getMonth()) + 1)) + "-" + i);
            }
            calNextDaysInMonth.value = [];

            if (calPrevDaysInMonth.value.length + calDaysInMonth.value.length < 35) {
                for (let x = 1; x <= 14 - (calLastDayOfWeek.value); x++) {
                    calNextDaysInMonth.value.push(x);
                }
            }
            else {
                for (let x = 1; x <= 7 - (calLastDayOfWeek.value); x++) {
                    calNextDaysInMonth.value.push(x);

                }

            }

        }
        const nextMonth = () => {
            now.setUTCMonth(now.getMonth() + 1)

            monthOfDate.value = now.getUTCMonth();
            calMonth.value = months.value[monthOfDate.value]
            lastDayofMonth.value = new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDate()
            yearNow.value = now.getUTCFullYear();
            caldayOfWeek.value = now.getUTCDay();

            prevLastDayofMonth.value = new Date(now.getUTCFullYear(), now.getMonth(), 0).getDate();
            calLastDayOfWeek.value = new Date(now.getUTCFullYear(), now.getMonth() + 1, 0).getDay();
            calDaysInMonth.value = [];
            calPrevDaysInMonth.value = [];

            yearWithMonth.value = yearNow.value + "" + monthOfDate.value;

            if (caldayOfWeek.value == 0) {
                caldayOfWeek.value = 7
            }



            for (let j = caldayOfWeek.value - 2; j > -1; j--) {
                calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
            }

            if (caldayOfWeek.value == 1) {
                for (let j = 8; j > 1; j--) {
                    calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
                }
            }



            for (let i = 1; i <= lastDayofMonth.value; i++) {
                if (i < 10) {
                    i = "0" + i
                }
                calDaysInMonth.value.push(now.getFullYear() + "-" + (now.getMonth() < 9 ? ("0" + ((now.getMonth()) + 1)) : ((now.getMonth()) + 1)) + "-" + i);
            }

            calNextDaysInMonth.value = [];

            if (calPrevDaysInMonth.value.length + calDaysInMonth.value.length < 35) {
                for (let x = 1; x <= 14 - (calLastDayOfWeek.value); x++) {
                    calNextDaysInMonth.value.push(x);
                }
            }
            else {
                for (let x = 1; x <= 7 - (calLastDayOfWeek.value); x++) {
                    calNextDaysInMonth.value.push(x);

                }

            }
        }
        const currentCalTaskOpen = ref(false)
        const currentCalTask = ref([])
        const currentCalTaskIncrem = ref(0)
        // const currentCalTaskColor = ref([])
        // const currentCalTaskWorker = ref([])
        // const currentCalTaskDate = ref([])

        const closeCalTask = () => {

            setTimeout(() => {
                currentCalTask.value = [];
                currentCalTaskOpen.value = false;
            }, 100)
        }

        const showCalTask = (day) => {
            currentCalTask.value = [];
            currentCalTaskIncrem.value = 0;
            // currentCalTaskName.value = [];
            // currentCalTaskColor.value = [];
            // currentCalTaskWorker.value = [];

            for (let i = 0; i < dataTasks.value.length; i++) {
                if (day === dataTasks.value[i].task_date) {
                    currentCalTaskOpen.value = true;
                    currentCalTask.value.push({
                        task_name: dataTasks.value[i].task_name,
                        task_color: dataTasks.value[i].task_color,
                        task_worker: dataTasks.value[i].task_worker,
                        task_date: dataTasks.value[i].task_date,
                    });
                    currentCalTaskIncrem.value++;
                }

                if (currentCalTaskIncrem.value === 0) {
                    currentCalTaskOpen.value = false;
                }
            }
        }



        let helpTabOpen = ref(false)
        let notesTabOpen = ref(false)
        let notesCreateForm = ref(false);
        const noteNote = ref("");

        const helpTabOpeningFunction = () => {
            helpTabOpen.value = true
        }

        const helpTabClosingFunction = () => {
            helpTabOpen.value = false
        }

        const notesTabOpeningFunction = () => {
            notesTabOpen.value = true
        }

        const notesTabClosingFunction = () => {
            notesTabOpen.value = false
        }

        const checkData = () => {
            const subs = supabase
                .from('*')
                .on('*', () => {
                    setTimeout(() => {
                        getData();
                    }, 100)
                })
                .subscribe()

            return () => supabase.removeSubscription(subs);
        };


        const dataNotes = ref([]);
        const dataTasks = ref([]);


        const getData = async () => {
            dataLoaded.value = false;
            try {
                const { data: notes_table, error_notes } = await supabase.from('notes_table').select('*').order('created_at', { ascending: false });
                const { data: tasks_table, error_task } = await supabase.from('tasks_table').select('*').order('task_date', { ascending: true });
                if (error_notes) throw error_task;
                dataNotes.value = notes_table;
                if (error_task) throw error_task;
                dataTasks.value = tasks_table;

            } catch (error) {
                console.warn(error.message);
            }
            getDataTasksForDays();
        };

        checkData();
        getData();

        const deleteNote = async (noteID) => {
            try {
                const { error } = await supabase.from('notes_table').delete().eq("id", noteID)
                if (error) throw error;
            } catch (error) {
                console.warn(error.message);
            }
        };


        const notesCreateOpen = () => {
            notesCreateForm.value = true;
        }
        const notesCreateClose = () => {
            notesCreateForm.value = false;
        }




        const pushNote = async () => {
            let noteDate = new Date();
            let noteTimeNow = (((noteDate.getHours() > 9) ? noteDate.getHours() : "0" + noteDate.getHours()) + ":" + ((noteDate.getMinutes() > 9) ? noteDate.getMinutes() : "0" + noteDate.getMinutes()) + ":" + ((noteDate.getSeconds() > 9) ? noteDate.getSeconds() : "0" + noteDate.getSeconds()));
            let noteDateNow = (((noteDate.getDate() > 9) ? noteDate.getDate() : "0" + noteDate.getDate()) + "." + ((noteDate.getMonth() > 8) ? (noteDate.getMonth() + 1) : "0" + (noteDate.getMonth() + 1)) + "." + noteDate.getFullYear());

            try {
                const { error } = await supabase.from('notes_table').insert([
                    {
                        note_note: noteNote.value,
                        note_worker: (user.value.email.includes("lu") === true) ? ("Ozi") : ("Mati"),
                        note_time: noteTimeNow,
                        note_date: noteDateNow,
                    },
                ]);
                if (error) throw error;
            }
            catch (error) {
                console.log(error)
            }
            notesCreateForm.value = false;
            noteNote.value = null;
        }

        const invoiceWindow = ref(false)

        const invoiceWindowHandler = () => {
            invoiceWindow.value = !invoiceWindow.value
        }



        return { invoiceWindowHandler, invoiceWindow, closeCalTask, currentCalTask, currentCalTaskOpen, showCalTask, dataLoaded, dataTasks, noteNote, pushNote, notesCreateClose, notesCreateForm, notesCreateOpen, deleteNote, dataNotes, helpTabOpen, notesTabOpen, helpTabOpeningFunction, helpTabClosingFunction, notesTabOpeningFunction, notesTabClosingFunction, reallyNowDay, yearWithMonth, logout, reallyNow, user, FirmNotification, PitNotification, dayOfDate, monthOfDate, MonthOfYear, calMonth, calDaysInMonth, calPrevDaysInMonth, calNextDaysInMonth, prevMonth, nextMonth, yearNow }
    },
    methods: {
        focusNote() {
            setTimeout(() => {
                this.$refs.notka.focus();
            }, 100)

        },
        showTime() {
            const timer = setInterval(() => {
                const now = new Date();
                const timeNow = ((now.getHours() > 9) ? now.getHours() : "0" + now.getHours()) + ":" + ((now.getMinutes() > 9) ? now.getMinutes() : "0" + now.getMinutes()) + ":" + ((now.getSeconds() > 9) ? now.getSeconds() : "0" + now.getSeconds());

                if (now < 1) {
                    clearInterval(timer);
                }

                this.time = timeNow;
            }, 1000)
        },
        showMonth() {
            const timer = setInterval(() => {
                const now = new Date();
                let monthNow = now.getMonth() + "";

                switch (monthNow) {
                    case "0":
                        monthNow = "STYCZEŃ";
                        break;
                    case "1":
                        monthNow = "LUTY";
                        break;
                    case "2":
                        monthNow = "MARZEC";
                        break;
                    case "3":
                        monthNow = "KWIECIEŃ";
                        break;
                    case "4":
                        monthNow = "MAJ";
                        break;
                    case "5":
                        monthNow = "CZERWIEC";
                        break;
                    case "6":
                        monthNow = "LIPIEC";
                        break;
                    case "7":
                        monthNow = "SIERPIEŃ";
                        break;
                    case "8":
                        monthNow = "WRZESIEŃ";
                        break;
                    case "9":
                        monthNow = "PAŹDZIERNIK";
                        break;
                    case "10":
                        monthNow = "LISTOPAD";
                        break;
                    case "11":
                        monthNow = "GRUDZIEŃ";
                        break;
                }




                if (now < 1) {
                    clearInterval(timer);
                }

                this.month = monthNow;
            }, 1000)
        },
        showdayOfWeek() {

            const timer = setInterval(() => {
                const now = new Date();
                let dayOfWeek = now.getUTCDay() + "";


                switch (dayOfWeek) {
                    case "1":
                        dayOfWeek = "PONIEDZIAŁEK";
                        break;
                    case "2":
                        dayOfWeek = "WTOREK";
                        break;
                    case "3":
                        dayOfWeek = "ŚRODA";
                        break;
                    case "4":
                        dayOfWeek = "CZWARTEK";
                        break;
                    case "5":
                        dayOfWeek = "PIĄTEK";
                        break;
                    case "6":
                        dayOfWeek = "SOBOTA";
                        break;
                    case "0":
                        dayOfWeek = "NIEDZIELA";
                        break;
                }

                if (now < 1) {
                    clearInterval(timer);
                }

                this.day = dayOfWeek;
            }, 1000)
        },
        showDate() {
            const dater = setInterval(() => {
                const now2 = new Date();

                const dateNow = (((now2.getDate() > 9) ? now2.getDate() : "0" + now2.getDate()) + "." + ((now2.getMonth() > 8) ? (now2.getMonth() + 1) : "0" + (now2.getMonth() + 1)) + "." + now2.getFullYear());

                if (now2 < 1) {
                    clearInterval(dater);
                }


                this.date = dateNow;
            }, 1000)
        }
    },
}
</script>