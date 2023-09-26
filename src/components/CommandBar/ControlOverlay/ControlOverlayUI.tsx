import { FC } from "react";

//noch kein Styling gemacht
//"Overlay" zu "Ansicht" ändern??

type ControlOverlayUIProps = {
    showLayer: number;
    setShowLayer: React.Dispatch<React.SetStateAction<number>>;
};

const ControlOverlayUI: FC<ControlOverlayUIProps> = ({ showLayer, setShowLayer }) => {
    return (
        <div>
            <h3>Wähle Overlay:</h3>
            <div>
                <label>
                    <input type="radio" value="option1" onChange={() => setShowLayer(1)} checked={showLayer == 1} />
                    Bodenfeuchte Daily | Einheit in &nbsp;
                    <a href="https://www.dwd.de/DE/fachnutzer/landwirtschaft/dokumentationen/allgemein/bf_erlaeuterungen.pdf?__blob=publicationFile&v=7">
                        nFK
                    </a>
                    % (nutzbarer Feldkapazität)
                </label>
            </div>
            <div>
                <label>
                    <input type="radio" value="option2" onChange={() => setShowLayer(2)} checked={showLayer == 2} />
                    Bodenfeuchte Monthly | Einheit in &nbsp;
                    <a href="https://www.dwd.de/DE/fachnutzer/landwirtschaft/dokumentationen/allgemein/bf_erlaeuterungen.pdf?__blob=publicationFile&v=7">
                        nFK
                    </a>
                    % (nutzbarer Feldkapazität)
                </label>
            </div>
            <div>
                <label>
                    <input type="radio" value="option3" onChange={() => setShowLayer(3)} checked={showLayer == 3} />
                    Niederschlag Monthly | Einheit in mm (Millimeter)
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="clearOverlay"
                        onChange={() => setShowLayer(0)}
                        checked={showLayer == 0}
                    />
                    kein Overlay
                </label>
            </div>
        </div>
    );
};

export default ControlOverlayUI;
