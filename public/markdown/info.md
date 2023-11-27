# Informationen zum Projekt zur Sichtbarmachung von Bodenfeuchtigkeit im Teutoburger Wald

Unser Projekt lebt von Datenpunkten - wir laden daher alle Menschen ein, sich mit ihren Sensoren in unser Projekt einzubringen. Im folgenden wird die Möglichkeit sowohl einer **Sensorpatenschaft** vorgestellt als auch die **Nutzung von unseren Daten**, u.a. im Rahmen von Workshops.

Eine **Sensorpatenschaft** gibt es in zwei unterschiedlichen Ausführungen. Beides Mal ist der Sensor-Pate verantwortlich für den Sensor:

- Anschaffung des Sensors: der Sensor bleibt im Besitz des Sensor-Patens
- Ausbringung im Wald: der Sensor muss 50 cm tief vergraben sein und es muss eine Einwilligung der Waldbesitzer dafür geben. Darum kümmert sich der Sensor-Pate im Vorfeld.
- Ersetzen der Batterie bzw. Abbauen des Sensors, falls die Batterie leer sein sollte.

Für unser Projekt nutzen wir den **Dragino LSE01 -- LoRaWAN Soil Moisture & EC Sensor**, der in diversen Elektronik-Läden verkauft wird. Nach unserer Erfahrung hält die Batterie mind. 2 Jahre. Der Hersteller verspricht eine Haltbarkeit von bis zu 10 Jahre.

