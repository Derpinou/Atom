
import { use, init, getFixedT } from "i18next";
//@ts-ignore
import * as Backend from 'i18next-fs-backend';
import { readdir, stat } from "fs/promises";
import { join, resolve } from "path";

async function walkDirectory(dir: string, namespaces = [], folderName = "") {
    const files = await readdir(dir);

    const languages = [];
    for (const file of files) {
        const state = await stat(join(dir, file));
        if (state.isDirectory()) {
            const isLanguage = file.includes("-");
            if (isLanguage) languages.push(file);

            const folder = await walkDirectory(
                join(dir, file),
                namespaces,
                isLanguage ? "" : `${file}/`
            );

            // eslint-disable-next-line no-param-reassign
            namespaces = folder.namespaces;
        } else {
            //@ts-ignore
            namespaces.push(`${folderName}${file.substring(0, file.length - 5)}`);
        }
    }

    return { namespaces: [...new Set(namespaces)], languages };
}

export default async () => {
    const { namespaces, languages } = await walkDirectory(
        resolve(__dirname, "../../../i18n/")
    );
    //@ts-ignore
    use(new Backend() as Backend);
    await init({
        backend: {
            jsonIndent: 2,
            loadPath: resolve(__dirname, "../../../i18n/{{lng}}/{{ns}}.json")
        },
        debug: false,
        fallbackLng: "en-EN",
        initImmediate: false,
        interpolation: { escapeValue: false },
        load: "all",
        ns: namespaces,
        preload: languages
    });
    return new Map(languages.map(item => [item, getFixedT(item)]));
};