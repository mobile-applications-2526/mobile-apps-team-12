export const router = {
  navigate: () => {},
  back: () => {},
  push: () => {},
  replace: () => {},
  canGoBack: () => false,
  setParams: () => {},
};

export const useRouter = () => router;

export const useLocalSearchParams = () => ({});

export const useGlobalSearchParams = () => ({});

export const useSegments = () => [];

export const usePathname = () => '/';

export default {
  router,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
  useSegments,
  usePathname,
};