import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Flex from "../framework/flex";
import SelectLabel from "../framework/select-label";
import ColorBy from "./color-by";
import DateRangeInputs from "./date-range-inputs";
import AnalysisDateSlider from "./analysis-date-slider";
import ChooseLayout from "./choose-layout";
import ChooseDataset from "./choose-dataset";
import ChooseMetric from "./choose-metric";
import PanelLayout from "./panel-layout";
import GeoResolution from "./geo-resolution";
import MapAnimationControls from "./map-animation";
import { controlsWidth } from "../../util/globals";
import { titleStyles } from "../../globalStyles";
import DataSource from "./data-source";
import PanelToggles from "./panel-toggles";

const header = (text) => (
  <span style={titleStyles.small}>
    {text}
  </span>
);

@connect((state) => ({
  analysisSlider: state.controls.analysisSlider,
  canTogglePanelLayout: state.controls.canTogglePanelLayout,
  panels: state.metadata.panels
}))
class Controls extends React.Component {
  static propTypes = {
    analysisSlider: PropTypes.any
  }
  getStyles() {
    return {};
  }
  analysisSlider() {
    if (this.props.analysisSlider && this.props.analysisSlider.valid) {
      return (
        <g>
          <br/>
          {header("Analysis Date")}
          <AnalysisDateSlider/>
        </g>
      );
    }
    return null;
  }
  render() {
    const mapAndTree = this.props.panels !== undefined && this.props.panels.indexOf("map") !== -1 && this.props.panels.indexOf("tree") !== -1;

    return (
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{
          width: controlsWidth,
          padding: "0px 20px 20px 20px"
        }}
      >

        {header("Dataset")}
        <ChooseDataset/>

        {header("Date Range")}
        <DateRangeInputs/>

        {this.analysisSlider()}

        {header("Color By")}
        <ColorBy/>

        {header("Tree Options")}

        <SelectLabel text="Layout"/>
        <ChooseLayout/>

        <SelectLabel text="Branch Length"/>
        <ChooseMetric/>

        {header("Map Options")}
        <SelectLabel text="Geographic resolution"/>
        <GeoResolution/>
        <MapAnimationControls/>

        <div/>
        {header("Panels To Display")}
        <PanelToggles/>
        {mapAndTree && this.props.canTogglePanelLayout ? (<PanelLayout/>) : null}

        <div/>
        {header("Data Source")}
        <DataSource/>

      </Flex>
    );
  }
}

export default Controls;
