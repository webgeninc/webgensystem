<template>
    <div class="h-screen w-screen flex overflow-hidden">
        <Workspace />
        <Header />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Workspace from "../components/Workspace.vue";

export default {
    name: "Work",
    components: {
        Header,
        Workspace
    },
};
</script>
