/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID:      string
  readonly VITE_SHOW_DEV_NOTICES:  string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
