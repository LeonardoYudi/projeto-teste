export default function useRedirect(path: string) {
  const router = useRouter();
  router.push(path);
}
