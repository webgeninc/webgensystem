<template>
  <div class="flex w-screen h-screen bg-white flex-grow p-32 font-montserrat overflow-hidden">
    <div class="flex flex-grow h-full items-center justify-center">
      <div class="bg-white w-1/3 rounded-3xl shadow-lg flex flex-col border border-gray-100">
        <div class="flex flex-row justify-center m-5">
          <img src="../assets/systems.svg" alt class="h-20 w-44 object-fill p-1" />
          <div class="self-center">
            <h2 class="text-right font-medium tracking-wider leading-5">
              <span class="tracking-normal">WEBGENETICSS</span> Interpolate
            </h2>
            <h2 class="text-right font-medium tracking-wider leading-5">Management System</h2>
            <h2 class="text-right text-xs font-medium tracking-wide leading-4">WIMS 0.7.20</h2>
            <p class="text-gray-600 font-normal text-xs text-right tracking-wide">
              ♻ CO2-FREE
              <span class="font-light tracking-widest text-2xs">for our planet</span>
            </p>
          </div>
        </div>
        <form @submit.prevent="login" class="flex flex-col">
          <input
            required
            id="email"
            type="text"
            placeholder="email lub login"
            v-model="email"
            class="mr-10 ml-10 mt-3 p-3 border text-gray-900 border-gray-400 rounded-xl focus:border-webgencol focus:outline-none"
          />
          <input
            required
            id="password"
            type="password"
            placeholder="hasło"
            v-model="password"
            class="mr-10 mt-5 ml-10 p-3 mb-3 border-gray-400 border rounded-xl focus:border-webgencol focus:outline-none"
          />
          <div
            v-if="errorMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-red-600 text-xs pr-14 pl-14"
          >
            <p>{{ errorMsg }}</p>
          </div>
          <div
            v-if="niceMsg"
            class="flex justify-center items-center text-justify font-medium tracking-wider text-webgencol text-xs pr-14 pl-14"
          >
            <p>Miłego dnia :)</p>
          </div>
          <button
            type="submit"
            @click="loginClick"
            class="self-center mt-5 mb-7 p-2 pr-8 pl-8 bg-gray-200 rounded-xl transition hover:bg-webgencol hover:text-white"
          >Zaloguj się</button>
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

    return { email, password, errorMsg, login, niceMsg }
  }
};
</script>
