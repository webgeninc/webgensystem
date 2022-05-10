<template>
    <div v-if="user" v-dragscroll:nochilddrag
        class="bg-gray-100 w-5/6 p-2 pb-0 flex flex-nowrap overflow-x-auto font-montserrat">
        <!-- Tabela -->
        <div v-for="(tab, index) in dataTabs" :key="index" class="flex flex-shrink-0 w-80 flex-col m-1">
            <div v-if="tabNameChanger != tab.id" data-dragscroll class="flex flex-row justify-end text-xs cursor-grab">
                <p @click="changeTabName(tab.id), focusTab()"
                    class="ml-2 mr-2 text-2xs tracking-wider font-semibold text-gray-600 text-opacity-50 hover:text-opacity-100 transition cursor-pointer">
                    edytuj tytuł karty</p>
                <p @click="deleteTab(tab.id)"
                    class="ml-2 mr-2 text-2xs tracking-tighter font-semibold text-red-600 text-opacity-50 hover:text-opacity-100 transition cursor-pointer">
                    usuń kartę</p>
            </div>
            <div v-if="tabNameChanger == tab.id" data-dragscroll
                class="flex flex-row justify-between w-full text-xs mr-1 ml-1 cursor-grab">
                <input ref="tabka" autocomplete="off" maxlength="45" required v-model="tabName" type="text"
                    :placeholder="tabName"
                    class="p-1.5 flex-1 m-1 border-gray-300 border focus:outline-none resize-none rounded-sm" />
                <button @click="pushTabName(tab.id)"
                    class="bg-gray-400 text-white text-2xs rounded-full font-medium transition hover:bg-gray-500 p-1 pr-3 pl-3 ml-1">OK</button>
            </div>
            <div v-if="okeyHandler == tab.id" class="flex flex-row justify-center w-full text-2xs m-1">
                <p class="tracking-widest text-sm text-green-500 font-semibold">ZROBIONE :)</p>
            </div>
            <div data-dragscroll
                class="p-1 pt-1 text-center flex flex-row justify-center items-center cursor-grab h-16">
                <h3 data-dragscroll
                    class="font-semibold text-left text-base text-gray-700 tracking-wide p-2 pt-0 pb-0 flex-1">{{
                            tab.tab_name
                    }}</h3>
                <button @click="addCreateTask(tab.id)"
                    class="bg-gray-400 text-white text-lg rounded-full font-medium transition hover:bg-gray-500 pr-4 pl-4 m-0.5">+</button>
            </div>
            <div v-if="createTask === tab.id" class="w-full bg-gray-200 mt-2 p-2">
                <form v-for="(item, index) in tasks" :key="index"
                    @submit.prevent="pushTask(item.task_name, item.task_worker, item.task_desc, item.task_date, item.task_color, tab.id)"
                    class="flex flex-col justify-center text-xs items-center">
                    <div class="w-full flex justify-between items-center pl-1 m-1">

                        <h4 class="text-xs m-0.5 pl-1 pr-3 font-semibold uppercase">Nowe zadanie</h4>
                        <button @click="removeCreateTask"
                            class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Zamknij
                            okno</button>
                    </div>
                    <div class="flex w-full flex-col justify-center items-center p-1">
                        <div class="flex w-full justify-between items-center m-1 h-6">
                            <input v-model="item.task_name" autocomplete="off" maxlength="50" minlength="5" required
                                id="taskName" type="text" placeholder="Nazwa zadania"
                                class="p-1 w-3/5 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none resize-none" />
                            <select required v-model="item.task_worker"
                                class="p-1 w-2/6 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none">
                                <option value="Ozi">Ozito</option>
                                <option value="Mati">Matito</option>
                                <option value="Wszyscy">Wszyscy</option>
                            </select>
                        </div>
                        <textarea v-model="item.task_desc" autocomplete="off" maxlength="500" id="taskDesc" type="text"
                            placeholder="Opis"
                            class="w-full h-16 m-1 p-1 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none resize-none" />
                        <div class="flex flex-row w-full justify-between items-center mt-1 mb-1 text-xs">
                            <input v-model="item.task_date" type="date"
                                class="w-1/2 h-6 p-1 focus:border-gray-400 border-gray-200 border focus:outline-none" />
                            <select required v-model="item.task_color"
                                class="p-1 w-2/5 h-6 focus:border-gray-400 border-gray-200 border focus:outline-none">
                                <option value="1">Zadanie</option>
                                <option value="2">Stop</option>
                                <option value="3">Weryfikacja</option>
                                <option value="4">Aktualizacja</option>
                                <option value="5">Rozpoczęto</option>
                                <option value="6">Zrobione</option>
                            </select>
                        </div>
                        <div class="flex flex-row w-full justify-around items-center mt-2 text-2xs">
                            <input v-on:change="imageHandler" ref="imageUpload" id="imageUpload" type="file"
                                accept="image/*" class="w-full text-2xs p-0 m-1 flex justify-start items-center" />
                            <button type="submit"
                                class="bg-gray-400 text-gray-50 rounded-2xl font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Dodaj</button>
                        </div>
                    </div>
                </form>
            </div>
            <div v-if="dataLoaded" class="flex-nowrap overflow-y-auto">
                <div v-for="(task, index) in dataTasks" :key="index" class>
                    <div v-if="(editTask != task.id) && (tab.id === task.task_tabid)" @mouseleave="hoverTaskLeave"
                        class="overflow-hidden flex bg-gray-50 shadow-md mb-1 mt-1 pt-1">
                        <div v-if="(task.task_color === 3)" class="bg-yellow-600 w-1.5"></div>
                        <div v-else-if="(task.task_color === 5)" class="bg-blue-600 w-1.5"></div>
                        <div v-else-if="(task.task_color === 2)" class="bg-red-600 w-1.5"></div>
                        <div v-else-if="(task.task_color === 1)" class="bg-gray-400 w-1.5"></div>
                        <div v-else-if="(task.task_color === 6)" class="bg-green-600 w-1.5"></div>
                        <div v-else-if="(task.task_color === 4)" class="bg-purple-600 w-1.5"></div>
                        <div class="m-0.5 ml-1.5 flex flex-col flex-1">
                            <div v-if="editTask != task.id" class="flex flex-row w-full items-baseline overflow-hidden">
                                <div v-if="hoverTask === task.id"
                                    class="pt-0.5 flex flex-row w-full justify-end items-center flex-shrink-0 transition duration-200">
                                    <p @click="ChangeEditTask(task.id)"
                                        class="text-2xs ml-2 mr-2 font-semibold tracking-wider text-gray-600 text-opacity-50 hover:text-opacity-100 cursor-pointer">
                                        EDYTUJ</p>
                                    <p @click="deleteTask(task.id)"
                                        class="text-2xs ml-2 mr-2 font-semibold tracking-wider text-red-600 text-opacity-50 hover:text-opacity-100 cursor-pointer">
                                        USUŃ</p>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <p class="text-sm m-1 font-semibold flex flex-wrap overflow-x-hidden">{{ task.task_name
                                }}
                                </p>
                                <button
                                    v-if="task.task_image !== '' && task.task_image !== null && imageStatus !== task.id"
                                    @click="openImage(task.id)"
                                    class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Zobacz
                                    obraz
                                </button>
                                <button v-if="imageStatus === task.id" @click="closeImage()"
                                    class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Zamknij
                                </button>
                            </div>
                            <div v-if="task.task_image !== '' && task.task_image !== null">
                                <img v-if="imageStatus === task.id" @click="socialPostOpener(task.id)"
                                    ref="imagerPreview"
                                    class="w-full mt-0.5 mb-1.5 cursor-pointer hover:opacity-80 hover:bg-gray-400">
                            </div>
                            <div v-if="(task.task_desc.length > 140) & (seeMore != task.id)" class="w-full">
                                <p class="text-sm m-1 font-normal overflow-hidden h-16">{{ task.task_desc }}</p>
                                <p @click="seeMoreHandler(task.id)"
                                    class="p-1 text-2xs text-gray-400 hover:text-gray-700 cursor-pointer m-0">zobacz
                                    wiecej</p>
                            </div>
                            <div v-if="(task.task_desc.length > 140) & (seeMore == task.id)" class="w-full">
                                <p class="text-sm m-1 font-normal overflow-hidden">{{ task.task_desc }}</p>
                                <p @click="seeMoreHandler(task.id)"
                                    class="p-1 text-2xs text-gray-400 hover:text-gray-700 cursor-pointer m-0">zobacz
                                    mniej</p>
                            </div>
                            <p v-if="task.task_desc.length <= 140" class="text-sm m-1 font-normal">{{ task.task_desc }}
                            </p>
                            <div class="mt-1 flex flex-row justify-between">
                                <div v-if="task.task_date !== ''" class="flex flex-row">
                                    <p class="text-xs m-1 font-semibold">{{ viewDate(task.task_date) }}</p>
                                    <p v-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) < 0"
                                        class="text-xs m-1 font-normal text-red-600">
                                        (minęło
                                        <span class="font-semibold tracking-wider">{{ Math.ceil(Math.abs(new
                                                Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 /
                                                24) - 1
                                        }}</span> dni temu)
                                    </p>
                                    <p v-else-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) == 0"
                                        class="text-xs m-1 font-medium tracking-wider text-yellow-600">(do dzisiaj)</p>
                                    <p v-else-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) <= 7"
                                        class="text-xs m-1 font-medium tracking-wider text-yellow-500">
                                        (tylko
                                        <span class="font-semibold tracking-wider">{{ Math.ceil((new
                                                Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 /
                                                24)
                                        }}</span> dni)
                                    </p>
                                    <p v-else-if="Math.ceil((new Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 / 24) > 7"
                                        class="text-xs m-1 font-normal text-gray-600">
                                        (zostało
                                        <span class="font-semibold tracking-wider">{{ Math.ceil((new
                                                Date(task.task_date.replace(/\./g, '/')) - new Date()) / 1000 / 60 / 60 /
                                                24)
                                        }}</span> dni)
                                    </p>
                                </div>
                                <div v-if="task.task_date === ''" class="flex flex-row">
                                    <p class="text-xs m-1 font-semibold">Bez daty</p>
                                </div>
                                <p @click="hoverTaskEnter(task.id)"
                                    class="text-xs m-1 font-bold hover:text-gray-400 transition cursor-pointer">{{
                                            task.task_worker
                                    }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="(editTask == task.id) && (tab.id === task.task_tabid)"
                        class="flex justify-center items-center bg-gray-200 p-px pt-1 pb-1 w-full">
                        <form v-for="(item, index) in editedTask" :key="index" @submit.prevent="pushEditTask(task.id)"
                            class="flex flex-col justify-center text-xs items-center">
                            <div class="w-full flex justify-between items-center pl-1 m-1">

                                <h4 class="text-xs m-0.5 pl-1 pr-3 font-semibold uppercase">Edycja zadanie</h4>
                                <button @click="removeEditTask"
                                    class="bg-gray-400 text-gray-50 rounded-2xl text-2xs font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Zamknij
                                    okno</button>
                            </div>
                            <div class="flex w-full flex-col justify-center items-center p-1">
                                <div class="flex w-full justify-between items-center m-1 h-6">
                                    <input v-model="item.task_name" autocomplete="off" maxlength="50" minlength="5"
                                        required type="text" :placeholder="item.task_name"
                                        class="p-1 w-3/5 text-xs border-gray-200 border focus:border-gray-400 focus:outline-none resize-none" />

                                    <select required v-model="item.task_worker"
                                        class="p-1 w-2/6 text-xs focus:border-gray-400 border-gray-200 border focus:outline-none">
                                        <option value="Ozi">Ozito</option>
                                        <option value="Mati">Matito</option>
                                        <option value="Wszyscy">Wszyscy</option>
                                    </select>
                                </div>
                                <textarea v-model="item.task_desc" autocomplete="off" maxlength="500" id="taskDesc"
                                    type="text" placeholder="Opis"
                                    class="w-full h-16 m-1 p-1 text-xs border-gray-200 border focus:border-gray-400 focus:outline-none resize-none" />
                                <div class="flex flex-row w-full justify-between items-center mt-1 mb-1 text-xs">
                                    <input v-model="item.task_date" type="date"
                                        class="w-1/2 h-6 p-1 focus:border-gray-400 border-gray-200 border focus:outline-none" />
                                    <select required v-model="item.task_color"
                                        class="p-1 w-2/5 h-6 focus:border-gray-400 border-gray-200 border focus:outline-none">
                                        <option value="1">Zadanie</option>
                                        <option value="2">Stop</option>
                                        <option value="3">Weryfikacja</option>
                                        <option value="4">Aktualizacja</option>
                                        <option value="5">Rozpoczęto</option>
                                        <option value="6">Zrobione</option>
                                    </select>
                                </div>

                                <div class="flex flex-row w-full justify-around items-center mt-2 text-2xs">
                                    <input v-on:change="imageHandler" ref="imageUpload" id="imageUpload" type="file"
                                        accept="image/*"
                                        class="w-full text-2xs p-0 m-1 flex justify-start items-center" />
                                    <button type="submit"
                                        class="bg-gray-400 text-gray-50 rounded-2xl font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Dodaj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="socialPost !== null"
            class="absolute top-0 bottom-0 left-0 right-1/6 bg-white bg-opacity-80 pointer-events-auto"></div>
        <div v-if="socialPost !== null"
            class="bg-fbbackground absolute top-30 left-30 right-110 bottom-30 rounded-xl shadow-2xl border border-gray-300 flex justify-start items-center overflow-hidden">
            <div class="w-1/7 3xl:w-2/7 flex-shrink-0 h-full">
                <p class="text-2xs 2xl:text-xs 3xl:text-sm font-medium p-5 tracking-wider">Social Media 0.13.00</p>
            </div>
            <div class="flex justify-start items-center w-3/4 3xl:w-2/3 h-full">
                <div class="flex flex-col justify-start items-start w-1/2 3xl:w-2/5 h-full p-2">
                    <div class="w-full bg-white border border-black border-opacity-20 rounded-xl p-3 mt-1 shadow-md">
                        <div class="flex justify-between items-start">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-semibold flex-1">Utwórz reklamę</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs text-webgencol">Wyświetl wszystko</p>
                        </div>
                        <div class="mt-0.5">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm text-gray-500">Jak chcesz rozwijać swoją firmę?
                            </p>
                        </div>
                        <div class="mt-5">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-medium">Utwórz nową reklamę</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs">Utwórz reklamę za pomocą tekstu, zdjęć i filmów,
                                aby wypromować swoją
                                firmę
                            </p>
                        </div>
                        <div class="w-full h-px bg-gray-300 mt-3 mb-3"></div>
                        <div class="mt-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm">Promuj post</p>
                        </div>
                        <div class="w-full h-px bg-gray-300 mt-3 mb-3"></div>
                        <div class="mt-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm">Promuj post na Instagramie</p>
                        </div>
                        <div class="w-full h-px bg-gray-300 mt-3 mb-3"></div>
                        <div class="mt-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm">Zautomatyzowane reklamy</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs text-gray-500">Wybierz inny cel biznesowy
                                zautomatyzowanych reklam
                            </p>
                        </div>
                    </div>
                    <div class=" w-full bg-white border border-black border-opacity-20 rounded-xl p-3 mt-5 shadow-md">
                        <div class="flex justify-between items-center">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">Statystyki</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs text-webgencol">Wyświetl wszystko</p>
                        </div>
                        <div class="mt-0.5">
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs text-gray-500">Ostatnie 28 dni : 11 kwi – 8 maj
                            </p>
                        </div>
                        <div class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs">Liczba odbiorców</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">1,503
                            </p>
                        </div>
                        <div class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs">Aktywność dotycząca postów</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">96
                            </p>
                        </div>
                        <div class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs">Polubienia strony</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">1
                            </p>
                        </div>
                        <div class="mt-4 flex flex-row justify-between items-center bg-gray-200 rounded-lg p-3">
                            <p class="text-2xs 2xl:text-xs 3xl:text-xs">Kliknięcia oznaczonych produktów</p>
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold">0
                            </p>
                        </div>
                    </div>
                    <div
                        class="h-16 w-full bg-white border-t border-l border-r border-black border-opacity-20 rounded-t-xl p-3 mt-5 shadow-md">
                        <div class="flex justify-between items-center bg-white">
                            <p class="text-2xs 2xl:text-xs 3xl:text-sm font-bold bg-white">Informacje</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-start items-start w-3/4 3xl:w-3/5 h-full p-2 mt-6">
                    <div class="w-full bg-white border border-black border-opacity-20 rounded-xl mt-2 shadow-md">
                        <div class="p-2 pb-3 2xl:p-3 3xl:p-4 3xl:pb-4 w-full">
                            <div class="flex flex-row justify-between items-center w-full">
                                <div class="w-1/12 rounded-full p-5 2xl:p-6 3xl:p-6 bg-black bg-opacity-80 mr-3"></div>
                                <div class="w-full h-full flex flex-col items-start justify-center pb-1">
                                    <p class="text-xs 2xl:text-sm 3xl:text-base tracking-tight font-sans font-medium">
                                        Strona Firmy
                                    </p>
                                    <p
                                        class="text-2xs 2xl:text-2xs 3xl:text-xs text-gray-400 tracking-tight font-sans font-normal">
                                        Opublikowane
                                        przez: Użytkownik Strony
                                        {{ socialPost.date }} o 12:00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="pl-3 pr-3 3xl:pl-4 3xl:pr-4 w-full">
                            <div class="mb-2">
                                <p
                                    class="text-xs 2xl:text-sm 3xl:text-base tracking-tight font-sans font-normal leading-tight">
                                    {{
                                            socialPost.desc
                                    }}</p>
                            </div>
                        </div>
                        <div>
                            <img ref="imagerSocialPreview"
                                class="w-full mt-1 mb-2 border-t border-b border-black border-opacity-20">
                        </div>
                        <div class="flex flex-row justify-between items-center pl-2 pr-2 3xl:pr-4 3xl:pl-4 mt-4 mb-4">
                            <div class="flex flex-col justify-center items-start">
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-sm font-medium tracking-tighter 3xl:tracking-normal">
                                    523</p>
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-xs font-normal tracking-tighter 3xl:tracking-normal">
                                    Liczba odbiorców</p>
                            </div>
                            <div class="flex flex-col justify-center items-start">
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-sm font-medium tracking-tighter 3xl:tracking-normal">
                                    23</p>
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-xs font-normal tracking-tighter 3xl:tracking-normal">
                                    Aktywność</p>
                            </div>
                            <div class="flex flex-col justify-center items-start">
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-sm font-medium tracking-tighter 3xl:tracking-normal">
                                    Średni +1,0x</p>
                                <p
                                    class="text-2xs 2xl:text-xs 3xl:text-xs font-normal tracking-tighter 3xl:tracking-normal">
                                    Wynik dystrybucji</p>
                            </div>
                            <div class="flex flex-col justify-center items-center">
                                <div class="bg-webgencol rounded-md p-1 pr-1.5 pl-1.5 3xl:p-2 3xl:pr-2.5 3xl:pl-2.5">
                                    <p class="text-white text-2xs 2xl:text-xs 3xl:text-sm font-medium">Promuj post</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-px bg-gray-300 mt-3 mb-8"></div>
                        <div class="w-full h-full flex justify-center items-center m-3 mb-10">
                            <p class="text-sm 2xl:text-base 3xl:text-lg font-normal">Wczytywanie
                                zdjęcia...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-grow flex-shrink h-full">
                <div class="flex justify-end items-start p-5">
                    <button @click="socialPostCloser()"
                        class="bg-gray-400 text-gray-50 text-2xs 2xl:text-xs 3xl:text-sm rounded-2xl font-medium transition hover:bg-gray-500 p-0.5 pr-3 pl-3 mr-0.5 ml-0.5">Zamknij</button>
                </div>
            </div>
        </div>
        <div class="h-10 text-xs m-2">
            <div v-if="createTab == null" class="flex h-full justify-center items-center p-2">
                <button @click="addCreateTab"
                    class="h-8 w-12 p-1 rounded-full bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner">+</button>
            </div>
            <div v-if="createTab" class="p-1">
                <form @submit.prevent="pushTab" action class="flex flex-col p-1">
                    <input autocomplete="off" maxlength="50" required v-model="tabName" id="tabName" type="text"
                        placeholder="Nazwa nowej tabeli"
                        class="p-2 pr-3 pl-3 border-gray-300 border focus:outline-none resize-none rounded-full" />
                    <div class="flex flex-row justify-around items-center w-full">
                        <button type="submit"
                            class="rounded-full mt-1 flex-1 mr-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner">+</button>
                        <button @click="removeCreateTab"
                            class="rounded-full mt-1 h w-1/4 ml-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner">-</button>
                    </div>
                </form>
            </div>
            <div v-if="statusMsg" class="flex flex-row justify-evenly text-xs flex-wrap">
                <div class="text-red-500 font-medium transition flex-1 pt-2 pb-2 m-1">Status: {{ statusMsg }}</div>
            </div>
            <div v-if="errorMsg" class="flex flex-row justify-evenly text-xs flex-wrap">
                <div class="text-red-500 font-medium transition flex-1 pt-2 pb-2 m-1">Error: {{ errorMsg }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from "vue"
import "../supabase/init.js"
import store from "../store/index.js"
import { ref } from "@vue/reactivity"
// import { uid } from "uid"
import { supabase } from "../supabase/init"
import { dragscrollNext } from 'vue-dragscroll'

export default {
    name: 'Workspace',
    directives: {
        'dragscroll': dragscrollNext
    },
    methods: {
        focusTab() {
            setTimeout(() => {
                this.$refs.tabka.focus();
            }, 100)
        },
        async socialPostOpener(id) {
            for (let i = 0; i < this.dataTasks.length; i++) {
                if (this.dataTasks[i].id === id) {
                    this.socialPost = {
                        desc: this.dataTasks[i].task_desc,
                        date: this.dataTasks[i].task_date,
                    }
                }
            }
            setTimeout(() => {
                this.$refs.imagerSocialPreview.src = this.dataImage;
            }, 500);

        },
        imageHandler(item) {
            if (item.target.files[0] !== null) {
                this.fileDataTask = item.target.files[0]
            }

        },
        socialPostCloser() {
            this.socialPost = null
            this.$refs.imagerSocialPreview.src = null
            this.closeImage()
        },
        closeImage() {
            this.imageStatus = null;
            this.$refs.imagerPreview.src = null;
            this.dataImage = null
        },
        openImage(id) {
            this.imageStatus = id;
            this.getImageData(id)
        },
        previewImage() {
            this.$refs.imagerPreview.src = this.dataImage
        },
        async getImageData(id) {
            let imageName = null;
            for (let i = 0; i < this.dataTasks.length; i++) {
                if (this.dataTasks[i].id === id) {
                    imageName = this.dataTasks[i].task_image;
                }
            }
            try {
                const { data: data_images, error_images } = await supabase.storage
                    .from('images')
                    .download(imageName)
                if (error_images) throw error_images;
                this.dataImage = URL.createObjectURL(new Blob([data_images], { type: "image/jpeg" }));
                this.previewImage();
            }
            catch (error) {
                console.warn(error.message);
            }
        }
    },
    setup() {
        const user = computed(() => store.state.user)
        const todaysDate = ref(new Date());
        todaysDate.value = todaysDate.value.getUTCDate() + "." + (todaysDate.value.getUTCMonth() + 1) + "." + todaysDate.value.getUTCFullYear();
        const dataTabs = ref([]);
        const dataTasks = ref([]);
        const dataImage = ref([]);
        const dataLoaded = ref(null);
        const hoverTask = ref(true);

        const hoverTaskEnter = (id) => {
            hoverTask.value = id;
        }

        const hoverTaskLeave = () => {
            hoverTask.value = null;
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

        const getData = async () => {
            try {
                const { data: tasks_table, error_task } = await supabase.from('tasks_table').select('*').order('task_date', { ascending: true });
                const { data: tabs_table, error_tabs } = await supabase.from('tabs_table').select('*').order('created_at', { ascending: true });
                if (error_tabs) throw error_tabs;
                dataTabs.value = tabs_table;
                if (error_task) throw error_task;
                dataTasks.value = tasks_table;
                dataLoaded.value = true;
            } catch (error) {
                console.warn(error.message);
            }

        };


        checkData();
        getData();


        // createData
        const seeMore = ref(null);
        const okeyHandler = ref(false);
        const imageStatus = ref(null);
        const tabName = ref("");
        const tabNameChanger = ref(null);
        const createTask = ref(null);
        const createTab = ref(null);
        const editTask = ref(null);
        const editedTask = ref([])
        const tasks = ref([]);
        const statusMsg = ref(null);
        const errorMsg = ref(null);
        const socialPost = ref(null);
        const fileDataTask = ref(null)

        const seeMoreHandler = (taskID) => {
            if (seeMore.value != taskID) {
                seeMore.value = taskID;
            }
            else if (seeMore.value == taskID) {
                seeMore.value = null;
            }
        }

        const removeCreateTab = () => {
            createTab.value = null;
        }


        const removeCreateTask = () => {
            createTask.value = 0
        }


        const deleteTab = async (tabID) => {
            let answer = window.confirm("Na pewno? Danych nie będzie można odzyskać.");
            if (answer) {
                try {
                    const { error } = await supabase.from('tabs_table').delete().eq("id", tabID)
                    if (error) throw error;
                    const { error2 } = await supabase.from('tasks_table').delete().eq("task_tabid", tabID)
                    if (error2) throw error2;
                } catch (error) {
                    console.warn(error.message);
                }

            }
            else return
        };

        const deleteTask = async (taskID) => {

            let imageToRemove = null;

            for (let indx = 0; indx < dataTasks.value.length; indx++) {
                if (dataTasks.value[indx].id === taskID) {
                    imageToRemove = dataTasks.value[indx].task_image;
                }
            }
            if (imageToRemove !== null) {
                try {
                    const { errorr } = await supabase.storage
                        .from('images').remove([imageToRemove])
                    if (errorr) throw errorr;
                }

                catch (errorr) {
                    console.log(errorr.message)
                }
            }


            try {
                const { error } = await supabase.from('tasks_table').delete().eq("id", taskID)
                if (error) throw error;
            } catch (error) {
                console.warn(error.message);
            }

        };

        const addCreateTask = (tabID) => {
            seeMore.value = null;
            if (createTask.value === tabID) {
                createTask.value = null;
            }
            else {
                createTask.value = tabID;
                tasks.value = [];
                addTask()
            }
        }


        const addTask = () => {
            createTab.value = null;
            if (createTask.value !== null) {
                tasks.value.push({
                    id: null,
                    task_name: "",
                    task_desc: "",
                    task_date: "",
                    task_worker: "",
                    task_image: null,
                    task_color: null,
                }
                );

            }
        }

        const addCreateTab = () => {
            seeMore.value = null;
            editTask.value = null;
            createTask.value = null;
            createTab.value = true;
            tasks.value = [];
        }

        const removeEditTask = () => {
            editTask.value = null;
            editedTask.value = [];
        }

        const ChangeEditTask = (taskID) => {
            seeMore.value = null;
            createTab.value = null;
            createTask.value = null;
            hoverTask.value = null;
            editedTask.value = [];
            if (editTask.value === taskID) {
                editTask.value = null;
            }
            else {
                editTask.value = taskID;
                tasks.value = [];
                addEditTask(taskID)
            }
        }

        const addEditTask = (taskID) => {
            for (let index = 0; index < dataTasks.value.length; index++) {
                if (dataTasks.value[index].id === taskID) {
                    editedTask.value.push(dataTasks.value[index]);
                    fileDataTask.value = dataTasks.value[index].task_image === null ? null : dataTasks.value[index].task_image
                }
            }
        }


        const pushEditTask = async (taskID) => {
            try {
                const { error } = await supabase.from('tasks_table').update({
                    "task_worker": editedTask.value[0].task_worker,
                    "task_color": editedTask.value[0].task_color,
                    "task_name": editedTask.value[0].task_name,
                    "task_desc": editedTask.value[0].task_desc,
                    "task_image": fileDataTask.value === null ? null : fileDataTask.value.name,
                    "task_date": editedTask.value[0].task_date,
                }).eq("id", taskID)
                seeMore.value = null;
                createTab.value = null;
                createTask.value = null;
                hoverTask.value = null;
                editTask.value = null;
                okeyHandler.value = taskID;
                setTimeout(() => {
                    okeyHandler.value = false;
                }, 1000)
                if (error) throw error;
            }
            catch (error) {
                console.log(error.message)
            }
            if (fileDataTask.value !== null) {
                try {
                    const { errorr } = await supabase.storage
                        .from('images')
                        .upload(fileDataTask.value.name, fileDataTask.value)

                    if (errorr) throw errorr;
                }

                catch (errorr) {
                    console.log(errorr.message)
                }
                fileDataTask.value = null
            }
        }

        const changeTabName = (tabID) => {
            for (let index = 0; index < dataTabs.value.length; index++) {
                if (dataTabs.value[index].id === tabID) {
                    tabName.value = dataTabs.value[index].tab_name
                }
            }
            tabNameChanger.value = tabID;
        }


        const pushTabName = async (tabID) => {
            try {
                const { error } = await supabase.from('tabs_table').update({ tab_name: tabName.value }).eq("id", tabID)
                tabNameChanger.value = null;
                okeyHandler.value = tabID;
                tabName.value = ("");
                setTimeout(() => {
                    okeyHandler.value = false;
                }, 500)
                if (error) throw error;
            }
            catch (error) {
                console.log(error.message)
            }
        }

        const viewDate = (date) => {
            if (date !== null) {
                let dy = date.charAt(8) + date.charAt(9);
                let mon = date.charAt(5) + date.charAt(6);
                let yrr = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
                return (dy + "." + mon + "." + yrr);
            }
            else return "Bez daty"
        }

        const pushTask = async (taskk, workerr, descc, datee, colorr, tabID) => {
            createTask.value = null;
            console.log(fileDataTask.value)
            try {
                const { error } = await supabase
                    .from('tasks_table')
                    .insert([
                        {
                            "task_worker": workerr,
                            "task_color": colorr,
                            "task_name": taskk,
                            "task_desc": descc,
                            "task_date": datee,
                            "task_image": fileDataTask.value === null ? null : fileDataTask.value.name,
                            "task_tabid": tabID,
                        },
                    ])
                if (error) throw error;
            }
            catch (error) {
                console.log(error.message)
            }
            if (fileDataTask.value !== null) {
                try {
                    const { errorr } = await supabase.storage
                        .from('images')
                        .upload(fileDataTask.value.name, fileDataTask.value)

                    if (errorr) throw errorr;
                }

                catch (errorr) {
                    console.log(errorr.message)
                }
                fileDataTask.value = null
            }



            setTimeout(() => {
                okeyHandler.value = false;
            }, 1000)
        }
        const pushTab = async () => {
            editTask.value = null;
            createTask.value = null;
            tasks.value = [];
            try {
                const { error } = await supabase.from('tabs_table').insert([
                    {
                        tab_name: tabName.value
                    },
                ]);
                if (error) throw error;
                statusMsg.value = 'Sukces: Zadanie stworzone';

                createTab.value = null;
                tabName.value = null;
                setTimeout(() => {
                    statusMsg.value = null;
                }, 1000)
            }
            catch (error) {
                errorMsg.value = `Erorr: ${error.message}`;
                setTimeout(() => {
                    errorMsg.value = null;
                }, 2000)
            }
        }
        return { fileDataTask, socialPost, imageStatus, dataImage, viewDate, seeMore, seeMoreHandler, removeEditTask, editedTask, pushEditTask, editTask, ChangeEditTask, okeyHandler, pushTabName, tabNameChanger, changeTabName, deleteTab, user, hoverTask, hoverTaskEnter, hoverTaskLeave, tabName, tasks, statusMsg, errorMsg, createTask, addCreateTask, addCreateTab, removeCreateTab, removeCreateTask, addTask, deleteTask, pushTask, pushTab, createTab, dataLoaded, dataTabs, dataTasks }
    },
}
</script>