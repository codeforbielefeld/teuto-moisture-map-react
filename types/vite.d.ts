interface ImportMetaEnv {
    readonly DEV: boolean;
    readonly VITE_MOISTURE_DATA_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
