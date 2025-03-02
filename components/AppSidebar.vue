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
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

// This is sample data.
const data = {
  user: {
    name: "Leonardo Iwama",
    email: "leonardo.iwama@outlook.com",
    avatar: "",
  },
  teams: [
    {
      name: "Eldorado Front",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
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
          title: "Usuarios",
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
    // {
    //   title: "Tipos",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Criar",
    //       url: "#",
    //     },
    //     {
    //       title: "Ativos",
    //       url: "#",
    //     },
    //     {
    //       title: "Inativos",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Contatos",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Criar",
    //       url: "#",
    //     },
    //     {
    //       title: "Ativos",
    //       url: "#",
    //     },
    //     {
    //       title: "Inativos",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};
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
