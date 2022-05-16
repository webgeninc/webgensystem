<template>
  <div class="flex w-screen h-screen bg-white flex-grow p-32 font-montserrat overflow-hidden">
    <div class="flex flex-col flex-grow h-full items-center justify-center">
      <div class="bg-white w-1/2 2xl:w-1/2 3xl:w-2/5 rounded-3xl shadow-lg flex flex-col border border-gray-100 ">
        <div class="bg-gradient-to-tl from-gray-50 via-gray-100 to-gray-100 mb-7 rounded-t-3xl h-40 ">
        <div class="flex flex-row justify-between h-full">
          <img src="../assets/systems.svg" alt class="h-full w-3/5 3xl:w-2/3 object-cover overflow-hidden" />
          <div class="self-center h-full w-1/3 flex-shrink-0 p-2.5 2xl:p-3 3xl:p-3  flex flex-col justify-center items-end overflow-hidden">
            <h2 class="text-right font-medium tracking-wider leading-5 text-xs 2xl:text-sm 3xl:text-base">
              <span class="tracking-wider font-semibold text-sm 2xl:text-base 3xl:text-lg">WEBGENETICSS</span> Interpolate
            </h2>
            <h2 class="text-right font-medium tracking-wider leading-5 text-xs 2xl:text-sm 3xl:text-base">Management System</h2>
            <h2 class="text-right text-3xs 2xl:text-2xs 3xl:text-xs font-medium tracking-wide leading-4">{{ version }}</h2>
            <p class="text-gray-600 font-normal text-xs text-right tracking-wide">
              ♻ CO2-FREE
              <span class="font-medium tracking-widest text-3xs 2xl:text-2xs 3xl:text-xs">for our planet</span>
            </p>
          </div>
        </div>
        </div>
        <form @submit.prevent="login" class="flex flex-col">
          <input required id="email" type="text" placeholder="email lub login" v-model="email"
            class="mr-10 ml-10 mt-3 p-3 border text-gray-900 border-gray-400 rounded-xl focus:border-webgencol focus:outline-none" />
          <input required id="password" type="password" placeholder="hasło" v-model="password"
            class="mr-10 mt-5 ml-10 p-3 mb-3 border-gray-400 border rounded-xl focus:border-webgencol focus:outline-none" />
          <div v-if="errorMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-red-600 text-xs pr-14 pl-14">
            <p>{{ errorMsg }}</p>
          </div>
          <div v-if="niceMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-webgencol text-xs pr-14 pl-14">
            <p>Miłego dnia :)</p>
          </div>
          <button type="submit" @click="loginClick"
            class="self-center mt-5 mb-7 p-2 pr-8 pl-8 bg-gray-200 rounded-xl transition hover:bg-webgencol hover:text-white">Zaloguj
            się</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init.js"
import { useRouter } from "vue-router";


export default {
  name: "Login",
  setup() {
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);
    let niceMsg = ref("Miłego dnia:)");
    const router = useRouter();
    let version = ref("0.8.00")





    const login = async () => {
      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;

        setTimeout(() => {
          router.push({ name: "Work" });
        }, 1000);

      } catch (error) {

        errorMsg.value = `Wystąpił błąd: ${error.message}`,
          niceMsg.value = null
        setTimeout(() => {
          errorMsg.value = null;
          niceMsg.value = "Miłego dnia :)";
        }, 3000);
      }
    }

    return { version, email, password, errorMsg, login, niceMsg }
  }
};
</script>
