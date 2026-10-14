import { Text, TextProps } from "@/shared/ui/typography/text/Text";
import { textPositions } from "@/shared/ui/typography/text-position";
import { textSizes } from "@/shared/ui/typography/text-size";
import { textWeights } from "@/shared/ui/typography/text-weight";
import {
    ComponentDocumentation,
    DocumentationSection,
    ComponentPropsDocs,
} from "@/shared/types/ui/documentation";
import { createExample, getPropRows } from "@/shared/utils/ui-documentation";
import { textMetadata, textPropNames } from "@/shared/ui/typography/text/text.metadata";
import { isNonEmptyArray } from "@/shared/utils/array";

const getSizeKey = (val: string) =>
    Object.keys(textSizes).find((k) => textSizes[k as keyof typeof textSizes] === val) || "";
const getWeightKey = (val: string) =>
    Object.keys(textWeights).find((k) => textWeights[k as keyof typeof textWeights] === val) || "";
const getPositionKey = (val: string) =>
    Object.keys(textPositions).find((k) => textPositions[k as keyof typeof textPositions] === val) || "";

function createTextUsageCode(props: Omit<TextProps, "children">) {
    const imports = ['import { Text } from "@/shared/ui/typography/text/Text";'];

    const importMap = {
        textPosition: 'import { textPositions } from "@/shared/ui/typography/text-position";',
        textSize: 'import { textSizes } from "@/shared/ui/typography/text-size";',
        textWeight: 'import { textWeights } from "@/shared/ui/typography/text-weight";',
    } as const;

    (Object.keys(importMap) as (keyof typeof importMap)[]).forEach((key) => {
        if (props[key] !== undefined) {
            imports.push(importMap[key]);
        }
    });

    const propEntries: string[] = [];

    const propRules: {
        [K in keyof Omit<TextProps, "children">]?: (
            value: NonNullable<Omit<TextProps, "children">[K]>,
        ) => string;
    } = {
        textPosition: (value) => {
            const key = getPositionKey(value as string);
            return `textPosition={textPositions.${key}}`;
        },
        textSize: (value) => {
            const key = getSizeKey(value as string);
            return `textSize={textSizes.${key}}`;
        },
        textWeight: (value) => {
            const key = getWeightKey(value as string);
            return `textWeight={textWeights.${key}}`;
        },
        uppercase: (value) => (value ? "uppercase" : ""),
        className: (value) => `className="${value}"`,
    };

    (Object.keys(props) as (keyof Omit<TextProps, "children">)[]).forEach((key) => {
        const value = props[key];

        if (value === undefined) {
            return;
        }

        const rule = propRules[key];

        if (rule) {
            propEntries.push((rule as (val: unknown) => string)(value));
        }
    });

    const propEntriesFiltered = propEntries.filter(Boolean);
    const propsString = isNonEmptyArray(propEntriesFiltered) ? ` ${propEntriesFiltered.join(" ")}` : "";

    return `${imports.join("\n")}\n\n<Text${propsString}>\n    Приклад тексту для відображення\n</Text>`;
}

const textSizeExamples = [
    createExample({
        id: `text-size-${getSizeKey(textSizes.sm)}`,
        title: `Малий текст (${getSizeKey(textSizes.sm)})`,
        description: "Для підписів, допоміжних пояснень або дрібних деталей в інтерфейсі (14px).",
        tags: [`size: ${getSizeKey(textSizes.sm)}`, "14px"],
        preview: <Text textSize={textSizes.sm}>Це малий допоміжний текст.</Text>,
        code: createTextUsageCode({ textSize: textSizes.sm }),
    }),
    createExample({
        id: `text-size-${getSizeKey(textSizes.md)}`,
        title: `Стандартний текст (${getSizeKey(textSizes.md)})`,
        description: "Основний розмір для читання довгих описів, статей або значень у таблицях (16px).",
        tags: [`size: ${getSizeKey(textSizes.md)}`, "16px", "default"],
        preview: <Text textSize={textSizes.md}>Це стандартний основний текст.</Text>,
        code: createTextUsageCode({ textSize: textSizes.md }),
    }),
    createExample({
        id: `text-size-${getSizeKey(textSizes.lg)}`,
        title: `Великий текст (${getSizeKey(textSizes.lg)})`,
        description:
            "Використовується для акцентного виділення абзаців або підзаголовків середньої важливості (18px).",
        tags: [`size: ${getSizeKey(textSizes.lg)}`, "18px"],
        preview: <Text textSize={textSizes.lg}>Це великий акцентний текст.</Text>,
        code: createTextUsageCode({ textSize: textSizes.lg }),
    }),
    createExample({
        id: `text-size-${getSizeKey(textSizes.xl)}`,
        title: `Дуже великий текст (${getSizeKey(textSizes.xl)})`,
        description: "Для великих текстових блоків або виділених нотаток (20px).",
        tags: [`size: ${getSizeKey(textSizes.xl)}`, "20px"],
        preview: <Text textSize={textSizes.xl}>Це дуже великий текст.</Text>,
        code: createTextUsageCode({ textSize: textSizes.xl }),
    }),
    createExample({
        id: `text-size-${getSizeKey(textSizes.xxl)}`,
        title: `Максимальний текст (${getSizeKey(textSizes.xxl)})`,
        description: "Коли текст повинен мати акцент розміру заголовка (24px).",
        tags: [`size: ${getSizeKey(textSizes.xxl)}`, "24px"],
        preview: <Text textSize={textSizes.xxl}>Це максимальний розмір тексту.</Text>,
        code: createTextUsageCode({ textSize: textSizes.xxl }),
    }),
];

