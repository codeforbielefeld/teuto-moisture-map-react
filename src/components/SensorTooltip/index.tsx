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
    footer: [
        {
            margin: 0,
            marginTop: "10px",
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
    const format = (n: number) =>
        new Intl.NumberFormat("de-DE", {
            maximumFractionDigits: 2,
        }).format(n);
    return (
        <>
            <div className={styles.header}>
                <Text className={styles.title}>
                    Bodenfeuchte {format(record.soil_moisture)} %
                </Text>
            </div>
            <div className={styles.inner}>
                <table>
                    <tbody>
                        {record.soil_temperature != null && (
                            <tr>
                                <td>
                                    <Text>Bodentemperatur</Text>
                                </td>
                                <td>
                                    <Text>
                                        {format(record.soil_temperature)} °C
                                    </Text>
                                </td>
                            </tr>
                        )}
                        {record.soil_conductivity != null && (
                            <tr>
                                <td>
                                    <Text>Leitfähigkeit</Text>
                                </td>
                                <td>
                                    <Text>
                                        {format(record.soil_conductivity)} μS/cm
                                    </Text>
                                </td>
                            </tr>
                        )}
                        {record.battery != null && (
                            <tr>
                                <td>
                                    <Text>Batteriespannung</Text>
                                </td>
                                <td>
                                    <Text>{format(record.battery)} V</Text>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={styles.footer}>
                    <Text className={styles.subtext}>
                        Letzte Aktualisierung:{" "}
                        {record.last_updated.toLocaleString()}
                    </Text>
                </div>
            </div>
        </>
    );
};

export default SensorTooltip;