Die Daten werden mittels LoRaWAN über die Infrastruktur [The Things Network](https://www.thethingsnetwork.org/country/germany/) weitergegeben. Vor der Ausbringung des Sensors sollte überprüft werden, ob ein Gateway von The Things Network Empfang für den neuen Sensor-Standort bietet. Die Abdeckung kann auf der Seite vom [TTN Mapper](https://ttnmapper.org/heatmap/) nachgeschaut werden. Die Kartenanwendung zeigt Punkte, an denen bereits Datenpakete über **The Things Network** verschickt worden sind, also Empfang vorhanden ist. Diese Datenpakete wurden mittels eines **TTN Trackers** erzeugt, die von einem Menschen an den Orten fürs Testen des Empfangs mitgeführt wurden. Eine freie Fläche bedeutet daher nicht automatisch _"kein Empfang"_, sonder evtl. war da auch noch kein Mensch mit einem **TTN Tracker** zum überprüfen.

## Einrichtung und Einbindung von Sensoren

### Inbetriebnahme des Sensors

Für die Inbetriebnahme des Sensors muss zuerst die beiliegende Antenne auf den Antennenanschluss geschraubt werden. Dann ist die Batterie einzuschalten. Dafür ist der Sensor an den vier Schrauben mit einem Kreuz-Schraubenzieher aufzuschrauben.

Zum Einschalten muss der Jumper (gelbes Teil, in der grünen Markierung auf dem ersten Bild zu sehen) auf JP2 (im zweiten Bild ohne Jumper zu sehen) auf beide Stifte gesetzt werden (siehe drittes Bild). Initial sitzt der Jumper nur auf einem der beiden Stifte. Er lässt sich leicht davon abziehen, um dann auf beide Stifte gesetzt zu werden. Die grüne LED zeigt den Erfolg mit Blinken an.

![**Abbildung 1: Darstellung des aufgeschraubten Dragino LSE01. Markierung des Jumpers und JP2, zum Einschalten der Batterie.**](/img/info/Batterie.jpg)

\
\
Anschließend muss der Sensor mit den vier Schrauben zugeschraubt werden. Standardmäßig übermittelt der LSE01 mit Betriebsbeginn die Sensordaten alle 20 Minuten.

### Vergraben des Sensors

Es muss geklärt sein, dass eine Erlaubnis von dem/der Grundstücksbesitzer:in zum Ausbringen des Sensors vorhanden ist. Dann kann der Sensor vergraben werden.

![**Abbildung 2: Die einzelnen Schritte des Eingrabens eines Bodenfeuchte-Sensors.**](/img/info/eingraben.jpg)

\
\
Dafür wird ein 50cm tiefes Loch gegraben. In das Loch wird flach auf den Boden der Sensor mit den drei Stiften gelegt, siehe auch Abbildung 3. Der Sensor erinnert vom Aussehen dabei an eine Gabel.

![**Abbildung 3: Waagerechte Ausrichtung des Bodenfeuchte-Sensors im 50cm tiefen Loch im Waldboden.**](/img/info/sensor.jpg)

\
\
Das Loch wird wieder mit Erde aufgefüllt. Die Sendeeinheit wird außerhalb des Lochs platziert, am besten an einem Pfosten o.ä. angebracht, damit er leichter wiederzufinden ist.

Unserer Erfahrung nach ist es von Vorteil, wenn der Sensor nicht zu offensichtlich sichtbar ist z.B. an Wanderwegen, da das Gerät Neugier weckt und leider auch schon mal mitgenommen wird.

### Option A: Einbinden in einen eigenen TTN-Account und Weitergabe der Daten mittels Webhook

Um die Daten aus dem Wald zu empfangen, wird The Things Network (TTN) genutzt. Eine Möglichkeit ist es (Option A), einen eigenen TTN-Account zu nutzen, um da die Daten zu empfangen und an uns weiterzugeben. Dafür ist ein Account bei [The Things Network](thethingsnetwork.org) einzurichten.

In dem TTN-Account gibt es den Bereich **Console**. In der Console wird eine Anwendung angelegt ("Add application"). Für die Application-ID wird eine selbstbestimmte eindeutige ID aus Kleinbuchstaben, alphanumerischen Zeichen sowie nicht aufeinander folgenden - und \_ eingegeben. In die Anwendungsbeschreibung können beliebige Informationen geschrieben werden.

In der angelegten Anwendung kann mittels Over The Air Activation (OTAA) mit wenigen Schritten der Bodenfeuchte-Sensor LSE01 als Device hinzugefügt werden. Es wird dafür der Aufkleber auf dem Karton vom LSE01 benötigt mit den Default Angaben zu _DEV EUI_, _APP EUI_ und _APP KEY_. Diese Angaben sind wie auf Abbildung 4 zu sehen für die OTAA-Einrichtung des Sensors einzugeben und zu speichern.

![**Abbildung 4: Alle Angaben, die für die Over The Air Activation (OTAA) notwendig sind in der TTN-Console.**](/img/info/otta.jpg)

\
\
Damit die gesendeten Bytes vom Sensor später als Messwerte in der richtigen Einheit angezeigt werden, ist der vom LSE01 gesendete Payload zu decodieren. Auf der Seite von Dragino stehen Payload Decoder als JavaScript Dateien dafür zur Verfügung: [Dragino Payload Decoder](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LSE01/Payload_Decoder/). Wir haben zur Vereinfachung den Code hier mit eingefügt, um ihn Copy-Paste im Device unter dem Tab “Payload Formatters”
unter “Uplink”, “Formatter Type” : “JavaScript” einzufügen und mit **Save Changes** zu speichern.

```
function Decoder(bytes) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
    var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
    var batV=value/1000;//Battery,units:V

    value=bytes[2]<<8 | bytes[3];
    if(bytes[2] & 0x80)
    {value |= 0xFFFF0000;}
    var temp_DS18B20=(value/10).toFixed(2);//DS18B20,temperature

    value=bytes[4]<<8 | bytes[5];
    var water_SOIL=(value/100).toFixed(2);//water_SOIL,Humidity,units:%

    value=bytes[6]<<8 | bytes[7];
    var temp_SOIL;
    if((value & 0x8000)>>15 === 0)
   	 temp_SOIL=(value/100).toFixed(2);//temp_SOIL,temperature
    else if((value & 0x8000)>>15 === 1)
   	 temp_SOIL=((value-0xFFFF)/100).toFixed(2);

    value=bytes[8]<<8 | bytes[9];
    var conduct_SOIL=value;//conduct_SOIL,conductivity,units:uS/cm,max:65535    uS/cm

    var s_flag = bytes[10]>>4;
    var i_flag = bytes[10]&0x0F;
  return {
   	Bat:batV +" V",
   	TempC_DS18B20:temp_DS18B20+" °C",
   	water_SOIL:water_SOIL+" %",
   	temp_SOIL:temp_SOIL+" °C",
   	conduct_SOIL:conduct_SOIL+" uS/cm",
   	Sensor_flag:s_flag,
   	Interrupt_flag:i_flag
  };
}
function decodeUplink(input) {
  return {
	data: Decoder(input.bytes),
	warnings: [],
	errors: []
  };
}
```

Als letzter Schritt werden über "Change Location Setting" die Koordinaten des Sensor-Standortes angegeben.

Der LSE01 wird nun automatisch dem TTN-Netzwerk beitreten. Nach erfolgreichem Beitritt werden Nachrichten ans TTN geschickt und sind in der Application als "Live Data" zu sehen.

Damit diese Daten an uns weitergegeben werden, ist in der Application noch ein Webhook hinzuzufügen. Schickt uns dafür bitte vorab eine Email an **teuto.bodensensor@gmail.com** mit Angabe der Device EUI von eurem Sensor und ob der Sensor in freier Natur steht oder auf einer bewirtschafteten Fläche z.B. einer Grünanlage, in der bei Bedarf gegossen wird. Ihr erhaltet dann (es ist nicht automatisch, daher wird es mind. 24 Stunden brauchen) einen TMM-API Key von uns zurück.

Um einen Webhook anzulegen geht ihr wieder in die Application, unter der euer Bodenfeuchte-Sensor angelegt ist. Dort kann unter **Integrations** der Menüpunkt _Webhooks_ gewählt werden. Fügt mit "Add webhook" einen neuen **Webhook** hinzu. Als _Webhook-ID_ ist eine ID frei wählbar. Folgende Angaben müsst ihr machen:

\
“Webhook-Format” : “JSON”,

\
“Base URL” : “https://api.bodenfeuchte.org”,

Fügt einen "Additional header" hinzu mit "TMM-APIKEY" und dem zugesendeten Key aus unserer Email. Als "Enabled event types" ist "Uplink messages" zu wählen und mit "/measurement/ttn" auszufüllen. Seht dazu auch Abbildung 5 an, wie es am Ende auszusehen hat.

![**Abbildung 5: Angaben zur Einrichtung eines Webhooks für Weitergabe der Daten an das Bodenfeuchte-Projekt von Code Bielefeld e.V.**](/img/info/webhook.jpg)

\
\

### Option B: Einbinden in den The Things Network-Account von Code for Bielefeld

Falls ihr keinen eigenen Account in The Things Network anlegen möchtet, können wir von Code for Bielefeld den Sensor auch bei uns im Account hinzufügen. Dafür müsst ihr den Sensor mit eingeschalteter Batterie vergraben und dann uns die Infos von der Verpackung des Sensors (**DEV EUI**, **APP EUI** und **APP KEY**, gerne als Foto) per E-Mail an teuto.bodensensor@gmail.com zuschicken. Zusätzlich brauchen wir die Koordinaten des Sensor-Standortes und die Angabe, ob der Sensor in freier Natur steht oder auf einer bewirtschafteten Fläche z.B. einer Grünanlage, in der bei Bedarf gegossen wird.

Der Sensor ist weiterhin im Eigentum des Sensor-Patens und dieser verpflichtet sich, sich um den Sensor zu kümmern. Aufgabe von Code for Bielefeld ist nur, dass die Daten ins TTN kommen und von dort weitergeleitet werden zum Bodenfeuchte-Projekt.

## Messwerte des Sensors, Erläuterung verschiedener Standorte

Der Sensor liefert die Werte:

- Bodenfeuchte, in % gemessen
- Bodentemperatur, in °C gemessen
- Leitfähigkeit, in μS/cm gemessen
- Batteriespannung, in V gemessen

Es wird in Zukunft auch eine Downloadmöglichkeit für die Daten zur Verfügung gestellt. Die Daten sind dann Open Data und unter der Public Domain Dedication and License 1.0 für die freie Weiterverwendung an Dritte zur Verfügung gestellt.

Wenn die Bäume bei Bedarf gegossen werden, wird das als weitere Information aufgenommen und soll als Flag an den Daten verfügbar sein, um damit zu filtern. Das betrifft insbesondere Standorte von Stadtbäumen.

Auch wenn der Sensor immer in der Nähe von Bäumen aufgestellt werden soll, sind die Sensorwerte immer nur ein näherungsweise Indikator für den Zustand des Baumes und damit des Waldes. Wichtig: Es ist immer nur eine Messung an einem Punkt. Wie gut ein Baum das vorhandene Wasser aus dem Boden aufnehmen kann, hängt noch von vielen weiteren Faktoren ab, z.B.

- Bodenart
- Wurzelform des Baumes
- weiterer Zugang zu Wasser neben der Bodenfeuchte (einige alte Bestandsbäume haben bereits Kontakt mit ihrem Wurzelsystem zu weiteren Wasservorkommen im Boden)

Aber die Daten sind eine gute Grundlage, um zu lernen, mit den Informationen den Zustand des Waldes zu beschreiben und z.B. auch Stadt-/Bestandsbäume besser zu gießen.

## Möglichkeiten von Workshops

Rund um unser Projekt sind unterschiedliche Workshops möglich, um mit Schüler:innen verschiedene Themen zu Technologien und Umweltschutz zu bearbeiten.

Zum Beispiel hat Code for Bielefeld e.V. gemeinsam mit ExperiMINT e.V. und der Wissenswerkstadt von Bielefeld Marketing den Workshop "Programmieren mit Spaß und IoT" in den Herbstferien 2023 mit 13 Schüler:innen im Alter von 13 bis 16 Jahren angeboten. Dabei haben wir...

- ...an Tag 1 mit einem Arduino, einem einfachen Bodenfeuchte-Sensor und LEDs eine intelligente Gieß-Ampel für die eigene Zimmerpflanze für Zuhause zusammengebaut. Die Ampel wurde in der Sprache **C** programmiert;
- ...an Tag 2 Daten in der Programmiersprache **Python** ausgwertet und visualisiert;
- ...an Tag 3 einen Dragino LSE01 Bodenfeuchte-Sensor gemeinsam vergraben und uns mit der Funktionsweise von LoRaWAN und The Things Network auseinandergesetzt.

Zusätzlich haben an allen drei Tagen Vereinsmitglieder von Code for Bielefeld in Interview-Sessions den Schüler:innen Einblicke in ihre unterschiedlichen beruflichen (Ausbildungs-)Wege in die IT vorgestellt. Dabei gab es einen Überblick über die Vielfalt an Berufen und Aufgaben im Technologie-Bereich. Das war für die Teilnehmer:innen sehr wertvoll hinsichtlich ihrer eigenen Berufsorientierung.

Das Material zu dem Wokshop teilen wir gerne auf Anfrage. Gerne unterstützen wir auch bei weiteren Workshop-Formaten. Schickt uns eure Vorschläge und Ideen unter teuto.bodensensor@gmail.com zu. Wir würden z.B. sehr gerne einmal mit Schüler:innen eine Exkursion mitten hinein in den Teutoburger Wald machen!

## Vorstellung des Projektes

Das Aussehen des Teutoburger Waldes hat sich in den letzten Jahren stark geändert. Immer mehr Kahlflächen entstehen, da Bäume aufgrund von Trockenheit, Krankheit, Schädlingsbefall, u.s.w. gefällt werden müssen. Doch der Trockenheits-Stress und der schlechte Zustand des Waldes sind auch schon vor dem Abholzen vorhanden, aber für Laien nicht oder nur schwer erkennbar. Dennoch sollten wir viel aufmerksamer sein und auf den schlechten Zustand des Waldes reagieren, ist er doch ein klares Zeichen, dass der Klimawandel mittlerweile auch in unserer Region ein Problem ist.

Wir von Code for Bielefeld e.V. möchten gerne auf den Klimawandel und den schlechen Zustand des Waldes in unserer Region hinweisen und objektiv messbare Daten sammeln und als einfach zu verstehende Kartendarstellung zur Verfügung stellen.

Unsere Lösung ist eine Karte, die die Waldbodenfeuchtigkeit sichtbar macht:

- Klimaentwicklungen werden transparent
- Klimaänderung kann objektiv gemessen werden
- Karte ist online frei für alle verfügbar

Wir ermöglichen es Bürgerinnen und Bürger mitzumachen und sich um Sensoren zu kümmern und Teil einer **Citizen-Science-Community** zu werden. Die Daten sind Open Data und können von allen Menschen und interessierten Institutionen weitergenutzt werden. Wir verbinden damit die Hoffnung, das weitere Anwendungen entstehen werden.

Uns ist klar, das wir kein wissenschaftliches Forschungsprojekt mit exakter Datengrundlage sein werden, aber wir werden die Wissenschaftskommunikation mit diesem Projekt unterstützen durch:

- Leicht verfügbare Informationen
- einfache Grafiken angereichert mit Wissen
- Commitment der Bürger:innen durch Beteiligung

**Unsere Vision: **
Bei uns werden Open Data und Citizen Science erlebbar und weitere Innovationen basierend auf Daten werden entstehen!

## Über Code for Bielefeld e.V.

Die Gruppe Code for Bielefeld gehört zu dem Netzwerk Code for Germany, das von der Open Knowledge Foundation Deutschland koordiniert wird. Wir sind eine Gruppe von ehrenamtlichen Aktiven, die in ihrer Freizeit digitale Tools zur Lösung von Problemen der Stadtgesellschaft entwickeln und Daten sichtbarer machen. Wir wollen mit der Forderung nach mehr Open Data, die Transparenz in unserer Stadt erhöhen, die Bürgerbeteiligung fördern und die Demokratie stärken.

Die Gruppe Code for Bielefeld ist 2020 gegründet worden und seit 2023 ein eingetragener Verein. Neben dem Projekt zur Sichtbarmachung von Bodenfeuchte im Teutoburger Wald setzen wir weitere Projekte um, wie bspw. Gieß den Kiez, engagieren uns in Gremien der Stadt zu digitalen Themen, halten Vorträge an Schulen und führen Workshops durch, um unser Wissen mit Bürger:innen und Schüler:innen zu teilen.

Mehr Infos findet ihr unter der [Code for-Webseite](https://www.codefor.de/bielefeld).
