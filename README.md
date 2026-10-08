# Baby room climate report — Home Assistant blueprint

Every evening at 19:00 (configurable), the automation reads the bedroom
temperature and humidity, decides how many clothing layers the baby should wear,
and pushes the reading to as many phones as you target.

## Install

[![Open your Home Assistant instance and add blueprint](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fe-dupuis%2Fha-baby-room-climate-report%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbaby_room_climate_report.yaml)

**HACS (custom repository)**

1. Add this repo to HACS as a *custom repository* of type **Blueprint**.
2. Search for "Baby room climate report" and install it.
3. Reload automations: **Settings → Automations & scenes → ⋮ → Reload**.

**Manual**

Copy `blueprints/automation/baby_room_climate_report.yaml` into
`config/blueprints/automation/` on the Home Assistant host (Configurator add-on:
`/config/blueprints/automation/`), then reload automations.

## Use

**Settings → Automations & scenes → Create automation → Create from blueprint →
Baby room climate report.**

| Input | What to pick |
|---|---|
| Bedroom temperature sensor | A `sensor` with device class temperature, e.g. `sensor.bedroom_temperature` |
| Bedroom humidity sensor | A `sensor` with device class humidity, e.g. `sensor.bedroom_humidity` |
| Report time | Defaults to 19:00:00 |
| Phones to notify | The `notify.mobile_app_*` service; add every phone you want in one automation |
| Baby name | Used in the notification title |

Save, then enable the automation. To check it without waiting, use
**Run actions** on the automation's ⋮ menu.

For several phones, prefer a single notify group
(**Settings → People → Notify groups**) and select that group in the UI, so one
automation covers every device.

## Layers it recommends

| Bedroom | Layers |
|---|---|
| ≤ 10 °C | 4 — bodysuit + vest + fleece pyjama + cardigan |
| 10–14 °C | 3 — bodysuit + fleece pyjama + light cardigan |
| 14–18 °C | 2 — bodysuit + pyjama |
| 18–22 °C | 2 light — bodysuit + pyjama, no cardigan |
| 22–25 °C | 1 — bodysuit, or vest under the pyjama |
| > 25 °C | 1 minimum — nappy and light vest |

Humidity adds a note: below 30 % suggests a humidifier, above 65 % suggests
breathable cotton and airing the room.

Thresholds are inline in the YAML. Edit the `if` steps in `variables:` to match
your own comfort range.

## Test

The template logic is checked against every band:

```bash
npm install
npm test
```

## License

MIT
## Import directly to Home Assistant

[![Open your Home Assistant instance and import this blueprint directly.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fe-dupuis%2Fha-baby-room-climate-report%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fbaby_room_climate_report.yaml)
