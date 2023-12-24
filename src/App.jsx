import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function SolarForm() {
  const [picklist, setPicklist] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      panelsProRailParallel: 0,
      panelsProRailLandscape: 0,
      panelsTiltRailParallel: 0,
      panelsTiltRailLandscape: 0,
      panelsOnTile: 0,
      panelsOnCorrugated: 0,
      panelsOnKliplok: 0,
      panelsOnTrapezoidal: 0,
      numberOfStrings: 1,
      numberOfSkipPlugs: 0,
      isTesla: false,

      numberOf25mmConduits: 0,
      numberOf32mmConduits: 0,
      numberOfTileDektites: 0,
      numberOfMetalDektites: 0,
      numberOfAluminiumSquareDuct: 0,
    },
  });

  const PANEL_HEIGHT = 1900;
  const PANEL_WIDTH = 1150;
  const RAIL_LENGTH = 4400;
  const ISOLATOR_WIDTH = 400;
  const TILE_FEET_SPACING = 1200;
  const CORRUGATED_FEET_SPACING = 900;
  const KLIPLOK_FEET_SPACING = 500;
  const TRAPEZOIDAL_FEET_SPACING = 500;
  const EXTRA_FEET_LEEWAY = 6;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const {
      panelsProRailParallel,
      panelsProRailLandscape,
      panelsTiltRailParallel,
      panelsTiltRailLandscape,
      panelsOnTile,
      panelsOnCorrugated,
      panelsOnKliplok,
      panelsOnTrapezoidal,
      numberOfStrings,
      numberOfSkipPlugs,
      isTesla,
      numberOf25mmConduits,
      numberOf32mmConduits,
      numberOfTileDektites,
      numberOfMetalDektites,
      numberOfAluminiumSquareDuct,
    } = data;

    const numberOfPanels = panelsProRailParallel + panelsProRailLandscape + panelsTiltRailParallel + panelsTiltRailLandscape;
    const picklist = {
      tileFeet: panelsOnTile ? Math.ceil((panelsOnTile * PANEL_WIDTH * 2 / TILE_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
      corrugatedFeet: panelsOnCorrugated ? Math.ceil((panelsOnCorrugated * PANEL_WIDTH * 2 / CORRUGATED_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
      kliplokFeet: panelsOnKliplok ? Math.ceil((panelsOnKliplok * PANEL_WIDTH * 2 / KLIPLOK_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
      trapezoidalFeet: panelsOnTrapezoidal ? Math.ceil((panelsOnTrapezoidal * PANEL_WIDTH * 2 / TRAPEZOIDAL_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
      proRails: panelsProRailParallel === 0 && panelsProRailParallel === 0 ? 0 :
      Math.ceil((panelsProRailParallel ? panelsProRailParallel * PANEL_WIDTH * 2 / RAIL_LENGTH : 0) + 
      (panelsProRailLandscape ? panelsProRailLandscape * PANEL_HEIGHT * 2 / RAIL_LENGTH : 0) + 
      (numberOfStrings * ISOLATOR_WIDTH / RAIL_LENGTH)),
      tiltRails: panelsTiltRailParallel === 0 && panelsTiltRailParallel === 0 ? 0 :
      Math.ceil((panelsTiltRailParallel ? panelsTiltRailParallel * PANEL_WIDTH * 2 / RAIL_LENGTH : 0) + 
      (panelsTiltRailLandscape ? panelsTiltRailLandscape * PANEL_HEIGHT * 2 / RAIL_LENGTH : 0) + 
      (numberOfStrings * ISOLATOR_WIDTH / RAIL_LENGTH)),
      screws: panelsOnTile || panelsOnCorrugated || panelsOnTrapezoidal ? true : false,
      joiners: true,
      earthStuff: true,
      numberOfPanels,
      midsAndEnds: panelsProRailParallel || panelsProRailLandscape ? true : false,
      midsAndEndsOld: panelsTiltRailParallel || panelsTiltRailLandscape ? true : false,
      qCables: numberOfPanels + numberOfSkipPlugs,
      isolatorsNormalType: isTesla ? numberOfStrings : 0,
      isolatorsClearTypeType: !isTesla ? numberOfStrings : 0,
      qRelay: !isTesla ? numberOfStrings : 0,
      c32AmpBreaker: !isTesla ? numberOfStrings : 0,
      envoy: true,
      numberOf25mmConduits,
      numberOf32mmConduits,
      numberOfTileDektites,
      numberOfMetalDektites,
      numberOfAluminiumSquareDuct,
    }
    setPicklist(picklist);
    console.log(picklist);
  });

  return (
    <form onSubmit={onSubmit}>

      <h4>Panels on Pro Rails</h4>
      <div>
        <label># panels on pro rail parallel:</label>
        <input
          type="number"
          name="panelsProRailParallel"
          {...register("panelsProRailParallel", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsProRailParallel?.type === "required" && <span>Number required</span>}
        {errors.panelsProRailParallel?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label># panels on pro rail landscape:</label>
        <input
          type="number"
          name="panelsProRailLandscape"
          {...register("panelsProRailLandscape", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsProRailLandscape?.type === "required" && <span>Number required</span>}
        {errors.panelsProRailLandscape?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <h4>Panels on 5 Degree Tilt Rails</h4>
      <div>
        <label># panels on tilt rail parallel:</label>
        <input
          type="number"
          name="panelsTiltRailParallel"
          {...register("panelsTiltRailParallel", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsTiltRailParallel?.type === "required" && <span>Number required</span>}
        {errors.panelsTiltRailParallel?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label># panels on tilt rail landscape:</label>
        <input
          type="number"
          name="panelsTiltRailLandscape"
          {...register("panelsTiltRailLandscape", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsTiltRailLandscape?.type === "required" && <span>Number required</span>}
        {errors.panelsTiltRailLandscape?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <h4>Roof Surfaces</h4>
      <p>N.B. Each panels that are laid in landscape orientation should be itemized as 2 panels</p>
      <div>
        <label># panels on tile:</label>
        <input
          type="number"
          name="panelsOnTile"
          {...register("panelsOnTile", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsOnTile?.type === "required" && <span>Number required</span>}
        {errors.panelsOnTile?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label># panels on corrugated:</label>
        <input
          type="number"
          name="panelsOnCorrugated"
          {...register("panelsOnCorrugated", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsOnCorrugated?.type === "required" && <span>Number required</span>}
        {errors.panelsOnCorrugated?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label># panels on kliplok:</label>
        <input
          type="number"
          name="panelsOnKliplok"
          {...register("panelsOnKliplok", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsOnKliplok?.type === "required" && <span>Number required</span>}
        {errors.panelsOnKliplok?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label># panels on trapezoidal:</label>
        <input
          type="number"
          name="panelsOnTrapezoidal"
          {...register("panelsOnTrapezoidal", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.panelsOnTrapezoidal?.type === "required" && <span>Number required</span>}
        {errors.panelsOnTrapezoidal?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <h4>Q-Cables</h4>
      <div>
        <label># strings:</label>
        <input
          type="number"
          name="numberOfStrings"
          {...register("numberOfStrings", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 1
          })}
        />
        {errors.numberOfStrings?.type === "required" && <span>Number required</span>}
        {errors.numberOfStrings?.type === "min" && <span>Must be 1 or greater</span>}
      </div>

      <div>
        <label># approx skipped plugs:</label>
        <input
          type="number"
          name="numberOfSkipPlugs"
          {...register("numberOfSkipPlugs", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.numberOfSkipPlugs?.type === "required" && <span>Number required</span>}
        {errors.numberOfSkipPlugs?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <input
          type="checkbox"
          name="isTesla"
          {...register("isTesla", {
          })}
        />
        <label>Is Tesla?</label>
      </div>

      <h4>Sundries</h4>
      <div>
        <label>25mm conduits:</label>
        <input
          type="number"
          name="numberOf25mmConduits"
          {...register("numberOf25mmConduits", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.numberOf25mmConduits?.type === "required" && <span>Number required</span>}
        {errors.numberOf25mmConduits?.type === "min" && <span>Must be 0 or greater</span>}
      </div>
      <div>
        <label>32mm conduits:</label>
        <input
          type="number"
          name="numberOf32mmConduits"
          {...register("numberOf32mmConduits", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.numberOf32mmConduits?.type === "required" && <span>Number required</span>}
        {errors.numberOf32mmConduits?.type === "min" && <span>Must be 0 or greater</span>}
      </div>
      
      <div>
        <label>Tile Dektites:</label>
        <input
          type="number"
          name="numberOfTileDektites"
          {...register("numberOfTileDektites", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.numberOfTileDektites?.type === "required" && <span>Number required</span>}
        {errors.numberOfTileDektites?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label>Metal Dektites:</label>
        <input
          type="number"
          name="numberOfMetalDektites"
          {...register("numberOfMetalDektites", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.numberOfMetalDektites?.type === "required" && <span>Number required</span>}
        {errors.numberOfMetalDektites?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div>
        <label>Aluminium Square Duct and Lids:</label>
        <input
          type="number"
          name="numberOfAluminiumSquareDuct"
          {...register("numberOfAluminiumSquareDuct", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.numberOfAluminiumSquareDuct?.type === "required" && <span>Number required</span>}
        {errors.numberOfAluminiumSquareDuct?.type === "min" && <span>Must be 0 or greater</span>}
      </div>




      <button type="submit">Submit</button>

      {/* <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre> */}
      
      {Object.keys(picklist).length === 0 ? <p>hello</p> : 
        <div>
          <h1>Pick List</h1>
          <ul>
            {picklist.tileFeet ? <li>{picklist.tileFeet} x Tile Feet</li> : null}
            {picklist.corrugatedFeet ? <li>{picklist.corrugatedFeet} x Corrugated Feet</li> : null}
            {picklist.kliplokFeet ? <li>{picklist.kliplokFeet} x Kliplok Feet</li> : null}
            {picklist.trapezoidalFeet ? <li>{picklist.trapezoidalFeet} x Trapezoidal Feet</li> : null}
            {picklist.proRails ? <li>{picklist.proRails} x Pro Rails</li> : null}
            {picklist.tiltRails ? <li>{picklist.tiltRails} x Tilt Rails</li> : null}
            {picklist.screws ? <li>Screws (both types)</li> : null}
            {picklist.joiners ? <li>Joiners</li> : null}
            {picklist.earthStuff ? <li>Earth Stuff</li> : null}
            {picklist.numberOfPanels ? <li>{picklist.numberOfPanels} x Panels</li> : null}
            {picklist.midsAndEnds ? <li>Mids and Ends</li> : null}
            {picklist.midsAndEndsOld ? <li>Mids and Ends (Old)</li> : null}
            {picklist.qCables ? <li>{picklist.qCables} x Q-cables (portrait)</li> : null}
            {picklist.isolatorsNormalType ? <li>{picklist.isolatorsNormalType} x Normal Isolators</li> : null}
            {picklist.isolatorsClearTypeType ? <li>{picklist.isolatorsClearTypeType} x Clear Isolators (Enclosures)</li> : null}
            {picklist.qRelay ? <li>{picklist.qRelay} x Q-Relay(s)</li> : null}
            {picklist.c32AmpBreaker ? <li>{picklist.c32AmpBreaker} x 32A Breaker(s)</li> : null}
            {picklist.envoy ? <li>Envoy</li> : null}
            {picklist.numberOf25mmConduits ? <li>{picklist.numberOf25mmConduits} x 25mm conduits</li> : null}
            {picklist.numberOf32mmConduits ? <li>{picklist.numberOf32mmConduits} x 32mm conduits</li> : null}
            {picklist.numberOfTileDektites ? <li>{picklist.numberOfTileDektites} x Tile Dektites</li> : null}
            {picklist.numberOfMetalDektites ? <li>{picklist.numberOfMetalDektites} x Metal Dektites</li> : null}
            {picklist.numberOfAluminiumSquareDuct ? <li>{picklist.numberOfAluminiumSquareDuct} x Aluminium Square Duct and Lids</li> : null}


          </ul>
        </div>
      }
    </form>
  );
}

export default SolarForm;