const textWeightExamples = [
    createExample({
        id: `text-weight-${getWeightKey(textWeights.normal)}`,
        title: `Звичайний шрифт (${getWeightKey(textWeights.normal)})`,
        description: "Базове накреслення для читабельного тексту.",
        tags: [`weight: ${getWeightKey(textWeights.normal)}`, "default"],
        preview: <Text textWeight={textWeights.normal}>Звичайне накреслення тексту.</Text>,
        code: createTextUsageCode({ textWeight: textWeights.normal }),
    }),
    createExample({
        id: `text-weight-${getWeightKey(textWeights.medium)}`,
        title: `Напівжирний шрифт (${getWeightKey(textWeights.medium)})`,
        description: "Для помірного акцентування важливих слів або міток полів.",
        tags: [`weight: ${getWeightKey(textWeights.medium)}`],
        preview: <Text textWeight={textWeights.medium}>Напівжирне накреслення тексту.</Text>,
        code: createTextUsageCode({ textWeight: textWeights.medium }),
    }),
    createExample({
        id: `text-weight-${getWeightKey(textWeights.bold)}`,
        title: `Жирний шрифт (${getWeightKey(textWeights.bold)})`,
        description: "Для максимального візуального виділення важливих значень.",
        tags: [`weight: ${getWeightKey(textWeights.bold)}`],
        preview: <Text textWeight={textWeights.bold}>Жирне накреслення тексту.</Text>,
        code: createTextUsageCode({ textWeight: textWeights.bold }),
    }),
];

const textPositionExamples = [
    createExample({
        id: `text-align-${getPositionKey(textPositions.left)}`,
        title: `Вирівнювання по краю ${getPositionKey(textPositions.left)}`,
        description: "Стандартне вирівнювання тексту для легкого читання.",
        tags: [`align: ${getPositionKey(textPositions.left)}`, "default"],
        preview: (
            <div className="w-full">
                <Text textPosition={textPositions.left}>Текст зліва.</Text>
            </div>
        ),
        code: createTextUsageCode({ textPosition: textPositions.left }),
    }),
    createExample({
        id: `text-align-${getPositionKey(textPositions.center)}`,
        title: `Вирівнювання по краю ${getPositionKey(textPositions.center)}`,
        description: "Підходить для карток, модальних вікон або коротких інформаційних банерів.",
        tags: [`align: ${getPositionKey(textPositions.center)}`],
        preview: (
            <div className="w-full">
                <Text textPosition={textPositions.center}>Текст по центру.</Text>
            </div>
        ),
        code: createTextUsageCode({ textPosition: textPositions.center }),
    }),
    createExample({
        id: `text-align-${getPositionKey(textPositions.right)}`,
        title: `Вирівнювання по краю ${getPositionKey(textPositions.right)}`,
        description: "Для числових колонок у таблицях або правого боку карток.",
        tags: [`align: ${getPositionKey(textPositions.right)}`],
        preview: (
            <div className="w-full">
                <Text textPosition={textPositions.right}>Текст справа.</Text>
            </div>
        ),
        code: createTextUsageCode({ textPosition: textPositions.right }),
    }),
];

