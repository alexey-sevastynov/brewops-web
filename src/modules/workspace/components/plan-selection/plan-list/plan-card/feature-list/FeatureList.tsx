import { Text } from "@/shared/ui/typography/text/Text";

interface FeatureListProps {
    features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
    return (
        <ul className="my-7 space-y-3">
            {features.map((feature) => (
                <li key={feature} className="border-border border-b pb-3">
                    <Text>{feature}</Text>
                </li>
            ))}
        </ul>
    );
}
