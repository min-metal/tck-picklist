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

      n25mmConduits: 0,
      n32mmConduits: 0,
      tileDektites: 0,
      metalDektites: 0,
      aluminiumSquareDuct: 0,
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

  const ITEMS_MAP = [
    {key: "tileFeet", title: "Tile Feet"},
    {key: "corrugatedFeet", title: "Corrugated Feet"},
    {key: "kliplokFeet", title: "Kliplok Feet"},
    {key: "trapezoidalFeet", title: "Trapezoidal Feet"},
    {key: "proRails", title: "Pro Rails"},
    {key: "tiltRails", title: "Tilt Rails"},
    {key: "screws", title: "Screws"},
    {key: "joiners", title: "Joiners"},
    {key: "earthStuff", title: "Earth Stuff"},
    {key: "numberOfPanels", title: "Panels"},
    {key: "midsAndEnds", title: "Mids and Ends"},
    {key: "midsAndEndsOld", title: "Mids and Ends (Old)"},
    {key: "qCables", title: "Q-Cables"},
    {key: "isolatorsNormalType", title: "Isolators"},
    {key: "isolatorsClearTypeType", title: "Enclosures"},
    {key: "qRelay", title: "Q-Relay"},
    {key: "c32AmpBreaker", title: "C32 Breakers"},
    {key: "envoy", title: "Envoy"},
    {key: "n25mmConduits", title: "25mm Conduits"},
    {key: "n32mmConduits", title: "32mm Conduits"},
    {key: "tileDektites", title: "Tile Dektites"},
    {key: "metalDektites", title: "Metal Dektites"},
    {key: "aluminiumSquareDuct", title: "Aluminium Square Duct and Covers"},
  ]

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
      n25mmConduits,
      n32mmConduits,
      tileDektites,
      metalDektites,
      aluminiumSquareDuct,
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
      envoy: 1,
      n25mmConduits,
      n32mmConduits,
      tileDektites,
      metalDektites,
      aluminiumSquareDuct,
    }
    setPicklist(picklist);
    console.log(picklist);
  });

  return (
    <div className='container'>
      <form className='row g-1' onSubmit={onSubmit}>

      <h5 className='col-12 mt-2'>Panels on Pro Rails</h5>
      <div className='col-12'>
        <label htmlFor='panelsProRailParallelInput'># panels on pro rail parallel:</label>
        <input
          className='form-control'
          type="number"
          id='panelsProRailParallelInput'
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

      <div className='col-12'>
        <label htmlFor='panelsProRailLandscapeInput'># panels on pro rail landscape:</label>
        <input
          className='form-control'
          type="number"
          id='panelsProRailLandscapeInput'
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

      <h5 className='col-12 mt-2'>Panels on 5 Degree Tilt Rails</h5>
      <div className='col-12'>
        <label htmlFor="panelsTiltRailParallelInput"># panels on tilt rail parallel:</label>
        <input
          className='form-control'
          type="number"
          id="panelsTiltRailParallelInput"
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

      <div className='col-12'>
        <label htmlFor="panelsTiltRailLandscapeInput"># panels on tilt rail landscape:</label>
        <input
          className='form-control'
          type="number"
          id="panelsTiltRailLandscapeInput"
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

      <h5 className='col-12 mt-2'>Roof Surfaces</h5>
      <p className='col-12'>N.B. Each panels that are laid in landscape orientation should be itemized as 2 panels</p>
      <div className='col-12'>
        <label htmlFor="panelsOnTileInput"># panels on tile:</label>
        <input
          className="form-control"
          type="number"
          id="panelsOnTileInput"
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

      <div className='col-12'>
        <label htmlFor="panelsOnCorrugatedInput"># panels on corrugated:</label>
        <input
          className="form-control"
          type="number"
          id="panelsOnCorrugatedInput"
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

      <div className='col-12'>
        <label htmlFor="panelsOnKliplokInput"># panels on kliplok:</label>
        <input
          className="form-control"
          type="number"
          id="panelsOnKliplokInput"
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

      <div className="col-12">
        <label htmlFor="panelsOnTrapezoidalInput"># panels on trapezoidal:</label>
        <input
          className="form-control"
          type="number"
          id="panelsOnTrapezoidalInput"
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

      <h5 className="col-12 mt-2">Q-Cables</h5>
      <div className="col-sm-6">
        <label htmlFor="numberOfStringsInput"># strings:</label>
        <input
          className="form-control"
          type="number"
          id="numberOfStringsInput"
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

      <div className="col-sm-6">
        <label htmlFor="numberOfSkipPlugsInput"># approx skipped plugs:</label>
        <input
          className="form-control"
          type="number"
          id="numberOfSkipPlugsInput"
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

      <div className="col-12">
        <label htmlFor="isTeslaInput">Is Tesla?</label>
        <input
          className="form-check-input ms-1"
          type="checkbox"
          id="isTeslaInput"
          name="isTesla"
          {...register("isTesla", {
          })}
        />
      </div>

      <h4 className="col-12 mt-2">Sundries</h4>
      <div className="col-sm-6">
        <label htmlFor="n25mmConduitsInput">25mm conduits:</label>
        <input
          className="form-control"
          type="number"
          id="n25mmConduitsInput"
          name="n25mmConduits"
          {...register("n25mmConduits", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.n25mmConduits?.type === "required" && <span>Number required</span>}
        {errors.n25mmConduits?.type === "min" && <span>Must be 0 or greater</span>}
      </div>
      <div className="col-sm-6">
        <label htmlFor="n32mmConduitsInput">32mm conduits:</label>
        <input
          className="form-control"
          type="number"
          id="n32mmConduitsInput"
          name="n32mmConduits"
          {...register("n32mmConduits", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.n32mmConduits?.type === "required" && <span>Number required</span>}
        {errors.n32mmConduits?.type === "min" && <span>Must be 0 or greater</span>}
      </div>
      
      <div className="col-sm-6">
        <label htmlFor="tileDektitesInput">Tile Dektites:</label>
        <input
          className="form-control"
          type="number"
          id="tileDektitesInput"
          name="tileDektites"
          {...register("tileDektites", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.tileDektites?.type === "required" && <span>Number required</span>}
        {errors.tileDektites?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div className="col-sm-6">
        <label htmlFor="metalDektitesInput">Metal Dektites:</label>
        <input
          className="form-control"
          type="number"
          id="metalDektitesInput"
          name="metalDektites"
          {...register("metalDektites", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.metalDektites?.type === "required" && <span>Number required</span>}
        {errors.metalDektites?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <div className="col-sm-6">
        <label htmlFor="aluminiumSquareDuctInput">Aluminium Square Duct and Lids:</label>
        <input
          className="form-control"
          type="number"
          id="aluminiumSquareDuctInput"
          name="aluminiumSquareDuct"
          {...register("aluminiumSquareDuct", {
            required: {
              value: true,
              message: "required",
            },
            valueAsNumber: true,
            min: 0
          })}
        />
        {errors.aluminiumSquareDuct?.type === "required" && <span>Number required</span>}
        {errors.aluminiumSquareDuct?.type === "min" && <span>Must be 0 or greater</span>}
      </div>

      <hr className="my-4"/>
      <button 
        className="col-12 w-100 btn btn-primary btn-lg"
        type="submit">
          Generate Picklist
      </button>

      {/* <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre> */}

      <hr className="my-4"/>

      {Object.keys(picklist).length === 0 ? null : 
        <div className="col-12">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Packlist</span>
          </h4>
          <ul className="col-12 list-group mb-3">
            {ITEMS_MAP.map(({key, title}) => {
              return picklist[key] ? 
              Number.isInteger(picklist[key]) ? 
              <li className="list-group-item">{picklist[key]} x {title}</li> : 
              <li className="list-group-item">{title}</li> : 
              null
            })}
          </ul>
        </div>
      }
      </form>

      <footer className="my-5 pt-5 text-body-secondary text-center text-small">
        <p className="mb-1">© 2023 Minh Tran</p>
      </footer>
    </div>
  );
}

export default SolarForm;