const textUppercaseExamples = [
    createExample({
        id: "text-uppercase-false",
        title: "Звичайний регістр тексту",
        description: "Текст виводиться так, як він переданий у props.",
        tags: [`${textPropNames.uppercase}: false`, "default"],
        preview: <Text uppercase={false}>Звичайний регістр.</Text>,
        code: createTextUsageCode({ uppercase: false }),
    }),
    createExample({
        id: "text-uppercase-true",
        title: "Верхній регістр тексту (Uppercase)",
        description: "Робить усі літери великими для створення акцентних міток.",
        tags: [`${textPropNames.uppercase}: true`],
        preview: <Text uppercase>Текст у верхньому регістрі.</Text>,
        code: createTextUsageCode({ uppercase: true }),
    }),
];

const textCustomClassExamples = [
    createExample({
        id: "text-custom-class",
        title: "Кастомний CSS-клас",
        description: `Зовнішнє коригування стилів, 
        наприклад кольору тексту чи стилю шрифту через \`${textPropNames.className}\`.`,
        tags: [textPropNames.className, "custom"],
        preview: <Text className="text-emerald-600 italic">Текст зеленого кольору з курсивом.</Text>,
        code: createTextUsageCode({ className: "text-emerald-600 italic" }),
    }),
];

const textSections: DocumentationSection[] = [
    {
        id: "text-sizes",
        title: "Розміри тексту",
        description: `Компонент \`Text\` підтримує гнучке масштабування через проп \`${textPropNames.textSize}\`.`,
        componentPath: textMetadata.componentPath,
        examples: textSizeExamples,
    },
    {
        id: "text-weights",
        title: "Товщина шрифту",
        description: `Керування накресленням шрифту через проп \`${textPropNames.textWeight}\`.`,
        componentPath: textMetadata.componentPath,
        examples: textWeightExamples,
    },
    {
        id: "text-positions",
        title: "Вирівнювання",
        description: `Позиціонування контенту за допомогою Tailwind класів 
        через проп \`${textPropNames.textPosition}\`.`,
        componentPath: textMetadata.componentPath,
        examples: textPositionExamples,
    },
    {
        id: "text-transforms",
        title: "Регістр символів",
        description: `Трансформація тексту у верхній регістр через проп \`${textPropNames.uppercase}\`.`,
        componentPath: textMetadata.componentPath,
        examples: textUppercaseExamples,
    },
    {
        id: "text-customizing",
        title: "Кастомізація стилю",
        description: `Застосування додаткових Tailwind класів через проп \`${textPropNames.className}\`.`,
        componentPath: textMetadata.componentPath,
        examples: textCustomClassExamples,
    },
];

const textPropsDocsConfig: ComponentPropsDocs<Required<TextProps>> = {
    children: {
        type: textMetadata.props[textPropNames.children].type,
        defaultValue: textMetadata.props[textPropNames.children].defaultValue,
        description: "Текстовий контент або дочірні елементи для рендерингу.",
        required: textMetadata.props[textPropNames.children].required,
    },
    textPosition: {
        type: textMetadata.props[textPropNames.textPosition].type,
        defaultValue: textMetadata.props[textPropNames.textPosition].defaultValue,
        description: "Вирівнювання тексту по горизонталі.",
        required: textMetadata.props[textPropNames.textPosition].required,
    },
    textSize: {
        type: textMetadata.props[textPropNames.textSize].type,
        defaultValue: textMetadata.props[textPropNames.textSize].defaultValue,
        description: "Розмір шрифту в класичних Tailwind-категоріях.",
        required: textMetadata.props[textPropNames.textSize].required,
    },
    textWeight: {
        type: textMetadata.props[textPropNames.textWeight].type,
        defaultValue: textMetadata.props[textPropNames.textWeight].defaultValue,
        description: "Вага (товщина) шрифту.",
        required: textMetadata.props[textPropNames.textWeight].required,
    },
    uppercase: {
        type: textMetadata.props[textPropNames.uppercase].type,
        defaultValue: textMetadata.props[textPropNames.uppercase].defaultValue,
        description: "Автоматичне перетворення всього тексту у верхній регістр.",
        required: textMetadata.props[textPropNames.uppercase].required,
    },
    className: {
        type: textMetadata.props[textPropNames.className].type,
        defaultValue: textMetadata.props[textPropNames.className].defaultValue,
        description: "Додаткові стилі Tailwind CSS для точкового коригування.",
        required: textMetadata.props[textPropNames.className].required,
    },
};

export const textDocumentation: ComponentDocumentation = {
    id: textMetadata.id,
    name: textMetadata.name,
    description:
        "Універсальний компонент для виведення звичайного абзацу тексту. Дозволяє гнучко " +
        "конфігурувати розміри, товщину та вирівнювання за допомогою дизайн-токенів проекту.",
    componentPath: textMetadata.componentPath,
    prop: getPropRows(textPropsDocsConfig),
    sections: textSections,
};
