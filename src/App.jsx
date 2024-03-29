import {useRef, useState} from "react";
import {useForm} from "react-hook-form";

function SolarForm() {
    const [picklist, setPicklist] = useState({});

    const PANEL_HEIGHT = 1900;
    const PANEL_WIDTH = 1150;
    const RAIL_LENGTH = 4400;
    const RAIL_LENGTH_TILT = 4200;
    const ISOLATOR_WIDTH = 400;
    const TILE_FEET_SPACING = 1200;
    const CORRUGATED_FEET_SPACING = 900;
    const KLIPLOK_FEET_SPACING = 500;
    const TRAPEZOIDAL_FEET_SPACING = 500;
    const EXTRA_FEET_LEEWAY = 6;
    const EXTRA_RAIL_LEEWAY = 4400;

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
        {key: "c25AmpBreakerSinglePole", title: "C25 A Breaker (single pole)"},
    ]

    const FORM_DEFAULT_VALUES = {
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
        c25AmpBreakerSinglePole: 0,
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue,
        reset,
    } = useForm({
        defaultValues: FORM_DEFAULT_VALUES,
    });

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
            c25AmpBreakerSinglePole,
        } = data;

        console.log(Math.ceil((panelsProRailParallel ? panelsProRailParallel * PANEL_WIDTH * 2 / RAIL_LENGTH : 0) +
            (panelsProRailLandscape ? panelsProRailLandscape * PANEL_HEIGHT * 2 / RAIL_LENGTH : 0) +
            (numberOfStrings * ISOLATOR_WIDTH / RAIL_LENGTH)));

        console.log(panelsProRailParallel === 0 && panelsProRailLandscape === 0);
        const numberOfPanels = panelsProRailParallel + panelsProRailLandscape + panelsTiltRailParallel + panelsTiltRailLandscape;
        const picklist = {
            tileFeet: panelsOnTile ? Math.ceil((panelsOnTile * PANEL_WIDTH * 2 / TILE_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
            corrugatedFeet: panelsOnCorrugated ? Math.ceil((panelsOnCorrugated * PANEL_WIDTH * 2 / CORRUGATED_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
            kliplokFeet: panelsOnKliplok ? Math.ceil((panelsOnKliplok * PANEL_WIDTH * 2 / KLIPLOK_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
            trapezoidalFeet: panelsOnTrapezoidal ? Math.ceil((panelsOnTrapezoidal * PANEL_WIDTH * 2 / TRAPEZOIDAL_FEET_SPACING + EXTRA_FEET_LEEWAY)) : 0,
            proRails: (panelsProRailParallel === 0 && panelsProRailLandscape === 0) ? 0 :
                Math.ceil((panelsProRailParallel ? panelsProRailParallel * PANEL_WIDTH * 2 / RAIL_LENGTH : 0) +
                    (panelsProRailLandscape ? panelsProRailLandscape * PANEL_HEIGHT * 2 / RAIL_LENGTH : 0) +
                    (numberOfStrings * ISOLATOR_WIDTH / RAIL_LENGTH) +
                    (EXTRA_RAIL_LEEWAY / RAIL_LENGTH)),
            tiltRails: panelsTiltRailParallel === 0 && panelsTiltRailLandscape === 0 ? 0 :
                Math.ceil((panelsTiltRailParallel ? panelsTiltRailParallel * PANEL_WIDTH * 2 / RAIL_LENGTH_TILT : 0) +
                    (panelsTiltRailLandscape ? panelsTiltRailLandscape * PANEL_HEIGHT * 2 / RAIL_LENGTH_TILT : 0) +
                    (numberOfStrings * ISOLATOR_WIDTH / RAIL_LENGTH_TILT) +
                    (EXTRA_RAIL_LEEWAY / RAIL_LENGTH)),
            screws: !!(panelsOnTile || panelsOnCorrugated || panelsOnTrapezoidal),
            joiners: true,
            earthStuff: true,
            numberOfPanels,
            midsAndEnds: !!(panelsProRailParallel || panelsProRailLandscape),
            midsAndEndsOld: !!(panelsTiltRailParallel || panelsTiltRailLandscape),
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
            c25AmpBreakerSinglePole,
        }
        setPicklist(picklist);
        console.log(picklist);
    });

    return (
        <div className='container'>
            <form className='row g-1' onSubmit={onSubmit}>

                <h5 className='col-12 mt-2'>Panels on Pro Rails</h5>
                <div className='col-12'>
                    <label htmlFor='panelsProRailParallel'># panels on pro rail parallel:</label>
                    <input
                        className='form-control'
                        type="number"
                        id='panelsProRailParallel'
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
                    <label htmlFor='panelsProRailLandscape'># panels on pro rail landscape:</label>
                    <input
                        className='form-control'
                        type="number"
                        id='panelsProRailLandscape'
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
                    <label htmlFor="panelsTiltRailParallel"># panels on tilt rail parallel:</label>
                    <input
                        className='form-control'
                        type="number"
                        id="panelsTiltRailParallel"
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
                    <label htmlFor="panelsTiltRailLandscape"># panels on tilt rail landscape:</label>
                    <input
                        className='form-control'
                        type="number"
                        id="panelsTiltRailLandscape"
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
                <p className='col-12'>N.B. Each panels that are laid in landscape orientation should be itemized as 2
                    panels</p>
                <div className='col-12'>
                    <label htmlFor="panelsOnTile"># panels on tile:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="panelsOnTile"
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
                    <label htmlFor="panelsOnCorrugated"># panels on corrugated:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="panelsOnCorrugated"
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
                    <label htmlFor="panelsOnKliplok"># panels on kliplok:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="panelsOnKliplok"
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
                    <label htmlFor="panelsOnTrapezoidal"># panels on trapezoidal:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="panelsOnTrapezoidal"
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
                    <label htmlFor="numberOfStrings"># strings:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="numberOfStrings"
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
                    <label htmlFor="numberOfSkipPlugs"># approx skipped plugs:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="numberOfSkipPlugs"
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
                    <label htmlFor="isTesla">Is Tesla?</label>
                    <input
                        className="form-check-input ms-1"
                        type="checkbox"
                        id="isTesla"
                        name="isTesla"
                        {...register("isTesla", {})}
                    />
                </div>

                <h4 className="col-12 mt-2">Solar Sundries</h4>
                <div className="col-sm-6">
                    <label htmlFor="n25mmConduits">25mm conduits:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="n25mmConduits"
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
                    <label htmlFor="n32mmConduits">32mm conduits:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="n32mmConduits"
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
                    <label htmlFor="tileDektites">Tile Dektites:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="tileDektites"
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
                    <label htmlFor="metalDektites">Metal Dektites:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="metalDektites"
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
                    <label htmlFor="aluminiumSquareDuct">Aluminium Square Duct and Lids:</label>
                    <input
                        className="form-control"
                        type="number"
                        id="aluminiumSquareDuct"
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

                <div className="col-sm-6">
                    <label htmlFor="c25AmpBreakerSinglePole">C25 A Breaker (single pole)</label>
                    <input
                        className="form-control"
                        type="number"
                        id="c25AmpBreakerSinglePole"
                        name="c25AmpBreakerSinglePole"
                        {...register("c25AmpBreakerSinglePole", {
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
