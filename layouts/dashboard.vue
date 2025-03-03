<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toast";
const routesMap: Record<string, string> = {
  usuarios: "Usuários",
  tipos: "Tipos",
  contatos: "Contato",
};
const route = useRoute();
const routeName = computed(() => routesMap[route.name as string] || route.name);
</script>

<template>
  <div class="max-h-screen h-screen w-screen">
    <main class="flex max-h-full overflow-auto">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header
            class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
          >
            <div class="flex items-center gap-2 px-4">
              <div class="flex items-center gap-2">
                <SidebarTrigger class="-ml-1" />

                <Separator orientation="vertical" class="mr-2 h-4" />
              </div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage class="capitalize">{{
                      routeName
                    }}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <main class="">
            <Toaster />
            <div class="p-4 max-w-full">
              <slot />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  </div>
</template>
