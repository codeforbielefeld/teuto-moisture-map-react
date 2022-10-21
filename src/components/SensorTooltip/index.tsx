import { FontWeights, getTheme, mergeStyleSets, Text } from "@fluentui/react";
import { SensorInfo } from "../../model/models";

// Styles
const theme = getTheme();
const styles = mergeStyleSets({
    header: {
        padding: "12px 18px 12px",
    },
    title: [
        theme.fonts.xLarge,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    inner: {
        height: "100%",
        padding: "0 18px 15px",
    },
    subtext: [
        theme.fonts.small,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    link: [
        theme.fonts.medium,
        {
            color: theme.palette.neutralPrimary,
        },
    ],
});

const SensorTooltip = ({ record }: { record: SensorInfo }) => {
    return (
        <>
            <div className={styles.header}>
                <Text className={styles.title}>
                    Feuchte: {record.percent} %
                </Text>
            </div>
            <div className={styles.inner}>
                <Text className={styles.subtext}>
                    Letzte Aktualisierung: {record.timestamp.toLocaleString()}
                </Text>
            </div>
        </>
    );
};

export default SensorTooltip;
