<template>
    <div
        oncontextmenu="return false"
        v-if="user"
        class="bg-gradient-to-b from-gray-700 via-gray-700 to-gray-800 w-1/6 shadow-2xl flex flex-row justify-center font-montserrat border-l"
    >
        <div class="flex w-full flex-col items-center justify-start flex-wrap">
            <div class="flex justify-around items-center flex-col p-1 mt-5 w-full bg-gray-100">
                <div class="flex justify-around items-center flex-col w-full">
                    <div class="flex justify-center items-center">
                        <div
                            class="flex justify-center items-center overflow-hidden cursor-default select-none m-1"
                        >
                            <div
                                class="flex justify-center items-center rounded-full overflow-hidden"
                            >
                                <img
                                    src="../assets/logo_wims_svg.svg"
                                    alt="WIMS"
                                    draggable="false"
                                    class="cursor-default select-none p-1 pr-4 pl-4 font-montserrat"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full flex-row justify-between items-center p-1 flex-wrap">
                        <p
                            class="text-gray-800 font-medium text-xs 2xl:text-sm text-center tracking-widest cursor-default select-none p-0.5"
                        >{{ day }}</p>
                        <p
                            class="text-gray-800 font-medium text-xs 2xl:text-sm text-center tracking-widest cursor-default select-none p-0.5"
                        >{{ time }}</p>
                        <p
                            class="text-gray-800 font-medium text-xs 2xl:text-sm text-center tracking-widest cursor-default select-none p-0.5"
                        >{{ date }}</p>
                    </div>
                </div>
                <div class="h-px w-11/12 bg-gray-300 m-1"></div>
                <div class="p-2 pr-4 pl-4 flex justify-end flex-col">
                    <div v-if="FirmNotification" class="flex justify-center items-center">
                        <p
                            class="text-gray-800 font-semibold text-xs 2xl:text-sm text-center tracking-widest cursor-default select-none"
                        >
                            Jest
                            <span class="font-normal border-b border-gray-500">{{ dayOfDate }}</span>
                            .
                            {{ FirmNotification }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="notesTabOpen === false" class="mb-5"></div>

            <!-- KALENDARZ -->

            <div
                v-if="(helpTabOpen === false) && (notesTabOpen === false)"
                class="flex flex-col justify-start items-center bg-gray-100 w-full 2xl:h-110 h-92 pt-3 pb-3"
            >
                <div class="flex w-full h-14 flex-row justify-around items-center">
                    <button
                        @click="prevMonth"
                        class="h-7 w-7 cursor-pointer hover:opacity-50 transition select-none text-lg font-medium flex-1"
                    >&lt;</button>
                    <p
                        class="text-base 2xl:text-lg font-medium mt-1 w-3/5 text-center tracking-wider cursor-default select-none"
                    >{{ calMonth }} {{ yearNow }}</p>
                    <button
                        @click="nextMonth"
                        class="h-7 w-7 cursor-pointer hover:opacity-50 transition select-none text-lg flex-1 font-medium"
                    >></button>
                </div>
                <div class="bg-gray-500 w-10/12 h-px m-2 opacity-70"></div>
                <div class="flex p-2 mt-2 pb-2 pt-5 w-full text-2xs font-semibold 2xl:text-xs">
                    <div class="w-1/7 flex justify-center items-center">PON</div>
                    <div class="w-1/7 flex justify-center items-center">WT</div>
                    <div class="w-1/7 flex justify-center items-center">ŚR</div>
                    <div class="w-1/7 flex justify-center items-center">CZW</div>
                    <div class="w-1/7 flex justify-center items-center">PT</div>
                    <div class="w-1/7 flex justify-center items-center">SOB</div>
                    <div class="text-red-700 w-1/7 flex justify-center items-center">NDZ</div>
                </div>
                <div class="flex flex-wrap p-2 w-full text-xs 2xl:text-sm">
                    <div
                        v-for="(day, index) in calPrevDaysInMonth"
                        :key="index"
                        class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center"
                    >
                        <span
                            class="flex justify-center items-center cursor-pointer transition rounded-md hover:bg-gray-300 w-11/12 h-5/6"
                        >{{ day }}</span>
                    </div>
                    <div
                        v-for="(day, index) in calDaysInMonth"
                        :key="index"
                        class="w-1/7 2xl:h-12 h-8 flex justify-center items-center"
                    >
                        <div
                            v-if="yearWithMonth === reallyNow && day === reallyNowDay"
                            class="flex justify-center items-center cursor-pointer transition border-2 border-webgencol rounded-md w-11/12 h-5/6 hover:text-gray-100 hover:bg-webgencol hover:border-0"
                        >{{ day }}</div>
                        <div
                            v-else
                            class="flex justify-center items-center cursor-pointer transition rounded-md hover:bg-gray-300 w-11/12 h-5/6"
                        >{{ day }}</div>
                    </div>
                    <div
                        v-for="(day, index) in calNextDaysInMonth"
                        :key="index"
                        class="opacity-50 font-light w-1/7 2xl:h-12 h-8 flex justify-center items-center"
                    >
                        <span
                            class="flex justify-center items-center cursor-pointer transition rounded-md hover:bg-gray-300 w-11/12 h-5/6"
                        >{{ day }}</span>
                    </div>
                </div>
            </div>
            <div
                v-if="(helpTabOpen === false) && (notesTabOpen === false)"
                class="transition flex flex-col justify-end items-end flex-grow w-full p-2 mt-3 cursor-default select-none"
            >
                <div class="flex flex-row justify-between items-center">
                    <p
                        @click="notesTabOpeningFunction"
                        class="border p-0.5 pr-3 pl-3 mb-2 mr-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-700 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none"
                    >notki ({{ dataNotes.length }})</p>
                    <p
                        @click="helpTabOpeningFunction"
                        class="border p-0.5 pr-3 pl-3 mb-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none"
                    >pomoc</p>
                </div>

                <p
                    class="text-gray-300 font-light text-2xs text-right tracking-wider pt-px pb-px"
                >Zalogowano jako:</p>
                <p
                    class="text-gray-300 font-light text-xs text-right tracking-wider"
                >{{ user.email }}</p>
                <p
                    @click="logout"
                    class="text-red-300 text-right font-light text-xs tracking-widest pb-2 pt-1 mb-2 transition cursor-pointer hover:text-opacity-70 select-none"
                >Wyloguj się</p>
                <p class="text-gray-300 font-light text-xs text-right tracking-wide">
                    <span class="font-medium tracking-widest">WIMS</span> 0.6.12
                </p>
                <p class="text-gray-300 font-normal text-xs text-right tracking-wide">
                    ♻ CO2-FREE
                    <span class="font-light tracking-widest text-2xs">for our planet</span>
                </p>
            </div>
            <div
                v-if="notesTabOpen === true"
                class="transition flex flex-col justify-end items-start flex-grow p-2 pr-1 mt-3 cursor-default select-none relative h-10 w-full overflow-hidden"
            >
                <div class="overflow-hidden w-full h-full overflow-y-scroll pr-10 box-content">
                    <div
                        class="text-gray-300 font-light text-xs text-center tracking-wide mb-1 w-full"
                    >
                        <div
                            v-for="(note, index) in dataNotes"
                            :key="index"
                            class="flex flex-col justify-evenly items-start flex-wrap m-0.5 mb-3 bg-gray-200 rounded-sm w-full"
                        >
                            <div class="flex flex-col w-full text-gray-800 font-semibold">
                                <div class="flex p-1 w-full flex-col pb-0">
                                    <p
                                        class="m-1 text-xs tracking-tight text-left"
                                    >{{ note.note_note }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full p-0 m-0">
                                    <div class="flex flex-row ml-1 text-xs">
                                        <p
                                            class="text-justify m-1 text-2xs tracking-normal"
                                        >{{ note.note_date }}</p>
                                        <p
                                            class="text-justify m-1 text-2xs tracking-normal"
                                        >{{ note.note_time }}</p>
                                        <p
                                            @click="deleteNote(note.id)"
                                            class="text-justify m-1 text-2xs text-red-700 hover:text-red-600 cursor-pointer tracking-wider"
                                        >usuń</p>
                                    </div>

                                    <p
                                        class="text-justify m-1 mr-2 text-xs tracking-normal"
                                    >{{ note.note_worker }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="notesCreateForm === true" class="w-full p-1 pt-3 pr-2">
                    <form @submit.prevent="pushNote" action class="flex flex-col p-1 w-full">
                        <textarea
                            ref="notka"
                            autocomplete="off"
                            maxlength="500"
                            minlength="5"
                            v-model="noteNote"
                            id="noteNote"
                            type="text"
                            placeholder="Nowa notka"
                            class="border focus:outline-none resize-none text-xs p-2"
                        />
                        <div class="flex flex-row justify-around items-center w-full">
                            <button
                                type="submit"
                                class="mt-2 flex-1 mr-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner"
                            >+</button>
                            <button
                                @click="notesCreateClose"
                                class="mt-2 h w-1/4 ml-1 bg-gray-600 text-white transition hover:bg-gray-500 font-medium text-base shadow-inner"
                            >-</button>
                        </div>
                    </form>
                </div>
                <div class="h-px w-full bg-gray-400 mt-2 mb-2"></div>
                <div class="flex flex-row">
                    <p
                        @click="notesCreateOpen(), focusNote()"
                        class="border p-0.5 pr-3 pl-3 mb-2 mr-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none"
                    >dodaj notke</p>
                    <p
                        @click="notesTabClosingFunction"
                        class="border p-0.5 pr-3 pl-3 mb-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none"
                    >zamknij notki</p>
                </div>

                <p class="text-gray-300 font-light text-xs text-right tracking-wide mt-2">
                    <span class="font-medium tracking-widest">WIMS</span> 0.6.12
                </p>
                <p class="text-gray-300 font-light text-2xs text-right tracking-widest">
                    <span class="font-medium tracking-wider">WEBGENETICSS</span> Interpolate Management System
                </p>
            </div>
            <div
                v-if="helpTabOpen === true"
                class="transition flex flex-col justify-end items-end flex-grow w-full p-2 mt-3 cursor-default select-none"
            >
                <div class="text-gray-300 font-light text-xs text-center tracking-wide mb-1">
                    <div class="flex flex-col justify-evenly items-start flex-wrap m-0.5 mb-2">
                        <div class="flex m-1">
                            <div class="p-1 bg-gray-400 rounded-full ml-1 mr-1 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-xs tracking-normal">
                                <span class="font-medium tracking-wider">ZADANIE</span> Tą etykiete posiadają zwykłe zadania, nie posiadające cech unikalnych.
                            </p>
                        </div>
                        <div class="flex m-1">
                            <div class="p-1 bg-red-600 rounded-full ml-1 mr-1 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-xs tracking-normal">
                                <span class="font-medium tracking-wider">STOP</span> Dodajemy tą etykiete do zadania, które posiada błąd, lub problem, którego nie możemy rozwiązać.
                            </p>
                        </div>
                        <div class="flex m-1">
                            <div class="p-1 bg-yellow-600 rounded-full ml-1 mr-1 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-xs tracking-normal">
                                <span class="font-medium tracking-wider">WERYFIKACJA</span> Dodajemy tą etykiete, kiedy prosimy o sprawdzenie błędów, czy zgody w decyzyjności wspólnej.
                            </p>
                        </div>
                        <div class="flex m-1">
                            <div class="p-1 bg-purple-500 rounded-full ml-1 mr-1 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-xs tracking-normal">
                                <span class="font-medium tracking-wider">AKTUALIZACJA</span> Dodajemy tą etykiete, gdy chcemy, by reszta grupy zapoznała się z tą zmianą.
                            </p>
                        </div>
                        <div class="flex m-1">
                            <div class="p-1 bg-blue-500 rounded-full ml-1 mr-1 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-xs tracking-normal">
                                <span class="font-medium tracking-wider">ROZPOCZĘTO</span> Tą etykietą oznaczamy zadania, które mają status aktywny.
                            </p>
                        </div>
                        <div class="flex m-1">
                            <div class="p-1 bg-green-500 rounded-full ml-1 mr-1 hover:opacity-70"></div>
                            <p class="text-justify ml-2 text-xs tracking-normal">
                                <span class="font-medium tracking-wider">ZROBIONE</span>
                                Tą etykiete dodajemy na koniec, by oznaczyć zadanie jako zrobione lub zrobione i sprawdzone.
                            </p>
                        </div>
                    </div>
                    <p class="p-1 pb-0 text-xs">
                        <span
                            class="border-gray-200 font-semibold p-1 text-2xs"
                        >shift + scroll myszką</span> lub
                        <span
                            class="border-gray-200 font-semibold p-1 text-2xs"
                        >drag nagłówka karty</span>
                        scrollowanie okna pracy
                    </p>
                </div>
                <div class="h-px w-full bg-gray-400 mt-2 mb-2"></div>
                <p
                    @click="helpTabClosingFunction"
                    class="border p-0.5 pr-3 pl-3 mb-2 rounded-sm text-gray-100 hover:text-gray-50 bg-gray-800 hover:bg-gray-700 text-right font-light text-2xs tracking-widest transition cursor-pointer select-none"
                >zamknij pomoc</p>
                <p class="text-gray-300 font-light text-xs tracking-wider">{{ user.email }}</p>
                <p
                    class="text-webgencol font-light text-xs text-right tracking-wider"
                >{{ user.aud }}</p>
                <p
                    class="text-gray-300 font-light text-xs text-right tracking-wider mt-1"
                >ostatnio zalogowany - {{ user.last_sign_in_at }}</p>
                <p class="text-gray-300 font-light text-xs text-right tracking-wide mt-2">
                    <span class="font-medium tracking-widest">WIMS</span> 0.6.12
                </p>
                <p class="text-gray-300 font-light text-2xs text-right tracking-widest">
                    <span class="font-medium tracking-wider">WEBGENETICSS</span> Interpolate Management System
                </p>
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
    },
    setup() {
        const FirmNotification = ref(null);
        const PitNotification = ref(null);
        const MonthOfYear = ref(null);

        let now = new Date();
        const reallyNow = ref(now.getUTCFullYear() + "" + now.getUTCMonth())
        const reallyNowDay = ref(now.getUTCDate())
        let dayOfDate = ref(now.getUTCDate());
        let monthOfDate = ref(now.getUTCMonth());
        let yearNow = ref(now.getUTCFullYear())

        if (monthOfDate.value < 2) {
            PitNotification.value = "Przypomnienie o PIT";
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
        } else {
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

        if (caldayOfWeek.value == 0) {
            caldayOfWeek.value = 7
        }



        for (let j = caldayOfWeek.value - 2; j > -1; j--) {
            calPrevDaysInMonth.value.push(prevLastDayofMonth.value - j);
        }



        for (let i = 1; i <= lastDayofMonth.value; i++) {
            calDaysInMonth.value.push(i);

        }


        let calNextDaysInMonth = ref([]);

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
        let yearWithMonth = ref(yearNow.value + "" + monthOfDate.value);

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
                calDaysInMonth.value.push(i);
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
                calDaysInMonth.value.push(i);
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

        const checkData = async () => {
            try {
                const subs = supabase
                    .from('notes_table')
                    .on('*', () => {
                        setTimeout(() => {
                            getData();
                        }, 500)

                    })
                    .subscribe()
                return () => supabase.removeSubscription(subs);
                // checkDayStatus()
            } catch (error) {
                console.warn(error.message);
            }
        };


        const dataNotes = ref([]);


        const getData = async () => {
            try {
                const { data: notes_table, error_task } = await supabase.from('notes_table').select('*').order('created_at', { ascending: false });
                if (error_task) throw error_task;
                dataNotes.value = notes_table;
            } catch (error) {
                console.warn(error.message);
            }

            // checkDayStatus()

        };

        getData();

        setInterval(() => {
            checkData()
        }, 2000)

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
                        note_worker: (user.value.email === "o.lucewicz@webgeneticss.pl" ? "Ozi" : "Mati"),
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

        // const checkDayStatus = () => {
        //     console.log("tera" + now.getMonth());
        //     console.log(dataTasks.value[0].task_date);

        //     for (let i = 0; i < dataTasks.value; i++) {
        //         if (dataTasks.value[0].task_date === `2022-03-30`) {

        //             console.log("razzzz");

        //         }
        //         console.log(dataTasks.value[i].task_date);

        //     }

        // }





        return { noteNote, pushNote, notesCreateClose, notesCreateForm, notesCreateOpen, deleteNote, dataNotes, helpTabOpen, notesTabOpen, helpTabOpeningFunction, helpTabClosingFunction, notesTabOpeningFunction, notesTabClosingFunction, reallyNowDay, yearWithMonth, logout, reallyNow, user, FirmNotification, PitNotification, dayOfDate, monthOfDate, MonthOfYear, calMonth, calDaysInMonth, calPrevDaysInMonth, calNextDaysInMonth, prevMonth, nextMonth, yearNow }
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
        showdayOfWeek() {

            const timer = setInterval(() => {
                const now = new Date();
                let dayOfWeek = now.getUTCDay() + "";

                if (dayOfWeek == "1") {
                    dayOfWeek = "PONIEDZIAŁEK";
                }
                if (dayOfWeek == "2") {
                    dayOfWeek = "WTOREK";
                }
                if (dayOfWeek == "3") {
                    dayOfWeek = "ŚRODA";
                }
                if (dayOfWeek == "4") {
                    dayOfWeek = "CZWARTEK";
                }
                if (dayOfWeek == "5") {
                    dayOfWeek = "PIĄTEK";
                }
                if (dayOfWeek == "6") {
                    dayOfWeek = "SOBOTA";
                }
                if (dayOfWeek == "0") {
                    dayOfWeek = "NIEDZIELA";
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