<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import NavMain from "@/components/NavMain.vue"; // Ensure this file exists at the specified path
import NavProjects from "@/components/NavProjects.vue";
import NavUser from "@/components/NavUser.vue";
import TeamSwitcher from "@/components/TeamSwitcher.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  GalleryVerticalEnd,
  SquareTerminal,
  BrainCircuit,
} from "lucide-vue-next";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const authStore = useAuthStore();
const userEmail = computed(() => authStore.getEmail());

const data = ref({
  user: {
    name: "Eldorado User",
    email: userEmail.value,
    avatar: "",
  },
  teams: [
    {
      name: "Dashboard Eldorado AI",
      logo: BrainCircuit,
    },
  ],
  navMain: [
    {
      title: "Grupos",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Usuários",
          url: "/usuarios",
        },
        {
          title: "Contatos",
          url: "/contatos",
        },
        {
          title: "Tipos",
          url: "/tipos",
        },
      ],
    },
  ],
});
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
