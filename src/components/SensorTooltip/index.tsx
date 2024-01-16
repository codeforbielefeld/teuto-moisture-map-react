import { Dropdown, FontWeights, getTheme, Label, mergeStyleSets, Text } from "@fluentui/react";
import { SensorInfo } from "../../model/models";
import SensorChart from "../SensorChart";
import { useContext } from "react";
import { HistoryWindow, HistoryWindowContext } from "../../App";

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
    history: {
        marginTop: "1em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dropdown: {
        minWidth: "11em",
    },
    chart: {
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
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
    const format = (n: number) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(Number(n));
    const { historyWindow, setHistoryWindow } = useContext(HistoryWindowContext);
    return (
        <>
            <div className={styles.inner}>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Tagesmittel</td>
                            <td>letzte</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bodenfeuchte</td>
                            <td>{format(record.avg_soil_moisture)} %</td>
                            <td>{format(record.soil_moisture)} %</td>
                        </tr>
                        {record.soil_temperature != null && record.avg_soil_temperature != null && (
                            <tr>
                                <td>Bodentemperatur</td>
                                <td>{format(record.avg_soil_temperature)} °C</td>
                                <td>{format(record.soil_temperature)} °C</td>
                            </tr>
                        )}
                        {record.soil_conductivity != null && record.avg_soil_conductivity != null && (
                            <tr>
                                <td>Leitfähigkeit</td>
                                <td>{format(record.avg_soil_conductivity)} μS/cm</td>
                                <td>{format(record.soil_conductivity)} μS/cm</td>
                            </tr>
                        )}
                        {record.battery != null && record.avg_battery != null && (
                            <tr>
                                <td>Batteriespannung</td>
                                <td>{format(record.avg_battery)} V</td>
                                <td>{format(record.battery)} V</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={styles.history}>
                    <Label>Verlauf</Label>
                    <Dropdown
                        className={styles.dropdown}
                        options={[
                            { key: HistoryWindow.hourly, text: "stündlich" },
                            { key: HistoryWindow.daily, text: "täglich" },
                            { key: HistoryWindow.weekly, text: "wöchentlich" },
                            { key: HistoryWindow.monthly, text: "monatlich" },
                        ]}
                        defaultSelectedKey={historyWindow}
                        onChange={(event, option) => {
                            if (Object.values(HistoryWindow).includes(option?.key as any)) {
                                setHistoryWindow(option?.key as any);
                            }
                        }}
                    />
                </div>
                <div className={styles.chart}>
                    <SensorChart sensorInfo={record} />
                </div>
                <div className={styles.footer}>
                    <Text className={styles.subtext}>
                        Letzte Aktualisierung: {record.last_updated.toLocaleString()}
                    </Text>
                </div>
            </div>
        </>
    );
};

export default SensorTooltip;
